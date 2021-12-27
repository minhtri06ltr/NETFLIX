import { createStore, applyMiddleware, combineReducers } from "redux";
import authReducer from "../reducers/auth";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  combineReducers({
    auth: authReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
); //store all state

export default store;
