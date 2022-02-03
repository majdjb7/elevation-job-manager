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
import { Box, Typography } from "@mui/material";
const useStyles = makeStyles({
  Container: {
    maxWidth: "100%",
  },
  SelectL: {
    marginRight: "30%",
  },
});
export default function NestedList(props) {
  const classes = useStyles();
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <Box>
      <FormControl sx={{ minWidth: 280 }}>
        <InputLabel id="demo-simple-select-label">Show History</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
        >
          {props.interviews.map((interview) => (
            <Typography variant="h6" className={classes.SelectL}>
              {interview.type}
              {"    "}
              <Moment format="DD/MM/YYYY">{interview.time}</Moment>
              <hr />
            </Typography>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
