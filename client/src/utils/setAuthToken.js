import axios from "axios";

const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://port-5000-nodejs-scruffy-beard-laptopdienthoaimaytinhbang945671.codeanyapp.com/api"
    : "https://arcane-ravine-81598.herokuapp.com/api";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = apiUrl;

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["token"] = `Bearer ${token}`;
  } else {
    //delete

    delete axios.defaults.headers.common["token"];
  }
};
