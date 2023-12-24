import axios from "axios";

export const api = axios.create({
  baseURL: "https://brasilaberto.com/api/v1/zipcode",
});
