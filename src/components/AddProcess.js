import React, { useState } from "react";
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
import axios from "axios";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    maxWidth: "35%",
  },
  Container: {
    marginLeft: "-80px",
  },
});

function AddProcess() {
  const MAJD_ID = "61f6c18cebcb5be4dc8f990c";
  const AYMAN_ID = "61f10b63c075b471f2572f98";
  const MOSTFA_ID = "61f10b63c075b471f2572f4f";

  const classes = useStyles();
  const history = useHistory();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCompanyNameError(false);
    setRoleError(false);
    setLocationError(false);
    setDescriptionError(false);
    setWhereFindJobError(false);

    if (companyName == "") {
      setCompanyNameError(true);
    }
    if (role == "") {
      setRoleError(true);
    }
    if (location == "") {
      setLocationError(true);
    }
    if (description == "") {
      setDescriptionError(true);
    }
    if (whereFindJob == "") {
      setWhereFindJobError(true);
    }
    if (companyName && role && location && description && whereFindJob) {
      const res = await axios.post(
        `http://localhost:8888/student/jobs/${MAJD_ID}`,
        { companyName, role, location, description, whereFindJob }
      );
      history.push({
        pathname: "/addInterview",
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
        Create a New Procsss
      </Typography>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.Container}
      >
        <TextField
          className={classes.field}
          onChange={(e) => setCompanyName(e.target.value)}
          label="Company Name"
          variant="outlined"
          color="primary"
          fullWidth
          required
          error={companyNameError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => setRole(e.target.value)}
          label="Role"
          variant="outlined"
          color="primary"
          fullWidth
          required
          error={roleError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => setLocation(e.target.value)}
          label="Location"
          variant="outlined"
          color="primary"
          fullWidth
          required
          error={locationError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => setDescription(e.target.value)}
          label="description"
          variant="outlined"
          color="primary"
          fullWidth
          required
          error={descriptionError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Where You Find The Job</FormLabel>
          <RadioGroup
            error={whereFindJob}
            value={whereFindJob}
            onChange={(e) => setWhereFindJob(e.target.value)}
          >
            <FormControlLabel
              value="LinkedIn"
              control={<Radio color="primary" />}
              label="LinkedIn"
            />
            <FormControlLabel
              value="Facebook"
              control={<Radio color="primary" />}
              label="Facebook"
            />
            <FormControlLabel
              value="Company website"
              control={<Radio color="primary" />}
              label="Company website"
            />
            <FormControlLabel
              value="Friend"
              control={<Radio color="primary" />}
              label="Friend"
            />
          </RadioGroup>
        </FormControl>

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
}
export default AddProcess;
