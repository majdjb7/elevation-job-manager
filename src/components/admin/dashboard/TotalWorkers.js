import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";

import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { toJS } from "mobx";

export const TotalWorkers = inject(
  "adminstore",
  "studentstore"
)(
  observer((props) => {
    props.adminstore.getTotalWorkers();
    return (
      <Card {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                TOTAL WORKERS
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {props.adminstore.totalWorkers}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                  height: 56,
                  width: 56,
                }}
              >
                <WorkOutlineRoundedIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2,
            }}
          >
            <ArrowUpwardIcon color="success" />
            <Typography
              variant="body2"
              sx={{
                mr: 1,
              }}
            >
              16%
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Since last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  })
);
