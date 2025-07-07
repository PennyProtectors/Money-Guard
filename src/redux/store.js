// store.js
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/auth/slice";
import transactionsReducer from "../redux/transactions/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// auth reducer'ı için persist yapılandırması
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

// persistReducer sadece auth için kullanılıyor
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// store'u oluşturuyoruz
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    transaction: transactionsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// persistStore ile persistor'u oluşturuyoruz
export let persistor = persistStore(store);
