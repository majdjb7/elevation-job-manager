import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import Processes from "./components/student/Processes";
import AddProcess from "./components/AddProcess";
import AddInterview from "./components/AddInterview";
import StudentProfile from "./components/student/studendProfile";
import AdminPage from "./components/admin/AdminPage";
import Dashboard from "./components/admin/dashboard/Dashboard";

import { useState, useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import Home from "./components/authentication/Home";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";

import NestedList from "./components/NestedList";
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

const App = inject("studentStore")(
  observer((props) => {
    // const [name, setName] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      props.studentStore.checkUserLoggedIn();
      // if(props.studentStore.name != '') {
      //   setLoggedIn(true)
      // }
    });

    return (
      <ThemeProvider theme={theme}>
        {/* to overide and change the orignal colors and thems in other comps */}
        {props.studentStore.isLoggedIn ? (
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/processes">
                  <Processes />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>

                <Route exact path="/addProcess">
                  <AddProcess />
                </Route>
                <Route exact path="/addInterview">
                  <AddInterview />
                </Route>

                <Route exact path="/AdminPage">
                  <AdminPage />
                </Route>

                <Route exact path="/Home">
                  <Home />
                </Route>

                <Route exact path="/Register">
                  <Register />
                </Route>

                <Route exact path="/Login">
                  <Login />
                </Route>
                <Route exact path="/studentprofile">
                  <StudentProfile />
                </Route>
              </Switch>
            </Layout>
          </Router>
        ) : (
          <Router>
            <Switch>
              <Route exact path="/">
                <Home
                  name={props.studentStore.firstName}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              </Route>

              <Route exact path="/Login">
                <Login />
              </Route>

              <Route exact path="/Register">
                <Register />
              </Route>
            </Switch>
          </Router>
        )}
      </ThemeProvider>
    );
  })
);

export default App;
