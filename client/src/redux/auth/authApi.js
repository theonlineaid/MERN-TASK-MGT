import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Set up your backend API URL
const API_URL = "http://localhost:5000/api"; // Replace with your actual backend URL

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include", // Make sure cookies are included in the requests
  }),
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login", // The backend login route
        method: "POST",
        body: credentials, // Sending credentials (email and password)
      }),
    }),
    // Register endpoint (if needed)
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/user/register", // The backend register route
        method: "POST",
        body: userData, // Send user data to register
      }),
    }),
    // Additional endpoints can go here
  }),
});

export const {
  useLoginMutation, // Hook for login
  useCreateUserMutation, // Hook for registration
} = authApi;
