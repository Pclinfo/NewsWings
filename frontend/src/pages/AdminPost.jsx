
// AdminPost.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllNewsQuery, useDeleteNewsMutation } from '../services/AdminPosts';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const NewsCard = ({ item, isProminent, isAdmin, onDelete, onEdit, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl overflow-hidden relative shadow-md p-4 h-full transition hover:shadow-lg flex flex-col justify-between cursor-pointer ${
      isProminent ? 'border-4 border-blue-400' : ''
    }`}
  >
    <div>
      {item.image_url?.trim() && (
        <img
          src={`http://127.0.0.1:5000${item.image_url}`}
          alt="news"
          className={`w-full ${isProminent ? 'h-[300px]' : 'h-[180px]'} object-cover rounded-md mb-3`}
        />
      )}
      <h2 className={`font-semibold ${isProminent ? 'text-2xl' : 'text-lg'} text-gray-800`}>
        {item.news_title}
      </h2>
      <p className="italic text-gray-600 line-clamp-2 mb-1">{item.news_sub_category}</p>
      <p className="text-sm text-gray-700 line-clamp-3">{item.news_description}</p>
    </div>

    {isAdmin && (
      <div
        className="mt-4 flex justify-end gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => onEdit(item.id)} className="text-blue-600 hover:text-blue-800">
          <Pencil size={20} />
        </button>
        <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800">
          <Trash2 size={20} />
        </button>
      </div>
    )}
  </div>
);

const CategorySection = ({ category, items, categoryId, isAdmin, onDelete, onEdit, onCardClick }) => {
  const sortedItems = [...items].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const firstFour = sortedItems.slice(0, 4);
  const remainder = sortedItems.slice(4);

  return (
    <div className="mb-10 bg-white shadow rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2 capitalize">
        {category}
      </h2>

      <Droppable droppableId={categoryId} isDropDisabled={!isAdmin}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {firstFour.map((item, idx) =>
                isAdmin ? (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={idx}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <NewsCard
                          item={item}
                          isProminent={idx === 0}
                          isAdmin={true}
                          onDelete={onDelete}
                          onEdit={onEdit}
                          onClick={() => onCardClick(item.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ) : (
                  <NewsCard
                    key={item.id}
                    item={item}
                    isProminent={idx === 0}
                    isAdmin={false}
                    onClick={() => onCardClick(item.id)}
                  />
                )
              )}
            </div>

            <div className="flex flex-col gap-6">
              {remainder.map((item, idx) =>
                isAdmin ? (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={idx + 4}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <NewsCard
                          item={item}
                          isProminent={false}
                          isAdmin={true}
                          onDelete={onDelete}
                          onEdit={onEdit}
                          onClick={() => onCardClick(item.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ) : (
                  <NewsCard
                    key={item.id}
                    item={item}
                    isProminent={false}
                    isAdmin={false}
                    onClick={() => onCardClick(item.id)}
                  />
                )
              )}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const AdminPost = () => {
  const { data = [], isLoading } = useGetAllNewsQuery();
  const [deleteNews] = useDeleteNewsMutation();
  const [grouped, setGrouped] = useState({});
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.isAdmin;
  const navigate = useNavigate();

  const groupAndSort = (items) => {
    const groupedData = items.reduce((acc, item) => {
      const key = item.news_category || 'uncategorized';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    for (const category in groupedData) {
      groupedData[category].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return groupedData;
  };

  useEffect(() => {
    if (data.length > 0) {
      const sortedGrouped = groupAndSort(data);
      setGrouped(sortedGrouped);
    }
  }, [data]);

  const handleDragEnd = (result) => {
    if (!isAdmin) return;
    const { destination, source } = result;
    if (!destination) return;

    const updatedGrouped = { ...grouped };
    const sourceItems = [...updatedGrouped[source.droppableId]];
    const movedItem = sourceItems[source.index];

    sourceItems.splice(source.index, 1);
    updatedGrouped[source.droppableId] = sourceItems;

    const destItems = [...(updatedGrouped[destination.droppableId] || [])];
    destItems.push(movedItem);
    updatedGrouped[destination.droppableId] = destItems;

    const reSorted = groupAndSort(Object.values(updatedGrouped).flat());
    setGrouped(reSorted);
  };

  const handleEdit = (id) => navigate(`/admin/edit/${id}`);
  const handleView = (id) => navigate(`/news/${id}`);

  const handleDelete = async (id) => {
    try {
      await deleteNews(id).unwrap();
      const updatedItems = Object.values(grouped).flat().filter((item) => item.id !== id);
      const reSorted = groupAndSort(updatedItems);
      setGrouped(reSorted);
      toast.success('Post deleted successfully!');
    } catch (err) {
      console.error('Failed to delete:', err);
      toast.error('Failed to delete post.');
    }
  };

  const categories = Object.keys(grouped);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="mx-auto px-4 py-8 max-w-5xl container">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">News Management Dashboard</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500 text-center">No news items available.</p>
        ) : (
          categories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              items={grouped[category]}
              categoryId={category}
              isAdmin={isAdmin}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onCardClick={handleView}
            />
          ))
        )}
      </div>
    </DragDropContext>
  );
};

export default AdminPost;
