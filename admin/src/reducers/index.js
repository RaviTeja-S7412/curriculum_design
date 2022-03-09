import { combineReducers } from "redux";
import authReducer from "./auth.reducers";

// eslint-disable-next-line no-undef
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
