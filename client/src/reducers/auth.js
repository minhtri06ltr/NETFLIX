import { authConstants } from "../actions/constants";
const initState = {
  auth: false,
  loading: false,
  error: false,
  token: "",
  info: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    //LOGIN
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
        loading: false,
        auth: true,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: true,

        loading: false,
      };
      break;

    //REGISTER

    case authConstants.REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case authConstants.REGISTER_SUCCESS:
      if (action.validate) {
        state = {
          ...state,
          loading: false,
        };
      } else {
        state = {
          ...state,
          auth: true,
          info: action.payload,
          loading: false,
        };
      }
      break;
    case authConstants.REGISTER_FAILURE:
      state = {
        ...state,
        error: true,

        loading: false,
      };
      break;

    //GET TOKEN
    case authConstants.GET_TOKEN:
      state = {
        ...state,
        token: action.payload,
      };
      break;

    //GET USER
    case authConstants.GET_USER:
      state = {
        ...state,
        info: action.payload,
      };
      break;

    case authConstants.LOGOUT_SUCCESS:
      state = initState;

      break;
    default:
      return state;
  }
  return state;
};

export default authReducer;
