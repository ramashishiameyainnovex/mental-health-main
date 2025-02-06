import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely parse localStorage item
const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: getStoredUser(),
    error: null,
    loading: false,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;

      try {
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to save user to localStorage", error);
      }
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      try {
        localStorage.removeItem("currentUser");
      } catch (error) {
        console.error("Failed to remove user from localStorage", error);
      }
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signoutSuccess } = userSlice.actions;
export default userSlice.reducer;