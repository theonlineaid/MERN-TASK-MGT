import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";  // Import js-cookie

const initialState = {
  user: null, // Store the user data after login
  isAuthenticated: false, // Track if the user is authenticated
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set the user data
      state.isAuthenticated = true; // Mark the user as authenticated
      // Store token in cookies
      Cookies.set("token", action.payload.token, { expires: 7 });  // Store token for 7 days
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
      state.isAuthenticated = false; // Mark user as not authenticated
      // Remove token from cookies
      Cookies.remove("token");
    },
    checkAuth: (state) => {
      const token = Cookies.get("token"); // Check if token exists in cookies
      if (token) {
        state.isAuthenticated = true; // User is authenticated
        state.user = { token }; // Store the token as user data (or any user info you store)
      } else {
        state.isAuthenticated = false; // No token found, user is not authenticated
        state.user = null;
      }
    },
  },
});

export const { setUser, logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;
