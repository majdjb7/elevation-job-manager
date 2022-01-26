import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    maxWidth: "25%",
  },
  Container: {
    marginLeft: "-80px",
  },
});
const AddInterview = inject("studentStore")(
  observer((props) => {
    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const [type, setType] = useState("");
    const [typeError, setTypeError] = useState(false);
    const [time, setTime] = useState("");
    const [timeError, setTimeError] = useState(false);
    const [interviewerName, setInterviewerName] = useState("");
    const [interviewerNameError, setInterviewerNameError] = useState(false);

    const handleSubmit = async (e) => {
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

      if (type && time && interviewerName) {
        let id = location.state;
        const res = await axios.post(
          "http://localhost:8888/jobs/" + id + "/interviews",
          { type, time, interviewerName }
        );
        await props.studentStore.addJobsFromDB();
        history.push({
          pathname: "/",
          state: res.data._id,
        });
      }
    };

    return (
      <Container size="sm">
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
          className={classes.Container}
        >
          Create a New Interview
        </Typography>

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.Container}
        >
          <FormControl className={classes.field}>
            <FormLabel>Type</FormLabel>
            <RadioGroup value={type} onChange={(e) => setType(e.target.value)}>
              <FormControlLabel value="HR" control={<Radio />} label="HR" />
              <FormControlLabel
                value="Telephone"
                control={<Radio color="primary" />}
                label="Telephone"
              />
              <FormControlLabel
                value="Technical"
                control={<Radio color="primary" />}
                label="Technical"
              />
              <FormControlLabel
                value="Home Assignment"
                control={<Radio color="primary" />}
                label="Home Assignment"
              />
              <FormControlLabel
                value="Home Test"
                control={<Radio color="primary" />}
                label="Home Test"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            onChange={(e) => setTime(e.target.value)}
            id="datetime-local"
            label="Time"
            type="datetime-local"
            required
            error={timeError}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.field}
            onChange={(e) => setInterviewerName(e.target.value)}
            label="InterviewerName"
            variant="outlined"
            color="primary"
            fullWidth
            required
            error={interviewerNameError}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    );
  })
);
export default AddInterview;
