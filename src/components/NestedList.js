import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Input from "@mui/material/Input";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { toJS } from 'mobx'
import Moment from 'react-moment';
import { Grid } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const useStyles = makeStyles({
  Container: {
    maxWidth: "100%",
  },
  SelectL: {
    width: "200px",
  },
});
export default function NestedList(props) {
  const [open, setOpen] = React.useState(false);
  const ariaLabel = { "aria-label": "description" };
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };
  const [interviewType, setInterviewType] = React.useState("");

  const handleChange = (event) => {
    setInterviewType(event.target.value);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 150 }}
      component="nav"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="open" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.interviews.length>0 ?
            props.interviews.map(i =>
              <div>
                <ListItemText sx = {{ pl: 1}} primary={`${i.type}`} />
                <Moment format="DD/MM/YYYY">{i.time}</Moment>
                <hr />
              </div>
              )
            : null }

          <TextField
            // onChange={(e) => setTime(e.target.value)}
            id="datetime-local"
            label="Add new Interview"
            type="datetime-local"
            required
            // error={timeError}
            className={classes.Container}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={interviewType}
              onChange={handleChange}
              className={classes.Select}
              label="interviewType"
            >
              <MenuItem value={10}>HR</MenuItem>
              <MenuItem value={20}>Telephone</MenuItem>
              <MenuItem value={30}>Technical</MenuItem>
              <MenuItem value={40}>Home Assignment</MenuItem>
              <MenuItem value={50}>Home Test</MenuItem>
            </Select>
          </FormControl>
        </List>
      </Collapse>
    </List>
  );
}
