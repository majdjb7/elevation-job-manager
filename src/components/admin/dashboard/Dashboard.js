import { Box, Container, Grid } from "@mui/material";
import TotalStudents from "./TotalStudents";
import { TotalCustomers } from "./TotalCustomers";
import { TasksProgress } from "./TasksProgress";
import { TotalProfit } from "./TotalProfit";
import { Sales } from "./Sales";
import { TrafficByDevice } from "./TrafficByDevice";
import { LatestProducts } from "./LatestProducts";
import { LatestOrders } from "./LatestOrders";
import Processes from "./processes-table/Processes";

const Dashboard = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalStudents />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalProfit sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={12} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} />
          </Grid>
          {/* <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid> */}
          <Grid item lg={12} md={12} xl={12} xs={12}>
            {/* <LatestOrders /> */}
            <Processes />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
