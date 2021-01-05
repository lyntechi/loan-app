import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { allReducers } from "./reducers/index.js";
import thunk from "redux-thunk";
import logger from "redux-logger";

//I created my store to use for the api data being fetched however
//I been trying to debug why the api data isnt reaching the redux store
const store = createStore(allReducers, applyMiddleware(logger, thunk));
// console.log("this is the redux store current state", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
