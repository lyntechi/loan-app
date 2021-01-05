import { combineReducers } from "redux";
import { formReducer } from "./formReducer";

export const allReducers = combineReducers({
  formReducer: formReducer,
});
