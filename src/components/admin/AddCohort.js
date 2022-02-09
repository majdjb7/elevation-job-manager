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
      // setRedirect(true);
    };

    // if (redirect) {
    //   return <Redirect to="/" />;
    // }

    return (
      <div>
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

        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Add Cohort</h1>

          <input
            className="form-control"
            placeholder="Cohort Name"
            required
            onChange={(e) => setCohortName(e.target.value)}
          />

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  })
);

export default AddCohort;
