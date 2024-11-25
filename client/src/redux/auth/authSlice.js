import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Store the user data after login
  isAuthenticated: false, // Track if the user is authenticated
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;  // Set the user data
      state.isAuthenticated = true; // Mark the user as authenticated
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
      state.isAuthenticated = false; // Mark user as not authenticated
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
