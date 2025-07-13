import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactionSummary } from "./operations";

const initialState = {
  data: {
    totalExpenses: 0,
    totalIncome: 0,
    categoryExpenses: [],
  },
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: "statics",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionSummary.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactionSummary.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default statisticsSlice.reducer;
