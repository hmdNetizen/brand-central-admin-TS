import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import DashboardRectangularCards from "src/components/components/dashboard/DashboardRectangularCards";

type DashboardProps = {
  menuSlideIn: boolean;
};

const Container = styled(Grid)<DashboardProps>(({ theme, menuSlideIn }) => ({
  padding: "4rem 3rem",

  [theme.breakpoints.only("sm")]: {
    padding: menuSlideIn ? "4rem 3rem" : "4rem 1.5rem",
  },

  [theme.breakpoints.only("xs")]: {
    padding: "6rem 2rem 5rem",
  },
}));

const Dashboard = ({ menuSlideIn }: DashboardProps) => {
  return (
    <Container container direction="column" menuSlideIn={menuSlideIn}>
      <DashboardRectangularCards menuSlideIn={menuSlideIn} />
      <DashboardCircularCard menuSlideIn={menuSlideIn} />
      <Grid item container className={classes.infoTableWrapper}>
        <Grid item md>
          <DashboardOrderTable />
        </Grid>
        <Grid item md>
          <DashboardCustomerTable />
        </Grid>
      </Grid>
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
