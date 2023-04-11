import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import DashboardRectangularCards from "src/components/dashboard/DashboardRectangularCards";
import DashboardCircularCards from "src/components/dashboard/DashboardCircularCards";
import { DashboardProps } from "./types";
import {
  Container,
  InforTableWrapper,
} from "src/components/dashboard/styles/DashboardStyles";
import DashboardOrdersTable from "src/components/dashboard/DashboardOrdersTable";
import DashboardCustomersTable from "src/components/dashboard/DashboardCustomersTable";
import DashboardRecentProducts from "src/components/dashboard/RecentProducts";
import DashboardPopularProducts from "src/components/dashboard/PopularProducts";
import { useActions } from "src/hooks/useActions";
import useTitle from "src/hooks/useTitle";

const Dashboard = ({ menuSlideIn }: DashboardProps) => {
  useTitle("Admin | Dashboard");
  const {
    getRecentSales,
    getRecentOrders,
    getOrdersCount,
    getRecentCustomers,
    getPreOrders,
    getRecentlyAddedProducts,
    getDashboardPopularProducts,
  } = useActions();

  useEffect(() => {
    getRecentSales();
    getRecentOrders();
    getOrdersCount();
    getRecentCustomers();
    getPreOrders();
    getRecentlyAddedProducts(1);
    getDashboardPopularProducts(1);
  }, []);
  return (
    <Container container direction="column" menuSlideIn={menuSlideIn}>
      <DashboardRectangularCards menuSlideIn={menuSlideIn} />
      <DashboardCircularCards menuSlideIn={menuSlideIn} />
      <InforTableWrapper item container menuSlideIn={menuSlideIn}>
        <Grid item md>
          <DashboardOrdersTable />
        </Grid>
        <Grid item md>
          <DashboardCustomersTable />
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
