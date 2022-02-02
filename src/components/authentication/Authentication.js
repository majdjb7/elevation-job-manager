import { useState, useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Authentication = inject("studentStore")(
  observer((props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
      <div>
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
      </div>
    );
  })
);
export default Authentication;
