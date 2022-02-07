import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { toJS } from "mobx";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

const AddCohort = inject("adminstore")(
  observer((props) => {
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    
    const [cohortName, setCohortName] = useState("");
    const [redirect, setRedirect] = useState(false);
    props.adminstore.getCohorts();
    console.log(toJS(props.adminstore.cohorts))
    const submit = async (e) => {
      e.preventDefault();

      setRedirect(true);
    };

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {props.adminstore.cohorts.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.name}`;
          return (
            <ListItem
              key={value.name}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value.name)}
                  checked={checked.indexOf(value.name) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value.name + 1}`}
                    src={`/static/images/avatar/${value.name + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value.name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

        
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">
            Add Cohort
          </h1>

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
