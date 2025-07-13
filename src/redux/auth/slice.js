import { createSlice } from "@reduxjs/toolkit";
import {
  clearAuthHeader,
  logIn,
  logOut,
  refreshUser,
  register,
} from "../auth/operations";

const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: {
    name: null,
    email: null,
  },
  isLoggedIn: false,
  isRefreshing: false,
  token: tokenFromStorage || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = { name: null, email: null };
        state.isRefreshing = false;
        clearAuthHeader(); // axios header temizle
      });
  },
});

export default authSlice.reducer;
