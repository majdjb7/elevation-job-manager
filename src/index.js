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


