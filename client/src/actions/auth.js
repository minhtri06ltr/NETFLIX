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
        type: authConstants.GET_TOKEN_SUCCESS,
        payload: response.data.accessToken,
      });
      await setAuthToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      localStorage.removeItem("auth");
      window.location.href = "/";
    }
  };
};
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.GET_USER_REQUEST,
    });
    try {
      const response = await axios.get("/users/info");
      dispatch({
        type: authConstants.GET_USER_SUCCESS,
        payload: response.data.user,
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem("auth");
      window.location.href = "/";
    }
  };
};

export const resetPassowrd = (resetPassword, resetToken) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.RESET_PASSWORD_REQUEST,
    });
    try {
      const response = await axios.post(
        "/auth/reset",
        { resetPassword },
        {
          headers: { token: `Bearer ${resetToken}` },
        }
      );
      dispatch({
        type: authConstants.RESET_PASSWORD_SUCCESS,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: authConstants.RESET_PASSWORD_FAILURE,
      });

      return error.response.data;
    }
  };
};
export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.FORGOT_PASSWORD_REQUEST,
    });
    try {
      const response = await axios.post("/auth/forgot", { email });
      dispatch({
        type: authConstants.FORGOT_PASSWORD_SUCCESS,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: authConstants.FORGOT_PASSWORD_FAILURE,
      });

      return error.response.data;
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.get("/auth/logout");
      localStorage.removeItem("auth");
      setAuthToken(null);
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const googleLogin = (tokenId) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    try {
      const response = await axios.post("/auth/google_login", { tokenId });
      localStorage.setItem("auth", true);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
      });
      return error.response.data;
    }
  };
};
export const facebookLogin = (userId, accessToken) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    try {
      const response = await axios.post("/auth/facebook_login", {
        userId,
        accessToken,
      });
      localStorage.setItem("auth", true);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
      });
      return error.response.data;
    }
  };
};

export const githubLogin = (code) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    try {
      const response = await axios.post("/auth/github_login", {
        code,
      });
      localStorage.setItem("auth", true);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
      });
      return error.response.data;
    }
  };
};
