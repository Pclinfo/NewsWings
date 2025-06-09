// import React from "react";
// import { useGetAllNewsQuery } from "../services/AdminPosts"; // adjust path
// import { useSelector,  } from 'react-redux';
// const CurrentNewsGrid = () => {
//   const { data: newsItems = [], isLoading, isError, error } = useGetAllNewsQuery();
//  const categoryMap = useSelector((state) => state.category.categoryMap);
//   // Filter current news - adjust condition as needed
//   const currentNews = newsItems.filter(item => item.news_category === "Current News");


//   // Group filtered news by category
//   const grouped = currentNews.reduce((acc, item) => {
//     const category = item.news_category || "Uncategorized";
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(item);
//     return acc;
//   }, {});

//   if (isLoading) return <p>Loading news...</p>;
//   if (isError) return <p>Error loading news: {error?.data?.message || error.error}</p>;

//   if (currentNews.length === 0) return <p>No current news available.</p>;

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       {Object.entries(grouped).map(([category, items]) => (
//         <section key={category} className="mb-12">
//           <h2 className="text-3xl font-bold mb-6 border-b-4 border-blue-600 pb-2 capitalize">
//             {category}
//           </h2>

//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {items.map(({ id, news_title, news_description, image }) => (
//               <div
//                 key={id}
//                 className="bg-white shadow rounded-lg p-4 flex flex-col"
//               >
//                 {image ? (
//                   <img
//                     src={image}
//                     alt={news_title}
//                     className="mb-4 rounded-md object-cover h-48 w-full"
//                   />
//                 ) : (
//                   <div className="mb-4 h-48 w-full bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
//                     No Image
//                   </div>
//                 )}
//                 <h3 className="text-xl font-semibold mb-2">{news_title}</h3>
//                 <p className="text-gray-700 flex-grow">{news_description}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default CurrentNewsGrid;

import React from "react";
import { useGetAllNewsQuery } from "../services/AdminPosts"; // adjust path
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CurrentNewsGrid = () => {
  const { data: newsItems = [], isLoading, isError, error } = useGetAllNewsQuery();
  const categoryMap = useSelector((state) => state.category.categoryMap);
console.log(categoryMap);
  // Filter current news
  const currentNews = newsItems.filter((item) => item.news_category === "Current News");

  // Group filtered news by category
  const grouped = currentNews.reduce((acc, item) => {
    const category = item.news_category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  if (isLoading) return <p>Loading news...</p>;
  if (isError) return <p>Error loading news: {error?.data?.message || error.error}</p>;
  if (currentNews.length === 0) return <p>No current news available.</p>;

  // Helper to slugify subcategory for URL
  const toSlug = (str) => str.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="mb-12">
          <h2 className="text-3xl font-bold mb-2 border-b-4 border-blue-600 pb-2 capitalize">
            {category}
          </h2>

          {/* Show subcategory links as React Router Links */}
          {category === "Current News" && categoryMap[category] && (
            <div className="flex flex-wrap gap-3 mb-6">
              {categoryMap[category].map((subcat) => (
                <Link
                  key={subcat}
                  to={`/current-news/${toSlug(subcat)}`}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {subcat}
                </Link>
              ))}
            </div>
          )}

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

export default CurrentNewsGrid;
