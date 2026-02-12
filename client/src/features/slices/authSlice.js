import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: null, // This will include the loggedInUser object as part of the backend response
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload; // 👈 replace completely
    },
    logout: (state) => {
      state.isAuthenticated = false; // Mark user as logged out
      state.userData = null; // Clear userData
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
