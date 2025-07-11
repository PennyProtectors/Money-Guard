import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import {
  fetchTransaction,
  fetchTransactionCategory,
} from "../transactions/operations";
axios.defaults.baseURL = "https://wallet.b.goit.study";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("api/auth/sign-up", credentials);
      console.log(res.data);
      setAuthHeader(res.data.token);
      toast.success(`Welcome ${res.data.user.username || "user"}`);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("api/auth/sign-in", credentials);
      setAuthHeader(res.data.token);
      toast.success(`Welcome ${res.data.user.username || "user"}`);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const user = state.auth?.user?.username;

    // const res = await axios.delete("/api/auth/sign-out");
    clearAuthHeader();
    // toast.success(`Goodbye ${res.data.user.username || "user"}`);
    toast.success(`Goodbye ${user}`);
    return;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Token yok!");
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("api/users/current");
      await thunkAPI.dispatch(fetchTransactionCategory());
      thunkAPI.dispatch(fetchTransaction());
      console.log("User Data:", res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
