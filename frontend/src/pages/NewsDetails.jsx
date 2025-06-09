// NewsDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetNewsByIdQuery } from '../services/AdminPosts';

const NewsDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetNewsByIdQuery(id);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error loading post.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{data.news_title}</h1>
      {data.image_url && (
        <img
          src={`http://127.0.0.1:5000${data.image_url}`}
          alt="news"
          className="w-full h-auto object-cover rounded-md mb-4"
          style={{ height: `${data.image_height}px`, width: `${data.image_width}px` }}
        />
      )}
      <h2 className="text-lg text-gray-700 mb-2">{data.news_category} - {data.news_sub_category}</h2>
      <p className="text-gray-800">{data.news_description}</p>
    </div>
  );
};

export default NewsDetail;
