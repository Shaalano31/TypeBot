import { getStorageItem, removeStorageItem, setStorageItem } from "../utils";
import { STORAGE_KEYS } from "../utils/constants";
import api from "./api";

export const TypeBotServices = {
  login: async (username, password) => {
    try {
      const response = await api.post("/login", {
        username,
        password,
      });

      console.log(response?.data?.access_token);

      const token = response?.data?.access_token;
      setStorageItem(STORAGE_KEYS.TOKEN, token);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      throw new Error(message);
    }
  },
  logout: async () => {
    try {
      const token = getStorageItem(STORAGE_KEYS.TOKEN);
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      removeStorageItem(STORAGE_KEYS.TOKEN);
    } catch (err) {
      throw new Error("Logout request failed or not implemented on backend ");
    }
  },
  getBotsList: async () => {
    try {
      const token = getStorageItem(STORAGE_KEYS.TOKEN);

      const { data } = await api.get("/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const botsArray = Array.isArray(data?.typebots) ? data.typebots : [];
      return botsArray;
    } catch (err) {
      const msg =
        err.response?.data?.message || err.response?.statusText || err.message;
      throw new Error(`Failed to fetch bots: ${msg}`);
    }
  },
  getBot: async (id) => {
    try {
      const token = getStorageItem(STORAGE_KEYS.TOKEN);
      const response = await api.get(`/typebots/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await api.get(`/typebots/${id}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        publicId: response?.data?.typebot?.publicId,
        stats: data?.stats,
      };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to load bot data.");
    }
  },
};
