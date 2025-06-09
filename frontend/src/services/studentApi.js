// services/studentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => 'get-articles',
      providesTags: ['Article'],
    }),

    getArticleById: builder.query({
      query: (id) => `get-article-by-id?id=${id}`,
    }),

    createArticle: builder.mutation({
      query: (formData) => ({
        url: 'create-article',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Article'],
    }),

    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `delete-article/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
     updateArticleStatus: builder.mutation({
      query: (data) => ({
        url: '/admin/decision',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleStatusMutation,
} = studentApi;
