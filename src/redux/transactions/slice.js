import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransaction,
  fetchTransactionCategory,
} from "./operations";

const initialState = {
  transactions: [],
  category: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
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
        const updatedTransaction = action.payload;
        const index = state.transactions.findIndex(
          (item) => item.id === updatedTransaction.id
        );

        if (index !== -1) {
          state.transactions[index] = updatedTransaction;
        }
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (item) => item.id !== action.payload
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

export default transactionSlice.reducer;
