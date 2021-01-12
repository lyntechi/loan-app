import { LOG_ERROR, GET_API_DATA } from "../actions/messagesActions";

const initialState = {
  apiData: [],
  message: "",
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_DATA:
      return { ...state, apiData: action.payload };
    case LOG_ERROR:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
