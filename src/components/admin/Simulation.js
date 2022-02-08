import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import axios from "axios";
const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    maxWidth: "50%",
  },
  Container: {
    //      marginLeft: "-80px",
  },
});

const Simulation = inject("studentstore")(
  observer((props) => {
    const classes = useStyles();
    const [zoom, setZoom] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("");
    const send = async () => {
      if (zoom && time && type && props.studentstore.studentData.firstName) {
        const res = await axios.post(
          `/admin/message/send`, //http://localhost:8888
          {
            zoom,
            time,
            type,
            firstName: props.studentstore.studentData.firstName,
          }
        );
      }
    };
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              color="textSecondary"
              component="h2"
              gutterBottom
            >
              inivite to simulation
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  onChange={(e) => setZoom(e.target.value)}
                  className={classes.field}
                  label="Zoom URL"
                  variant="outlined"
                  color="primary"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={(e) => setTime(e.target.value)}
                  className={classes.field}
                  id="datetime-local"
                  label="Time"
                  type="datetime-local"
                  required
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.field}>
                  <FormLabel>Type</FormLabel>
                  <RadioGroup
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="HR"
                        control={<Radio color="primary" />}
                        label="HR"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="Technical"
                        control={<Radio color="primary" />}
                        label="Technical"
                      />
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={send}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    );
  })
);

export default Simulation;
