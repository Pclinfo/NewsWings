// src/services/newsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../features/userSlice'; // Adjust path as needed
const BASE_URL = import.meta.env.VITE_API_URL ||'http://127.0.0.1:5000'; 
export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // Replace with actual backend URL
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState());  // Retrieve token from Redux store
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      
      }
      return headers;
    },
    credentials: 'include', // Include cookies in the request
    
  }),
  tagTypes: ['Admin'],
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: () => '/admin',
      providesTags: ['Admin'],
    }),
    getNewsById: builder.query({
      query: (id) => `/admin/${id}`,
      providesTags: (result, error, id) => [{ type: 'Admin', id }],
    }),
    createNews: builder.mutation({
      query: (newNews) => ({
        url: '/admin',
        method: 'POST',
        body: newNews,
      }),
      invalidatesTags: [{type:'Admin'}],
    }),
    updateNews: builder.mutation({
      query:  ({ id, formData }) => ({
        url: `/admin/${id}`,
        method: 'PUT',
        body: formData,
      }),
     
     // Invalidate the list and the specific item to refetch them
     invalidatesTags: (result, error, { id }) => [{ type: 'Admin', id }, 'Admin'],
    }),

    
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Admin', id }],
    }),
   uploadPDF: builder.mutation({
      query: ({ file, category }) => {
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('category', category);
        return {
          url: '/upload-pdf',
          method: 'POST',
          body: formData
        };
      }
    }),
    getPDFs: builder.query({
  query: () => 'api/pdfs', // Adjust the endpoint if different
}),
downloadPDF: builder.query({
     query: (filename) => ({
    url: `/download/${encodeURIComponent(filename)}`,
    method: 'GET',
    // important for non-JSON downloads
    responseHandler: async (response) => await response.blob(),
  }),
})
  }),
});

export const {
  useGetPDFsQuery,
  useGetAllNewsQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useUploadPDFMutation,
   useLazyDownloadPDFQuery, 

} = newsApi;
