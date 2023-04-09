import React from "react";
import CircularCardItem from "./CircularCardItem";
import { styled } from "@mui/material/styles";
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

const DashboardCircularCards = ({ menuSlideIn }: CircularCardProps) => {
  const { numberOfCustomersInThirtyDays, totalCustomers } = useTypedSelector(
    (state) => state.customers
  );
  const { lastThirtyDaysSale, totalSales } = useTypedSelector(
    (state) => state.orders
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
        numberCount={lastThirtyDaysSale}
        description="Last 30 days"
        cardBorderColor="#cf0633"
      />
      <CircularCardItem
        heading="Total Sales"
        numberCount={totalSales}
        description="All Time"
        cardBorderColor="#5a49e9"
      />
    </Container>
  );
};

export default DashboardCircularCards;
