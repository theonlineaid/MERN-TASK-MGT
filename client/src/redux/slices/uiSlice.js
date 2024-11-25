import { createSlice } from "@reduxjs/toolkit";
// import { user } from "../../assets/data";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,  // Default to `null` if no user is found in localStorage

  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;  // Set the user information in the state
      localStorage.setItem("userInfo", JSON.stringify(action.payload));  // Store the user information in localStorage
    },
    logout: (state) => {
      state.user = null;  // Clear user from state
      localStorage.removeItem("userInfo");  // Remove user information from localStorage
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;  // Toggle sidebar open/close state
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = uiSlice.actions;

export default uiSlice.reducer;
