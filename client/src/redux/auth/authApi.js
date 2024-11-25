import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Set up your backend API URL
const API_URL = "http://localhost:5000/api"; // Replace with your actual backend URL

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login", 
        method: "POST",
        body: credentials, 
      }),
    }),
    // Register endpoint (if needed)
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/user/register", 
        method: "POST",
        body: userData, 
      }),
    }),
    // Logout endpoint
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout", 
        method: "POST", 
      }),
    }),
  }),
});

export const {
  useLoginMutation, 
  useCreateUserMutation, 
  useLogoutMutation
} = authApi;
