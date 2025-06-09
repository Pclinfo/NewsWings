

// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../features/userSlice';
import { jwtDecode } from 'jwt-decode';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    
 prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState());
      console.log('Token from Redux:', token); // Debug

      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log('Decoded token:', decoded); // Optional
          headers.set('Authorization', `Bearer ${token}`);
        } catch (error) {
          console.warn('Invalid token format:', error);
        }
      } else {
        console.warn('No token found in state');
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    verifyToken: builder.query({
      query: () => '/verify_token',
    }),
    adminLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: '/admin_login',
        method: 'POST',
        body: { email, password },
         headers: {
      'Content-Type': 'application/json',
    },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/newswings_login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    register: builder.mutation({
      query: (formData) => ({
        url: '/newswings_register',
        method: 'POST',
        body: formData,
      }),
    }),
    getLoggedInUser: builder.query({
      query: () => '/verify_token',
    }),
    getCurrentUser: builder.query({
      query: () => '/user/me',
    }),
     getAdminProfile: builder.query({
      query: (id) => `/admin_profile/${id}`,
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: '/newswings_update_profile',
        method: 'PUT',
        body: formData,
      
      }),
    }),
    updateAdminProfile: builder.mutation({
      query: (formData) => ({
        url: '/admin_update_profile',
        method: 'PUT',
        body: formData,
      
      }),
        invalidatesTags: ["AdminProfile"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/newswings_logout',
        method: 'POST',
      }),
    }),
    getProfileImageQuery: builder.query({
      query: (filename) => `static/uploads/${filename}`,
      responseHandler: (response) => response.blob(),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAdminLoginMutation,
  useVerifyTokenQuery,
  useGetLoggedInUserQuery,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useUpdateAdminProfileMutation,
  useLogoutMutation,
  useGetProfileImageQuery,
  useGetAdminProfileQuery,
} = authApi;
