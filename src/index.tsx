import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { sortData } from "./reducers";

import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
const store = createStore(sortData, {
  sort: [
    {
      key: "name",
      direction: "asc"
    },
    {
      key: "date_of_birth",
      direction: "asc"
    }
  ]
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
