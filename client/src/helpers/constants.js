import axios from "axios";
import { store } from "../store/store";
export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://port-5000-nodejs-tiny-finland-laptopdienthoai1900975.codeanyapp.com/api"
    : "https://arcane-ravine-81598.herokuapp.com/api";
axios.defaults.withCredentials = true;
export const publicRequest = axios.create({
  baseURL: apiUrl,
});

export const userRequest = axios.create({
  baseURL: apiUrl,
  headers: {
    token: `Bearer ${store.getState().auth.token}`,
  },
});
