import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { allReducers } from "./reducers/index.js";
import thunk from "redux-thunk";
// import logger from "redux-logger";

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
