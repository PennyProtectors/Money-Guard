import axios from "axios";

// Monobank API
export const currencyApi = axios.create({
  baseURL: "https://api.monobank.ua",
});
