import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

import Processes from "./components/student/Processes";
import AddProcess from "./components/student/AddProcess";
import AddInterview from "./components/student/AddInterview";
import Student from "./components/student/Student";

import Dashboard from "./components/admin/dashboard/Dashboard";

import { useState, useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import Home from "./components/authentication/Home";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import AddAdmin from "./components/admin/AddAdmin";

import NestedList from "./components/student/NestedList";

//////////
import Admin from "./components/admin/Admin";
import Authentication from "./components/authentication/Authentication";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1a73e8",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const App = inject(
  "studentstore",
  "adminstore",
  "userstore"
)(
  observer((props) => {
    props.userstore.checkUserLoggedIn();
    let routes;
    if (props.userstore.isLoggedIn) {
      if (props.userstore.isAdmin) {
        routes = <Admin />;
      } else {
        routes = <Student />;
      }
    } else {
      routes = <Authentication />;
    }

    return <ThemeProvider theme={theme}>{routes}</ThemeProvider>;
  })
);

export default App;
