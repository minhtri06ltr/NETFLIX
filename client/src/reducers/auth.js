import { authConstants } from "../actions/constants";
const initState = {
  auth: false,
  loading: false,
  error: false,

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

       //FORGOT PASSWORD
    case authConstants.FORGOT_PASSWORD_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
    case authConstants.FORGOT_PASSWORD_SUCCESS:
            state = {
              ...state,
              loading: false,
            };
            break;
    case authConstants.FORGOT_PASSWORD_FAILURE:
                state = {
                  ...state,
                  loading: false,
                };
                break;


                //RESET PASSWORD
    case authConstants.RESET_PASSWORD_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
    case authConstants.RESET_PASSWORD_SUCCESS:
            state = {
              ...state,
              loading: false,
            };
            break;
    case authConstants.RESET_PASSWORD_FAILURE:
                state = {
                  ...state,
                  loading: false,
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
