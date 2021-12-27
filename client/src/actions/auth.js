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
        return res.data;
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};
