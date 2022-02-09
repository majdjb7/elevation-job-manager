import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import { useHistory, useLocation } from "react-router-dom";

import { inject, observer } from "mobx-react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

      const response = await fetch("/auth/login", {
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

    function Copyright(props) {
      return (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          {...props}
        >
          {"Copyright © "}
          <Link
            color="inherit"
            href="https://elevation.ac/he/?placement&utm_term=elevation&utm_campaign=Elevation%20-%20Brand&utm_source=google&utm_medium=cpc&hsa_acc=4465174973&hsa_net=adwords&hsa_cam=6553671782&hsa_ad=512242236400&hsa_kw=elevation&hsa_grp=80166385658&hsa_mt=e&hsa_ver=3&hsa_src=g&hsa_tgt=kwd-13311466&gclid=CjwKCAiAo4OQBhBBEiwA5KWu_x8hZtZ9X-XVniq9OWe4tQ4YzvcmzT_QXR0pnTUe87gJXrOZbynPXBoCPn8QAvD_BwE"
          >
            Elevation
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      );
    }
    const theme = createTheme();
    return (
      <ThemeProvider theme={theme}>
        <h1>admin@gmail.com</h1>
        <h1>1234567891</h1>
        <h1>user@gmail.com</h1>
        <h1>123456</h1>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(data:image/jpeg;base64,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)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#2e70ff" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={submit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        history.push({
                          pathname: "/",
                        });
                      }}
                    >
                      Don't have an account? Sign Up
                    </Button>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  })
);

export default Login;
