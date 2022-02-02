import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "../Layout";
import Processes from "./Processes";
import AddProcess from "../AddProcess";
import AddInterview from "../AddInterview";
import AdminPage from "../admin/AdminPage";
import Dashboard from "../admin/dashboard/Dashboard";

import Home from "../authentication/Home";
import { useState, useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";

export default function Admin() {
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/adminPage">
              <AdminPage />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}