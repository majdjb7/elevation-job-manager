import { useHistory } from "react-router-dom";
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
  Button,
} from "@material-ui/core";
// import Button from '@mui/material/Button';
////////////////////////////
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { toJS } from "mobx";
/////////////////////////////
import NestedList from "../../../student/NestedList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BasicSelect from "../../filter/BasicSelect";
import AutocompleteSearch from "../../filter/AutocompleteSearch";
import Filter from "./Filter";
import { Redirect } from "react-router-dom";
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
    cursor: "pointer",
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
    width: "94%",
  },
  filter: {
    margin: "20px 0px",
  },
}));

const Processes = inject(
  "adminstore",
  "studentstore"
)(
  observer((props) => {
    /************************************************ */
    // if (props.studentstore.isAdmin === false) {
    //   return <Redirect to="/" />;
    // }
    const history = useHistory();
    useEffect(async () => {
      await props.adminstore.getAllStudentsProcessesFromDB();

      props.adminstore.getAllStudentsNames();
    }, []);
    /************************************************ */
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const getMostRecentInterview = function (interviews) {
      let mostRelevantInterview,
        interviewType = null;
      let maxDate = null;
      const format1 = "DD/MM/YYYY HH:mm";
      new Date(
        Math.max.apply(
          null,
          interviews.map(function (e) {
            maxDate = e.time;
            interviewType = e.type;
          })
        )
      );
      mostRelevantInterview =
        interviewType + ": " + moment(maxDate).format(format1);
      return mostRelevantInterview;
    };
    const studentPage = async function (id) {
      const data = await props.studentstore.getStudentData(id);

      history.push({
        pathname: "/studentprofile",
      });
    };

    return (
      <div>
        <Card {...props}>
          <CardHeader title="Student Processes" />
          <Box sx={{ minWidth: 800 }}>
            <Filter />
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaderCellForName}>
                      <Typography variant="h6">Student Name</Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <Typography variant="h6">Company Info</Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <Typography variant="h6">Job Info</Typography>
                    </TableCell>

                    <TableCell className={classes.tableHeaderCell}>
                      <Typography variant="h6">Current Interview</Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <Typography variant="h6">Status</Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <Typography variant="h6">Show History</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {props.adminstore.allStudentsProcesses
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell>
                          <Grid container>
                            <Avatar
                              alt={row.studentName}
                              src="."
                              className={classes.avatar}
                            />
                            <Grid item lg={5}>
                              <Typography
                                className={classes.name}
                                onClick={() => studentPage(row.studentId)}
                              >
                                {row.studentName}
                              </Typography>

                              <Typography color="textSecondary" variant="body2">
                                {row.cohort}
                              </Typography>
                              <Typography color="textSecondary" variant="body2">
                                Phone No: {row.mobileNo}
                              </Typography>
                              <Typography color="textSecondary" variant="body2">
                                eMail: {row.email}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Grid container>
                            <Grid item lg={8}>
                              <Typography className={classes.name}>
                                {row.companyName}
                              </Typography>
                              <Typography color="textSecondary" variant="body2">
                                {row.location}
                              </Typography>
                              <Typography color="textSecondary" variant="body2">
                                I found it by {row.whereFindJob}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>

                        <TableCell>
                          <Typography variant="subtitle2">
                            {row.role}
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            {row.description}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          {getMostRecentInterview(row.interviews)}
                        </TableCell>

                        <TableCell>
                          <Typography
                            className={classes.status}
                            style={{
                              backgroundColor:
                                (row.status === "Open" && "blue") ||
                                (row.status === "Pending" && "orange") ||
                                (row.status === "Accepted" && "green") ||
                                (row.status === "Rejected" && "red"),
                            }}
                          >
                            {row.status}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <NestedList interviews={row.interviews} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              className={classes.TablePagination}
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={props.adminstore.allStudentsProcesses.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box>
        </Card>

        {/* </Paper> */}
      </div>
    );
  })
);

export default Processes;
