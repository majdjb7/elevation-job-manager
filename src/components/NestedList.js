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
import { toJS } from "mobx";
import Moment from "react-moment";
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
        <ListItemText primary="Type-Date" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.interviews.length > 0
            ? props.interviews.map((i) => (
                <div>
                  <ListItemText sx={{ pl: 1 }} primary={`${i.type}`} />
                  <Moment format="DD/MM/YYYY">{i.time}</Moment>
                  <hr />
                </div>
              ))
            : null}
        </List>
      </Collapse>
    </List>
  );
}
