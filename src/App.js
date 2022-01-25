import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import Processes from "./components/Processes";
import AddProcess from "./components/AddProcess"
import AddInterview from "./components/AddInterview";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [studentData, setstudentData] = useState([]);

  useEffect(() => {
    //const response = await axios.get("http://localhost:8888//jobs/:id/interviews");
    let response = [
      {
        CompanyName: "Intel",
        role: "back-end",
        Location: "Haifa",
        description: "requirements:c++,c#,nodeJs",
        status: "open",
        whereFindJob: "Facebook",
      },
      {
        CompanyName: "Google",
        role: "front-end",
        Location: "Tel-Aviv",
        description: "requirements:React",
        status: "pending",
        whereFindJob: "Friend",
      },
      {
        CompanyName: "Facebook",
        role: "Full stack",
        Location: "Haifa",
        description: "requirements:React,nodeJs",
        status: "open",
        whereFindJob: "LinkedIn",
      },
      {
        CompanyName: "Intel",
        role: "back-end",
        Location: "Haifa",
        description: "requirements:c++,c#,nodeJs",
        status: "blocked",
        whereFindJob: "Facebook",
      },
      {
        CompanyName: "Google",
        role: "front-end",
        Location: "Tel-Aviv",
        description: "requirements:React",
        status: "open",
        whereFindJob: "Friend",
      },
      {
        CompanyName: "Facebook",
        role: "Full stack",
        Location: "Haifa",
        description: "requirements:React,nodeJs",
        status: "open",
        whereFindJob: "LinkedIn",
      },
      {
        CompanyName: "Intel",
        role: "back-end",
        Location: "Haifa",
        description: "requirements:c++,c#,nodeJs",
        status: "open",
        whereFindJob: "Facebook",
      },
      {
        CompanyName: "Google",
        role: "front-end",
        Location: "Tel-Aviv",
        description: "requirements:React",
        status: "open",
        whereFindJob: "Friend",
      },
      {
        CompanyName: "Facebook",
        role: "Full stack",
        Location: "Haifa",
        description: "requirements:React,nodeJs",
        status: "open",
        whereFindJob: "LinkedIn",
      },
      {
        CompanyName: "Intel",
        role: "back-ind",
        Location: "Haifa",
        description: "requirements:c++,c#,nodeJs",
        status: "open",
        whereFindJob: "Facebook",
      },
      {
        CompanyName: "Google",
        role: "front-ind",
        Location: "Tel-Aviv",
        description: "requirements:React",
        status: "open",
        whereFindJob: "Friend",
      },
      {
        CompanyName: "Facebook",
        role: "Full stack",
        Location: "Haifa",
        description: "requirements:React,nodeJs",
        status: "open",
        whereFindJob: "LinkedIn",
      },
      {
        CompanyName: "Intel",
        role: "back-ind",
        Location: "Haifa",
        description: "requirements:c++,c#,nodeJs",
        status: "open",
        whereFindJob: "Facebook",
      },
      {
        CompanyName: "Google",
        role: "front-ind",
        Location: "Tel-Aviv",
        description: "requirements:React",
        status: "open",
        whereFindJob: "Friend",
      },
      {
        CompanyName: "Facebook",
        role: "Full stack",
        Location: "Haifa",
        description: "requirements:React,nodeJs",
        status: "open",
        whereFindJob: "LinkedIn",
      },
    ];

    setstudentData(response);
    console.log(response);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* to overide and change the orignal colors and thems in other comps */}
      <Router>
        <Layout>
          {/* to make the navbar and the bar stick on all the pgs down */}

          <Switch>
            {/* Switch = every time will get 1 router */}
            <Route exact path="/">
              <Processes studentData={studentData} />
            </Route>
            <Route exact path="/addProcess">
              <AddProcess  />
            </Route>
            <Route exact path="/addInterview">
              <AddInterview  />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
