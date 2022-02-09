import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
} from "@material-ui/core";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
////////////////////////////
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import {
  Work,
  SchoolRounded,
  AddCircle,
  AddCircleOutline,
} from "@material-ui/icons";
import moment from "moment";

/////////////////////////////
import NestedList from "../student/NestedList";
import FormDialog from "../student/FormDialog";

import StatusSelect from "../student/StatusSelect";
import Box from "@mui/material/Box";
import { id } from "date-fns/locale";
import { done } from "nprogress";
import { closeDelimiter } from "ejs";

const useStyles = makeStyles((theme) => ({
  field:{
    margin:"15px",
    width:"90%",
    height:"20%"
  }
  ,
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 30px",
    maxWidth: "90%",
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
}));

const Processes = inject("studentstore")(
  observer((props) => {
    //   if (props.studentstore.isAdmin === true) {
    //     return <Redirect to="/" />;
    // }
    /************************************************ */
    useEffect(async () => {
      await props.studentstore.addJobsFromDB();

    }, []);
    /************************************************ */
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [status, setStatus] = React.useState("");
    const [isEditing, setIsEditing] = React.useState(false);
    const [edit, setIsEdit] = React.useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyNameError, setCompanyNameError] = useState(false);
    const [role, setRole] = useState("");
    const [roleError, setRoleError] = useState(false);
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(false);
    const [whereFindJob, setWhereFindJob] = useState("");
    const [whereFindJobError, setWhereFindJobError] = useState(false);
    const [type, setType] = useState("");
    const [interviewId, setId] = useState("");
    const [time, setTime] = useState("");
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
      let id = null;
      const format1 = "DD/MM/YYYY HH:mm";
      new Date(
        Math.max.apply(
          null,
          interviews.map(function (e) {
            id = e._id
            maxDate = e.time;
            interviewType = e.type;
          })
        )
      );
      mostRelevantInterview = {
        "interviewType": interviewType,
        "time": moment(maxDate).format(format1),
        "id": id
      }
      // interviewType + ": " + moment(maxDate).format(format1)+": "+id;
      return mostRelevantInterview;
    };
    const handleEdit = function (id) {
      setIsEdit(id)
    }
    const closeEdit=function(){
      setIsEdit("")
    }
    
    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Company Info</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Job Info</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Current interview</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Status</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Show History</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">New interview</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Delete</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Edit</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.studentstore.StudentJobs.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Grid container>
                      <Avatar
                        alt={row.companyName}
                        src="."
                        className={classes.avatar}
                      />

                      <Grid item lg={8}>
                        {edit == row._id ? (

                          <TextField
                            className={classes.field}
                            onChange={(e) => setCompanyName(e.target.value)}
                            label="Company Name"
                            variant="outlined"
                            color="primary"
                            defaultValue={row.companyName}
                            size="small"
                            required
                            error={companyNameError}
                          />) :
                          <Typography className={classes.name}>
                            {row.companyName}
                          </Typography>}
                        {edit == row._id ?
                          <TextField
                            className={classes.field}
                            onChange={(e) => setLocation(e.target.value)}
                            label="Location"
                            variant="outlined"
                            color="primary"
                            defaultValue={row.location}
                            fullWidth
                            required
                            error={locationError}
                          />
                          : <Typography color="textSecondary" variant="body2">
                            {row.location}
                          </Typography>}
                        {edit == row._id ?
                          <Box >
                            <FormControl className={classes.field}>
                              <InputLabel id="demo-simple-select-label" >{row.whereFindJob}</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={whereFindJob}
                                label={row.whereFindJob}
                                onChange={(e) => setWhereFindJob(e.target.value)}
                              >
                                <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                <MenuItem value="Facebook">Facebook</MenuItem>
                                <MenuItem value="Company website">Company website</MenuItem>
                                <MenuItem value="Friend">Friend</MenuItem>
                              </Select>
                            </FormControl>
                          </Box> :
                          <Typography color="textSecondary" variant="body2">
                            I found it by {row.whereFindJob}
                          </Typography>
                        }
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    {edit == row._id ?
                      <TextField
                        className={classes.field}
                        onChange={(e) => setRole(e.target.value)}
                        label="Role"
                        variant="outlined"
                        color="primary"
                        defaultValue={row.role}
                        fullWidth
                        required
                        error={roleError}
                      />
                      :
                      <Typography variant="subtitle2">
                        {row.role}
                      </Typography>
                    }
                    {edit == row._id ?
                      <TextField
                        className={classes.field}
                        onChange={(e) => setDescription(e.target.value)}
                        label="description"
                        variant="outlined"
                        color="primary"
                        defaultValue={row.description}
                        fullWidth
                        required
                        error={descriptionError}
                      />
                      :
                      <Typography color="textSecondary" variant="body2">
                        {row.description}
                      </Typography>
                    }
                  </TableCell>
                  {edit == row._id ? <>
                    <Box >
                      <FormControl className={classes.field}>
                        <InputLabel id="demo-simple-select-label">{getMostRecentInterview(row.interviews).interviewType}</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={type}
                          label={getMostRecentInterview(row.interviews).interviewType}
                          onChange={(e) => {
                            setType(e.target.value)
                            setId(getMostRecentInterview(row.interviews).id)
                          }}
                        >
                          <MenuItem value="HR">HR</MenuItem>
                          <MenuItem value="Telephone">Telephone</MenuItem>
                          <MenuItem value="Technical">Technical</MenuItem>
                          <MenuItem value="Home Assignment">Home Assignment</MenuItem>
                          <MenuItem value="Home Test">Home Test</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <TextField
                      onChange={(e) => {setTime(e.target.value)
                        setId(getMostRecentInterview(row.interviews).id)}
                      }
                      id="datetime-local"
                      label="Time"
                      type="datetime-local"
                      defaultValue={getMostRecentInterview(row.interviews).time}
                      required
                      sx={{ width: 250 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </>
                    :
                    <TableCell>
                      {getMostRecentInterview(row.interviews).interviewType + ":" + getMostRecentInterview(row.interviews).time}
                    </TableCell>}
                  <TableCell>
                    <div>
                      {edit == row._id ? (
                        <StatusSelect status={status} setStatus={setStatus} className={classes.field}/>
                      ) : (
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
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <NestedList jobId={row._id} interviews={row.interviews} />
                  </TableCell>
                  <TableCell>
                    <FormDialog jobId={row._id} />
                  </TableCell>

                 
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => props.studentstore.deleteProcesses(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {edit == row._id ?
                      <IconButton aria-label="check" onClick={() =>{ 
                      props.studentstore.EditDone(row._id,companyName, location, whereFindJob, role, description, interviewId, type,time,status)
                      closeEdit()
                      }}>
                        <CheckIcon />
                      </IconButton> :
                      <IconButton aria-label="edit" onClick={() => handleEdit(row._id)}>
                        <EditIcon />
                      </IconButton>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TableFooter> */}
        <TablePagination
          className={classes.TablePagination}
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={props.studentstore.StudentJobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {/* </TableFooter> */}
      </Paper>
    );
  })
);

export default Processes;
