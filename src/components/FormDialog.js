import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AddCircleOutline } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import AddInterview from "./AddInterview";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
const useStyles = makeStyles({
  Container: {
    padding: "20px",
    maxWidth: "80%",
  },
});

const FormDialog = inject("studentStore")(
  observer((props) => {
    const [open, setOpen] = React.useState(false);
    const [interviewType, setInterviewType] = React.useState("");
    const classes = useStyles();
    const [interviewerName, setInterviewerName] = useState("");
    const [type, setType] = useState("");
    const [time, setTime] = useState("");
    const [timeError, setTimeError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [interviewerNameError, setInterviewerNameError] = useState(false);
    const [error, setError] = useState("");
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleAdd = async (e) => {
      handleClose();
      e.preventDefault();
      setTypeError(false);
      setTimeError(false);
      setInterviewerNameError(false);
      if (type == "") {
        setTypeError(true);
      }
      if (time == "") {
        setTimeError(true);
      }
      if (interviewerName == "") {
        setInterviewerNameError(true);
      }
      console.log(type, time, interviewerName);
      if (type && time && interviewerName) {
        let id = props.jobId;
        try{
        const res = await axios.post(
          "http://localhost:8888/student/jobs/" + id + "/interviews",
          { type, time, interviewerName }
        );
        await props.studentStore.addJobsFromDB();
      }catch(error){
        setError("Something wrong")
      }
    }
    };
    const handleClose = () => {
      setOpen(false);
      console.log("handleClose");
    };
    const handleChange = (event) => {
      setInterviewType(event.target.value);
    };
    return (
      <div>
        <IconButton onClick={handleClickOpen}>
          <AddCircleOutline />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ِAdd new Interview</DialogTitle>
          <DialogContent>
            <DialogContentText>
              That’s really nice. Keep working on it, you’re improving.
            </DialogContentText>
          </DialogContent>
          <div className={classes.Container}>
            <TextField
              onChange={(e) => setTime(e.target.value)}
              id="datetime-local"
              label="Add new Interview"
              type="datetime-local"
              required
              error={timeError}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Type
                </InputLabel>

                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={classes.Select}
                  label="interviewType"
                >
                  <MenuItem value={"HR"}>HR</MenuItem>
                  <MenuItem value={"Telephone"}>Telephone</MenuItem>
                  <MenuItem value={"Technical"}>Technical</MenuItem>
                  <MenuItem value={"Home Assignment"}>Home Assignment</MenuItem>
                  <MenuItem value={"Home Test"}>Home Test</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TextField
              id="standard-basic"
              label="Interviewer name"
              variant="standard"
              onChange={(e) => setInterviewerName(e.target.value)}
            />
          </div>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogActions>
          <p id="error">
          {error}
        </p>
        </Dialog>
      </div>
    );
  })
);
export default FormDialog;
