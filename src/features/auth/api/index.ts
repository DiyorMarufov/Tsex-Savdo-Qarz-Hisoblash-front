import axios from "axios";
import config from "../../../shared/config";
import { store } from "../../../app/store";
import { setToken } from "../model/authModel";

export const api = axios.create({
  baseURL: config.BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.status === 401) {
      store.dispatch(setToken(null));
      localStorage.removeItem("access-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
