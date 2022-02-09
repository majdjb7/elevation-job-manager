import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import { useHistory, useLocation } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";

const Login = inject(
  "studentstore",
  "userstore"
)(
  observer((props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const history = useHistory();
    const location = useLocation();

    // useEffect(() => {
    //   props.studentstore.checkUserLoggedIn();
    //   // props.studentstore.setLogin();
    // }, []);

    const submit = async (e) => {
      e.preventDefault();

      const response = await fetch("http://localhost:8888/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const content = await response.json();

      if (content.message === "Success") {
        // && content.isAdmin == false
        props.userstore.setUserID(content.userID);

        props.userstore.setLogin();
        props.userstore.setUserType(content.isAdmin);
        //setRedirect(true);
      } else {
        alert(content.message);
      }
    };

    // if (redirect) {
    //   return <Redirect to="/" />;
    // }

    return (
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <h1>admin@gmail.com</h1>
        <h1>1234567891</h1>
        <h1>amer@amer.com</h1>
        <h1>123456</h1>

        <input
          type="email"
          className="form-control"
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>

        <h3>Do'nt have an account?</h3>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push("/Register")}
        >
          Register
        </Button>
      </form>
    );
  })
);

export default Login;
