import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
  Container,
} from "@material-ui/core";

////////////////////////////
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { toJS } from "mobx";
/////////////////////////////
import NestedList from "../../../NestedList";

import BasicSelect from "../../filter/BasicSelect";
import AutocompleteSearch from "../../filter/AutocompleteSearch";

import moment from "moment";
///////////////////////////////////
import { format } from "date-fns";
import { Box, Card, CardHeader } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 30px",
    maxWidth: "90%",
  },
  tableHeaderCellForName: {
    fontWeight: "bold",
    color: "#0066ff",
    // width: "25%",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "#0066ff",
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
    marginRight: "15px",
  },
  name: {
    fontWeight: "bold",
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  TablePagination: {
    maxWidth: "32%",
  },
  filter: {
    margin: "20px 0px",
  },
}));

export default function Filter() {
  const classes = useStyles();
  return (
    <Container maxWidth={false}>
      <Grid container className={classes.filter} spacing={3}>
        <Grid item item lg={7} md={3} xl={9} xs={1}>
          <AutocompleteSearch />
        </Grid>
        <Grid item item lg={2} md={12} xl={1} xs={12}>
          <BasicSelect
            selectBy="Cohort"
            ArrMenuItems={["All", "Cohort 21", "Cohort 22"]}
          />
        </Grid>
        <Grid item item lg={2} md={12} xl={1} xs={12}>
          <BasicSelect
            selectBy="Status"
            ArrMenuItems={["Open", "Pending", "Accepted", "Rejected"]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
