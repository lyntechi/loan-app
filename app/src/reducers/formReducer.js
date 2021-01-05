import { LOG_ERROR, GET_API_DATA } from "../actions/formActions";

const initialState = {
  apiData: [],
  message: "",
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_DATA:
      return { ...state, apiData: [...state.apiData, action.payload] };
    case LOG_ERROR:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
