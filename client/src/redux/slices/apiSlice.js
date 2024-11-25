import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:5000/api";
const baseQuery = fetchBaseQuery({ baseUrl: API_URI });

export const apiSlice = createApi({
  reducerPath: "api",  // Add a reducerPath for the slice
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/user/register",  // The endpoint for registering a user
        method: "POST",
        body: userData,  // The body of the request containing user data
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/user/update/${id}`,  // Endpoint to update user
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useUpdateUserMutation } = apiSlice;
