export const GET_API_DATA = "GET_API_DATA";
export const LOG_ERROR = "LOG_ERROR";

export const fetchApiData = () => (dispatch) => {
  fetch("db.json")
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return dispatch({ type: GET_API_DATA, payload: result });
    })
    .catch((err) => {
      return dispatch({ type: LOG_ERROR, payload: err });
    });
};
