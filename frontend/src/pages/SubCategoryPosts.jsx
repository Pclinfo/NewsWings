

import React from "react";
import { useParams, NavLink, Link, useNavigate } from "react-router-dom";
import {
  useGetPostsByCategoryAndSubcategoryQuery,
  useGetSubcategoriesByCategoryQuery,
} from "../services/CategoriesNews";
import LoadingBar from "../Components/LoadingBar";

const SubCategoryPosts = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();

  const decodeSlug = (slug) =>
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const encodeSlug = (text) =>
    encodeURIComponent(text.toLowerCase().replace(/\s+/g, "-"));

  const decodedCategory = decodeSlug(category);
  const decodedSubcategory = decodeSlug(subcategory);

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetPostsByCategoryAndSubcategoryQuery({
    category: decodedCategory,
    sub_category: decodedSubcategory,
  });

  const {
    data: subcategories = [],
    isLoading: subsLoading,
    isError: subsError,
  } = useGetSubcategoriesByCategoryQuery(decodedCategory);

  if (isLoadingPosts || subsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingBar />
      </div>
    );
  }

  if (isErrorPosts) {
    return (
      <p className="text-center text-red-500 text-base sm:text-lg mt-4">
        Failed to load posts.
      </p>
    );
  }

  // When user clicks on a post card, navigate to /news/:id route
  const handlePostClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Category and Subcategories Navigation */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-base sm:text-lg font-semibold">
        <span>
          <Link
            to={`/category/${encodeSlug(decodedCategory)}`}
            className="text-xl font-bold text-blue-700 hover:underline"
          >
            {decodedCategory}
          </Link>
        </span>

        {subsError ? (
          <span className="text-sm text-red-500 ml-2">
            / Failed to load subcategories
          </span>
        ) : subcategories.length > 0 ? (
          <>
            <span className="mx-1 text-gray-400">/</span>
            {subcategories.map((sub, idx) => {
              const subSlug = encodeSlug(sub);
              return (
                <React.Fragment key={subSlug}>
                  <NavLink
                    to={`/category/${encodeSlug(decodedCategory)}/subcategory/${subSlug}`}
                    className={({ isActive }) =>
                      `text-sm sm:text-base pb-1 transition-colors duration-200 ${
                        isActive
                          ? "underline font-semibold text-red-800"
                          : "text-blue-600 hover:underline hover:text-blue-700"
                      }`
                    }
                  >
                    {sub}
                  </NavLink>
                  {idx < subcategories.length - 1 && (
                    <span className="mx-1 text-gray-400">/</span>
                  )}
                </React.Fragment>
              );
            })}
          </>
        ) : (
          <span className="text-sm text-gray-500 ml-2">/ No subcategories</span>
        )}
      </nav>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            {post.image_url && (
              <div className="w-full aspect-[16/9] overflow-hidden">
                <img
                  src={`${
                    import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
                  }${post.image_url}`}
                  alt={post.news_title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                {post.news_title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 line-clamp-3">
                {post.news_description}
              </p>
              <p className="text-xs text-gray-500">
                Category: {post.news_category} | Subcategory: {post.news_sub_category}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryPosts;
