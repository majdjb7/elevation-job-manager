import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "../Layout";
import AddAdmin from "./AddAdmin";
import Dashboard from "./dashboard/Dashboard";
import StudentProfile from "../student/studendProfile";

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
              <Dashboard />
            </Route>

            <Route exact path="/addAdmin">
              <AddAdmin />
            </Route>
            <Route exact path="/studentprofile">
              <StudentProfile />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}
