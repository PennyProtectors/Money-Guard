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
  totalBalance: 0, // Toplam bakiye için yeni alan
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // Bakiyeyi hesaplayan reducer
    calculateBalance: (state) => {
      state.totalBalance = state.transactions.reduce((total, transaction) => {
        return total + Number(transaction.amount);
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
        // İşlemler yüklendiğinde bakiyeyi hesapla
        state.totalBalance = action.payload.reduce((total, transaction) => {
          return total + Number(transaction.amount);
        }, 0);
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        // Yeni işlem eklendiğinde bakiyeyi güncelle
        state.totalBalance += Number(action.payload.amount);
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
          // Bakiyeyi güncelle: eski işlem tutarını çıkar, yeni tutarı ekle
          state.totalBalance -= Number(state.transactions[index].amount);
          state.totalBalance += Number(updatedTransaction.amount);
          
          // İşlemi güncelle
          state.transactions[index] = updatedTransaction;
        }
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        // Silinen işlemin tutarını bakiyeden çıkar
        const deletedTransaction = state.transactions.find(
          (item) => item.id === action.payload
        );
        if (deletedTransaction) {
          state.totalBalance -= Number(deletedTransaction.amount);
        }
        
        // İşlemi listeden kaldır
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

export const { calculateBalance } = transactionSlice.actions;
export default transactionSlice.reducer;
