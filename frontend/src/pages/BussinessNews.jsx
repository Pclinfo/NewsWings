import React from "react";
import { useGetAllNewsQuery } from "../services/AdminPosts"; // adjust path

const BussinessNews = () => {
  const { data: newsItems = [], isLoading, isError, error } = useGetAllNewsQuery();

  // Filter current news - adjust condition as needed
  const currentNews = newsItems.filter(item => item.news_category === "Business");

  // Group filtered news by category
  const grouped = currentNews.reduce((acc, item) => {
    const category = item.news_category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  if (isLoading) return <p>Loading news...</p>;
  if (isError) return <p>Error loading news: {error?.data?.message || error.error}</p>;

  if (currentNews.length === 0) return <p>No bussiness news available.</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-4 border-blue-600 pb-2 capitalize">
            {category}
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map(({ id, news_title, news_description, image }) => (
              <div
                key={id}
                className="bg-white shadow rounded-lg p-4 flex flex-col"
              >
                {image ? (
                  <img
                    src={image}
                    alt={news_title}
                    className="mb-4 rounded-md object-cover h-48 w-full"
                  />
                ) : (
                  <div className="mb-4 h-48 w-full bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{news_title}</h3>
                <p className="text-gray-700 flex-grow">{news_description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default BussinessNews;
