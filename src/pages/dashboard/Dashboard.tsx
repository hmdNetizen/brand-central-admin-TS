import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import DashboardRectangularCards from "src/components/dashboard/DashboardRectangularCards";
import DashboardCircularCards from "src/components/dashboard/DashboardCircularCards";
import { DashboardProps } from "./types";
import {
  Container,
  InforTableWrapper,
} from "src/components/dashboard/styles/DashboardStyles";

const Dashboard = ({ menuSlideIn }: DashboardProps) => {
  return (
    <Container container direction="column" menuSlideIn={menuSlideIn}>
      <DashboardRectangularCards menuSlideIn={menuSlideIn} />
      <DashboardCircularCards menuSlideIn={menuSlideIn} />
      <InforTableWrapper item container menuSlideIn={menuSlideIn}>
        <Grid item md>
          <DashboardOrderTable />
        </Grid>
        <Grid item md>
          <DashboardCustomerTable />
        </Grid>
      </InforTableWrapper>
      <Grid item container style={{ padding: "5rem 0" }}>
        <DashboardRecentProducts />
      </Grid>
      <Grid item container style={{ padding: "0 0 5rem 0" }}>
        <DashboardPopularProducts />
      </Grid>
    </Container>
  );
};

export default Dashboard;
