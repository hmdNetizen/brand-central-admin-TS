import React, { useLayoutEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import PreviousButton from "src/utils/PreviousButton";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import { Link, useParams } from "react-router-dom";
import OrderDetailsCard from "src/components/orders/OrderDetailsCard";
import BillingDetailsCard from "components/orders/BillingDetailsCard";
import ShippingDetailsCard from "components/orders/ShippingDetailsCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProductOrderedList from "components/orders/ProductOrderedList";
import { useActions } from "src/hooks/useActions";
import { useSelector } from "react-redux";
import Spinner from "src/utils/Spinner";
import useTitle from "src/hooks/useTitle";

const useStyles = makeStyles((theme) => ({
  container: {
    "&.MuiGrid-root": {
      padding: "1rem 2rem 5rem 2rem",

      [theme.breakpoints.only("xs")]: {
        padding: "5rem 1rem 5rem 1rem",
      },
    },
  },
  cardsContainer: {
    background: "#fff",
    padding: "2rem",
    borderRadius: 5,

    [theme.breakpoints.only("xs")]: {
      padding: "2rem 1rem",
    },
  },
}));

const OrderDetails = ({ menuSlideIn }) => {
  useTitle("Admin : Orders | Order details");
  const classes = useStyles();
  const theme = useTheme();

  const { orderId } = useParams();

  // const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const { loadingSingleOrder, singleOrder } = useSelector(
    (state) => state.orders
  );
  const { getSingleOrder } = useActions();

  useLayoutEffect(() => {
    getSingleOrder(orderId);

    // eslint-disable-next-line
  }, [orderId]);

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item container alignItems="center" columnSpacing={1}>
        <Grid item>
          <PreviousButton path="orders" />
        </Grid>
        <Grid item>
          <Typography variant="h2" className={classes.pageHeading}>
            Order Details
          </Typography>
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
          to="orders"
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
          to={`orders/${orderId}`}
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
        <Grid
          item
          container
          direction="column"
          className={classes.cardsContainer}
        >
          <Grid
            item
            container
            spacing={3}
            style={{ marginBottom: matchesSM ? 0 : "3rem" }}
            //   direction={matchesSM ? "column" : "row"}
          >
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg={6}>
              <OrderDetailsCard />
            </Grid>
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg>
              <BillingDetailsCard />
            </Grid>
          </Grid>

          <Grid item container spacing={3} sx={{ pt: 3 }}>
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg={6}>
              <ShippingDetailsCard />
            </Grid>
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg={6}></Grid>
          </Grid>
          <Grid item container>
            <ProductOrderedList />
          </Grid>
        </Grid>
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
    </Grid>
  );
};

export default OrderDetails;
