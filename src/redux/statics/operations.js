import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://wallet.b.goit.study/";

export const fetchTransactionSummary = createAsyncThunk(
  "statistics/fetchTransactionSummary", // slice adınla uyumlu olması önemli
  async ({ month, year }, thunkAPI) => {
    try {
      const res = await axios.get("/api/transactions-summary", {
        params: { month, year },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.res?.data?.message || error.message
      );
    }
  }
);
