import { publicRequest } from "../helpers/constants";
import { authConstants } from "./constants";

export const login = (loginForm) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    try {
      const res = await publicRequest.post("/auth/login", loginForm);
      if (res.data.success) {
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: res.data.info,
        });
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("auth", true);
        return res.data;
      }
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
      const res = await publicRequest.post("/auth/register", registerForm);
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
      const response = await publicRequest.post("/auth/activation", {
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
      const response = await publicRequest.post("/auth/refreshToken");
      console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch({
      type: authConstants.LOGOUT_SUCCESS,
    });
  };
};
