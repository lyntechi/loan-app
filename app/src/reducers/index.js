import { combineReducers } from "redux";
import { messagesReducer } from "./messagesReducer";

export const allReducers = combineReducers({
  messagesReducer: messagesReducer,
});
