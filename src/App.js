import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import Processes from "./components/Processes";
import AddProcess from "./components/AddProcess";
import AddInterview from "./components/AddInterview";
import AdminPage from "./components/AdminPage";
import StudentProfile from"./components/studendProfile";
import { useState, useEffect } from "react";
import axios from "axios";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* to overide and change the orignal colors and thems in other comps */}
      <Router>
        <Layout>
          {/* to make the navbar and the bar stick on all the pgs down */}

          <Switch>
            {/* Switch = every time will get 1 router */}
            <Route exact path="/">
              <Processes />
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
            <Route exact path="/studentprofile">
              <StudentProfile />
            </Route>
            
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
