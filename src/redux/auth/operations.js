import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showLoader, hideLoader } from "../global/loaderSlice";

axios.defaults.baseURL = "https://wallet.b.goit.study";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(showLoader());
      const res = await axios.post("/api/auth/sign-up", credentials);
      console.log(res.data);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      dispatch(hideLoader());
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(showLoader());
      const res = await axios.post("/api/auth/sign-in", credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      dispatch(hideLoader());
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;
  try {
    dispatch(showLoader());
    const res = await axios.delete("/api/auth/sign-out");
    clearAuthHeader();
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    dispatch(hideLoader());
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Token yok!");
    }
    try {
      dispatch(showLoader());
      setAuthHeader(persistedToken);
      const res = await axios.get("/api/users/current");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      dispatch(hideLoader());
    }
  }
);
