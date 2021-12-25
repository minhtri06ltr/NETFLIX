import axios from 'axios'
export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://5000-violet-caribou-zv5x65bj.ws-us25.gitpod.io/api"
    : "https://arcane-ravine-81598.herokuapp.com/api";

    export const publicRequest = axios.create({
  baseURL: apiUrl,
    });
  export const userRequest = axios.create({
    baseURL: apiUrl,
    headers: {
      token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzE5ZGU1ZjY5MTYxMTFjNzk1ODQ2ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDQwMjA4MSwiZXhwIjoxNjQwODM0MDgxfQ.T0zUMHUvP8SzVuD9FcZXXI59X0H-cX2OuLpK34oPtxU"
    }
});