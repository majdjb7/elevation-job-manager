import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "mobx-react";
import { StudentInventory } from "./stores/StudentInventory";
import { AdminInventory } from "./stores/AdminInventory";

const studentstore = new StudentInventory();
const adminstore = new AdminInventory();

const stores = {
  studentstore,
  adminstore,
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
