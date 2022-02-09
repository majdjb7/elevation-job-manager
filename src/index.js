import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "mobx-react";
import { StudentInventory } from "./stores/StudentInventory";
import { AdminInventory } from "./stores/AdminInventory";
import { UserInventory } from "./stores/UserInventory";

const studentstore = new StudentInventory();
const adminstore = new AdminInventory();
const userstore = new UserInventory();

const stores = {
  studentstore,
  adminstore,
  userstore,
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);
