import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "../Layout";
import Processes from "./dashboard/processes-table/Processes";
import AddProcess from "../student/AddProcess";
import AddInterview from "../student/AddInterview";
import MyCalendar from "../MyCalendar";
import Dashboard from "../admin/dashboard/Dashboard";
import AddAdmin from "../admin/AddAdmin";
import Home from "../authentication/Home";
import { useState, useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import StudentProfile from "../student/studendProfile";
import AddCohort from "./AddCohort";
export default function Admin() {
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route exact path="/MyCalendar">
              <MyCalendar />
            </Route>
            <Route exact path="/AddAdmin">
              <AddAdmin />
            </Route>

            <Route exact path="/studentprofile">
              <StudentProfile />
            </Route>
            <Route exact path="/addCohort">
              <AddCohort />
            </Route>
            <Route exact path="/Processes">
              <Processes />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}
