import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransaction,
  fetchTransactionCategory,
} from "./operations";
import { act } from "react";

const initialState = {
  transactions: [],
  category: [],
  loading: false,
  error: null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const edittedTransactionId = state.transactions.find(
          (item) => item.id === action.payload.id
        );
        state.transactions[edittedTransactionId] = action.payload;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(fetchTransactionCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(fetchTransactionCategory.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});
