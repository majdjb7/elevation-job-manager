import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import axios from "axios";
import React, { useState, useEffect } from "react";
export const TasksProgress = (props) => {
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    let result = await axios.get(`http://localhost:8888/admin/tasks-progress`);

    setTasks(result.data.counterTasksProgress);
  }, []);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TASKS PROGRESS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              56%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={56} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};
