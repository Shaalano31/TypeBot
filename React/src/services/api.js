import axios from "axios";
import { removeStorageItem } from "../utils";
import { STORAGE_KEYS } from "../utils/constants";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token expired or invalid, logging out...");

      // Clear the token
      removeStorageItem(STORAGE_KEYS.TOKEN);

      // Redirect to login
      // window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
