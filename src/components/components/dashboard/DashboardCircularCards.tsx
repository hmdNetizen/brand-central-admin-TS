import React from "react";
import CircularCardItem from "./CircularCardItem";
import { styled } from "@mui/material/styles";
import { lastThirtyDaysCustomers } from "src/lib/helpers";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type CircularCardProps = {
  menuSlideIn: boolean;
};

const Container = styled("div")<CircularCardProps>(
  ({ theme, menuSlideIn }) => ({
    padding: "5rem 0",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "2rem",

    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },

    [theme.breakpoints.only("sm")]: {
      gridTemplateColumns: menuSlideIn ? "repeat(2, 1fr)" : "1fr",
    },

    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "1fr",
    },
  })
);

const completedOrders = [];

const DashboardCircularCards = () => {
  const { numberOfCustomersInThirtyDays, totalCustomers } = useTypedSelector(
    (state) => state.customers
  );
  return (
    <Container menuSlideIn={menuSlideIn}>
      <CircularCardItem
        heading="New Customers"
        numberCount={numberOfCustomersInThirtyDays}
        description="Last 30 days"
        cardBorderColor="#0fa49b"
      />
      <CircularCardItem
        heading="Total Customers"
        numberCount={totalCustomers}
        description="All Time"
        cardBorderColor="#129021"
      />
      <CircularCardItem
        heading="Recent Sales"
        numberCount={
          completedOrders?.length > 0 ? lastThirtyDaysSales(completedOrders) : 0
        }
        description="Last 30 days"
        cardBorderColor="#cf0633"
      />
      <CircularCardItem
        heading="Total Sales"
        numberCount={completedOrders?.length}
        description="All Time"
        cardBorderColor="#5a49e9"
      />
    </Container>
  );
};

export default DashboardCircularCards;
