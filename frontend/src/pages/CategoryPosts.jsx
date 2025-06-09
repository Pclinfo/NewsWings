

import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetPostsByCategoryQuery,
  useGetSubcategoriesByCategoryQuery,
} from "../services/CategoriesNews";
import LoadingBar from "../Components/LoadingBar";

const CategoryPosts = () => {
  const { category } = useParams();

  // Convert slug like "sports-news" back to "Sports News"
  const decodeSlug = (slug) =>
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const decodedCategory = decodeSlug(category);
console.log(decodedCategory);
  const {
    data: posts = [],
    isLoading: postsLoading,
    isError: postsError,
  } = useGetPostsByCategoryQuery(decodedCategory);

  const {
    data: subcategories = [],
    isLoading: subsLoading,
    isError: subsError,
  } = useGetSubcategoriesByCategoryQuery(decodedCategory);

  if (postsLoading || subsLoading) {
    return (
      <div className="text-center loading loading-bars loading-xs p-4">
        <LoadingBar />
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="text-center p-4 text-red-600">Failed to load posts.</div>
    );
  }
  
  return (
    <div className="p-4">
      {/* Category and Subcategories in single line */}
      <div className="text-2xl font-bold mb-4 flex flex-wrap items-center gap-2">
        <span>{decodedCategory}</span>
        {subsError ? (
          <span className="text-sm text-red-500">
            / failed to load subcategories
          </span>
        ) : subcategories.length > 0 ? (
          <>
            <span>/</span>
            {subcategories.map((sub, idx) => (
              <React.Fragment key={idx}>
                <Link
                  to={`/category/${category}/${sub
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-base text-blue-600 hover:underline"
                >
                  <Link to={`/category/${decodedCategory}/subcategory/${sub}`}>
                    {sub}
                  </Link>
                </Link>
                {idx < subcategories.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </>
        ) : (
          <span className="text-sm text-gray-500">/ No subcategories</span>
        )}
      </div>

      {/* Posts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
       {posts.map((post) => (
  <Link
    key={post.id}
    to={`/news/${post.id}`}
    className="bg-white shadow-md rounded p-4 hover:shadow-lg transition duration-200"
  >
    {post.image_url && (
      <img
        src={`${
          import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
        }${post.image_url}`}
        alt={post.news_title}
        className="w-full object-cover mb-2"
        style={{ height: post.image_height, width: post.image_width }}
      />
    )}
    <h3 className="text-xl font-semibold">{post.news_title}</h3>
    <p className="text-sm text-gray-700">{post.news_description}</p>
    <p className="text-xs text-gray-500 mt-2">{post.news_sub_category}</p>
  </Link>
))}

      </div>
    </div>
  );
};

export default CategoryPosts;



