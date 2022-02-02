import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
////////////////////////////
import { inject, observer } from "mobx-react";
import { observe, toJS } from "mobx";

/////////////////////////////
import { Box, Card, CardHeader } from "@mui/material";
const AutocompleteSearch = inject("adminStore")(
  observer((props) => {
    const [value, setValue] = React.useState("");
    const [inputValue, setInputValue] = React.useState("");
    const studentsNames = toJS(props.adminStore.studentsNames);
    const handelSearch = (event) => {
      props.adminStore.filterByName(inputValue);
    };
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item lg={8} md={8} xl={8} xs={12}>
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
          <Grid item lg={4} md={4} xl={4} xs={12}>
            <Button variant="contained" size="large" onClick={handelSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  })
);
export default AutocompleteSearch;
