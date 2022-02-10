import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "../Layout";
import Processes from "./Processes";
import AddProcess from "../student/AddProcess";
import AddInterview from "../student/AddInterview";
import MyCalendar from "../MyCalendar";
//FOR ADMIN: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import Dashboard from "../admin/dashboard/Dashboard";
import AddAdmin from "../admin/AddAdmin";

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import StudentProfile from "../student/studendProfile";

import { useState, useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";

export default function Student() {
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Processes />
            </Route>
            <Route exact path="/addProcess">
              <AddProcess />
            </Route>
            <Route exact path="/addInterview">
              <AddInterview />
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
