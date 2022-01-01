import axios from "axios";
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
    token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzZmNDBhNmFiZDVhMzI4YjFlMGQ2NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDQyOTY4MywiZXhwIjoxNjQwODYxNjgzfQ.47nHyZpbofWoLnPyYdByrgE6GA30wBuLcXsW44E_0X8",
  },
});
