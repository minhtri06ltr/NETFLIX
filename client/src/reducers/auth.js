import { authConstants } from "../actions/constants";
const initState = {
  auth: false,
  loading: false,
  error: false,
  message: "",
  info: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        auth: true,
        info: action.payload,
        loading: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: true,
        message: action.payload,
        loading: false,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default authReducer;
