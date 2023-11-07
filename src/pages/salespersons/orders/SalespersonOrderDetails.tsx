import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import { Link, useParams } from "react-router-dom";

import { Container } from "src/components/common/styles/PageContainerStyles";
import PreviousButton from "src/utils/PreviousButton";
import { useActions } from "src/hooks/useActions";
import Spinner from "src/utils/Spinner";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import SalespersonOrderDetailsCard from "src/components/salespersons/orders/SalespersonOrderDetailsCard";
import OrderedProductsList from "src/components/orders/OrderedProductsList";
import SalespersonShippingDetailsCard from "src/components/salespersons/orders/ShippingDetailsCard";
import SalespersonBillingDetailsCard from "src/components/salespersons/orders/BillingDetailsCard";

const CardsContainer = styled(Grid)(({ theme }) => ({
  background: "#fff",
  padding: "2rem",
  borderRadius: 5,

  [theme.breakpoints.only("xs")]: {
    padding: "2rem 1rem",
  },
}));

type SalespersonOrderDetailsProps = {
  menuSlideIn: boolean;
};

const SalespersonOrderDetails = ({
  menuSlideIn,
}: SalespersonOrderDetailsProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const { orderId } = useParams();

  const loadingSingleOrder = useTypedSelector(
    (state) => state.salespersonOrders.loadingSingleOrder
  );
  const singleOrder = useTypedSelector(
    (state) => state.salespersonOrders.singleOrder
  );

  const { getSalespersonSingleOrder } = useActions();

  useEffect(() => {
    if (orderId) {
      getSalespersonSingleOrder(orderId);
    }
  }, [orderId]);

  return (
    <Container container direction="column">
      <Grid item container alignItems="center" columnSpacing={1}>
        <Grid item>
          <PreviousButton path="/dashboard/salespeople/orders" />
        </Grid>
        <Grid item>
          <Typography variant="h2">Order Details</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        columnGap={0.5}
        style={{ paddingBottom: "2rem" }}
      >
        <Grid
          item
          component={Link}
          to="/dashboard/salespeople"
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.dark,
          }}
        >
          <Typography variant="body2">Salespeople</Typography>
        </Grid>
        <KeyboardDoubleArrowRightSharpIcon color="secondary" />
        <Grid
          item
          component={Link}
          to="/dashboard/salespeople/orders"
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.dark,
          }}
        >
          <Typography variant="body2">Orders</Typography>
        </Grid>
        <KeyboardDoubleArrowRightSharpIcon color="secondary" />
        <Grid
          item
          component={Link}
          to={`/dashboard/salespeople/orders/${orderId}`}
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.dark,
          }}
        >
          <Typography variant="body2">Details</Typography>
        </Grid>
      </Grid>
      {loadingSingleOrder ? (
        <Grid item container style={{ height: "100vh" }}>
          <Spinner loaderHeight="100%" />
        </Grid>
      ) : !loadingSingleOrder && singleOrder ? (
        <CardsContainer item container direction="column">
          <Grid
            item
            container
            spacing={3}
            style={{ marginBottom: matchesSM ? 0 : "3rem" }}
            //   direction={matchesSM ? "column" : "row"}
          >
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg={6}>
              <SalespersonOrderDetailsCard singleOrder={singleOrder} />
            </Grid>
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg>
              <Grid container direction="column">
                <Grid item>
                  <SalespersonShippingDetailsCard singleOrder={singleOrder} />
                </Grid>
                <Grid item>
                  <SalespersonBillingDetailsCard singleOrder={singleOrder} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container spacing={3} sx={{ pt: 3 }}>
            {/* <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg={6}>
              <ShippingDetailsCard singleOrder={singleOrder} />
            </Grid> */}
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg={6}></Grid>
          </Grid>
          <Grid item container>
            {/* <OrderedProductsList
              loading={loadingSingleOrder}
              singleOrder={singleOrder}
            /> */}
          </Grid>
        </CardsContainer>
      ) : (
        <Grid
          item
          container
          sx={{ minHeight: "70vh", background: "#fff" }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2">No Order found</Typography>
        </Grid>
      )}
    </Container>
  );
};

export default SalespersonOrderDetails;
