import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

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

const Register = inject("adminstore")(
  observer((props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [cohort, setCohort] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [cohortsArr, setCohortsArr] = useState([]);

    useEffect(() => {
      props.adminstore.getCohorts();
    }, []);

    const submit = async (e) => {
      e.preventDefault();

      await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobileNo,
          cohort,
          password,
        }),
      });
      setRedirect(true);
    };

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#2e70ff" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Cohort
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={cohort}
                      label="Cohort"
                      onChange={(e) => setCohort(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {props.adminstore.cohorts.map((c, i) => (
                        <MenuItem key={c.name + " " + i} value={c.name}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      Choose one of the above cohorts
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <div
                    onClick={() => {
                      history.push({
                        pathname: "/",
                      });
                    }}
                  >
                    Already have an account? Sign in
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
  })
);

export default Register;
