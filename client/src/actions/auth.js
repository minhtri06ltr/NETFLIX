import { authConstants } from "./constants";
import { setAuthToken } from "../utils/setAuthToken";
import axios from "axios";
export const login = (loginForm) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    try {
      const res = await axios.post("/auth/login", loginForm);

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
      });

      localStorage.setItem("auth", true);
      return res.data;
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
      });
      return error.response.data;
    }
  };
};

export const register = (registerForm) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.REGISTER_REQUEST,
    });
    try {
      const res = await axios.post("/auth/register", registerForm);
      dispatch({
        type: authConstants.REGISTER_SUCCESS,
        payload: res.data,
        validate: res.data.validate,
      });
      return res.data;
    } catch (error) {
      dispatch({
        type: authConstants.REGISTER_FAILURE,
      });

      return error.response.data;
    }
  };
};
export const activateEmail = (activationToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/auth/activation", {
        activationToken,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
};
export const getToken = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/auth/refreshToken");
      dispatch({
        type: authConstants.GET_TOKEN,
        payload: response.data.accessToken,
      });
      await setAuthToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
};
export const getUser = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/users/info");
      dispatch({
        type: authConstants.GET_USER,
        payload: response.data.user,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.get("/auth/logout");
      localStorage.removeItem("auth");
      window.location.href = "/";
    } catch (error) {
      window.location.href = "/";
    }
  };
};
