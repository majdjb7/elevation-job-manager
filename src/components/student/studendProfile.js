import React from "react";
import Processes from "./Processes";
import UserDetails from "./UserDetails";
import Simulation from "../admin/Simulation";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const StudentProfile = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <UserDetails />
      </Grid>
      <Grid item xs={8}>
        <Simulation />
      </Grid>

      <Grid item xs={12}>
        <Processes />
      </Grid>
    </Grid>
  </Box>
);

export default StudentProfile;
