import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { toJS } from "mobx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
const AddCohort = inject("adminstore")(
  observer((props) => {
    function handleDelete(cohortName) {
      props.adminstore.deleteCohort(cohortName);
    }

    const [cohortName, setCohortName] = useState("");
    // const [redirect, setRedirect] = useState(false);
    props.adminstore.getCohorts();

    const submit = async (e) => {
      e.preventDefault();
      props.adminstore.addCohort(cohortName);
      setCohortName("");
    };

    return (
      <div>
        <form onSubmit={submit}>
          {/* <h1 className="h3 mb-3 fw-normal">Add Cohort</h1> */}
          <Typography component="h1" variant="h5">
            Add Cohort
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                size="small"
                id="firstName"
                label="Cohort Name"
                onChange={(e) => setCohortName(e.target.value)}
                autoFocus
                // sx={{ width: "30%" }}
              />
            </Grid>
            <Grid item lg={1}>
              <Button type="submit" sx={{ width: "30%" }} variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {props.adminstore.cohorts.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value.name}`;
            return (
              <ListItem
                key={value.name}
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      handleDelete(value.name);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={value.name} src="." />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`${value.name}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  })
);

export default AddCohort;
