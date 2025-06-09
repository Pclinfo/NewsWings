// 
// features/api/newsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export const categoriesNewsApi = createApi({
  reducerPath: 'categoriesNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPostsByCategory: builder.query({
      query: (category) => `posts_by_category?category=${encodeURIComponent(category)}`,
      // Always refetch on mount or when category changes
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),
    getSubcategoriesByCategory: builder.query({
      query: (category) => `/subcategories_by_category?category=${encodeURIComponent(category)}`,
      // Always refetch on mount or when category changes
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),
    getPostsByCategoryAndSubcategory: builder.query({
      query: ({ category, sub_category }) =>
        `/get_posts_by_category_subcategory?category=${encodeURIComponent(category)}&sub_category=${encodeURIComponent(sub_category)}`,
        refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),
  }),
});

// Export the hooks for use in componentss
export const {
  useGetPostsByCategoryQuery,
  useGetSubcategoriesByCategoryQuery,
useGetPostsByCategoryAndSubcategoryQuery,
} = categoriesNewsApi;
