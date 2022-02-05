import React, { useState, useEffect } from "react";
import { purple, red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
////////////////////////////
import { inject, observer } from "mobx-react";
import { observe, toJS } from "mobx";

/////////////////////////////
import { Box, Card, CardHeader } from "@mui/material";
import { makeStyles } from "@material-ui/core";
// const useStyles = makeStyles({
//   field: {
//     width: "17%",
//     backgroundColor: "#0066ff",
//     color: "white",
//     borderRadius: "5px",
//     // padding: "4px",
//   },
// });
const AutocompleteSearch = inject("adminstore")(
  observer((props) => {
    // const classes = useStyles();
    const [value, setValue] = React.useState("");
    const [inputValue, setInputValue] = React.useState("");
    const studentsNames = toJS(props.adminstore.studentsNames);
    const handelSearch = (event) => {
      props.adminstore.filterProcessesByName(inputValue);
    };
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={8} xl={6} xs={12}>
            <Autocomplete
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="free-solo-demo"
              freeSolo
              size="small"
              options={studentsNames.map((s) => s)}
              renderInput={(params) => (
                <TextField {...params} label="Search for student..." />
              )}
            />
          </Grid>
          <Grid item lg={6} md={4} xl={6} xs={12}>
            <Button
              variant="contained"
              onClick={handelSearch}
              startIcon={<PersonSearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  })
);
export default AutocompleteSearch;
