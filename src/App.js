import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import Processes from "./components/Processes";
import AddProcess from "./components/AddProcess";
import AddInterview from "./components/AddInterview";
import AdminPage from "./components/AdminPage";
import { useState, useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

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

const App= inject("studentStore")(
  observer((props) => {

  // const [name, setName] = useState('');

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    props.studentStore.checkUserLoggedIn()
    // if(props.studentStore.name != '') {
    //   setLoggedIn(true)
    // }
  });

  return (
    <ThemeProvider theme={theme}>
      {/* to overide and change the orignal colors and thems in other comps */}
        {loggedIn ?
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/processes">
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

              <Route exact path="/Home">
                <Home />
              </Route>

              <Route exact path="/Register">
                <Register />
              </Route>

              <Route exact path="/Login">
                <Login />
              </Route>
            </Switch>
          </Layout>
        </Router> :
                <Router>
                  <Switch>
                    <Route exact path="/">
                      <Home name={props.studentStore.name} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                    </Route>
                  </Switch>
                  </Router>}
        
    </ThemeProvider>
  );
}));

export default App;
