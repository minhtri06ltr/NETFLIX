import axios from "axios";
import { userConstants } from "./constants";
export const updateProfile = (profileForm) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch("/users/update", profileForm);
      dispatch({
        type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
        payload: response.data.updatedProfile,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
};
export const changeImg = (file) => {
  return async (dispath) => {
    try {
      const response = await axios.post("/users/avatar", file);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
};
