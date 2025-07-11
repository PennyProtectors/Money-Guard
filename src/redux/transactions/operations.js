import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://wallet.b.goit.study/";

export const fetchTransaction = createAsyncThunk(
  "transactions/fetchAllTransaction",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/transactions");

      const responseData = res.data;
      const result = responseData.map((transactionItem) => {
        const cateId = transactionItem.categoryId;
        const categoryData = thunkAPI
          .getState()
          .transaction.category.find((category) => category.id === cateId);
        transactionItem.category = categoryData ? categoryData.name : "Unknown";
        return transactionItem;
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, thunkAPI) => {
    try {
      const res = await axios.post("/api/transactions", transaction);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async (transactionId, thunkAPI) => {
    try {
      const res = await axios.patch(
        "/api/transactions/{transactionId}",
        transactionId
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      const res = await axios.delete(
        "/api/transactions/{transactionId}",
        transactionId
      );
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTransactionCategory = createAsyncThunk(
  "transactions/transactionCategory",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/transaction-categories");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
