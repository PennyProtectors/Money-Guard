import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://wallet.b.goit.study/";

const mapCategoryToTransaction = (responseData, thunkAPI) => {
  const cateId = responseData.categoryId;
  const categoryData = thunkAPI
    .getState()
    .transaction.category.find((category) => category.id === cateId);
  responseData.category = categoryData ? categoryData.name : "Unknown";
  return responseData;
};

export const fetchTransaction = createAsyncThunk(
  "transactions/fetchAllTransaction",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/transactions");

      const responseData = res.data;
      const sorted = responseData.sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      );
      return sorted.map((transaction) => {
        return mapCategoryToTransaction(transaction, thunkAPI);
      });
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
      return mapCategoryToTransaction(res.data, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const editTransaction = createAsyncThunk(
//   "transactions/editTransaction",
//   async (transactionId, thunkAPI) => {
//     try {
//       const res = await axios.patch(
//         "/api/transactions/${transactionId}",
//         transactionId
//       );
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async (transaction, thunkAPI) => {
    try {
      const { transactionId, ...body } = transaction;
      const res = await axios.patch(`/api/transactions/${transactionId}`, body);

      return mapCategoryToTransaction(res.data, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      await axios.delete(`/api/transactions/${transactionId}`);
      // console.log(transactionId);
      return transactionId;
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
