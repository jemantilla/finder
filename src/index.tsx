import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { sortData } from "./reducers";

import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const store = createStore(sortData, {
  name: "asc",
  date_of_birth: "asc"
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
