import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import PreviousButton from "src/utils/PreviousButton";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import { Link, useParams } from "react-router-dom";
import OrderDetailsCard from "src/components/orders/OrderDetailsCard";
import BillingDetailsCard from "src/components/orders/BillingDetailsCard";
import ShippingDetailsCard from "src/components/orders/ShippingDetailsCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import OrderedProductsList from "src/components/orders/OrderedProductsList";
import { useActions } from "src/hooks/useActions";
import Spinner from "src/utils/Spinner";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Container = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem 5rem 2rem",

  [theme.breakpoints.only("xs")]: {
    padding: "5rem 1rem 5rem 1rem",
  },
}));

const CardsContainer = styled(Grid)(({ theme }) => ({
  background: "#fff",
  padding: "2rem",
  borderRadius: 5,

  [theme.breakpoints.only("xs")]: {
    padding: "2rem 1rem",
  },
}));

const OrderDetails = ({ menuSlideIn }: { menuSlideIn: boolean }) => {
  useTitle("Admin : Orders | Order details");
  const theme = useTheme();

  const { orderId } = useParams();

  // const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const loadingSingleOrder = useTypedSelector(
    (state) => state.orders.loadingSingleOrder
  );
  const singleOrder = useTypedSelector((state) => state.orders.singleOrder);

  const { getSingleOrder } = useActions();

  useEffect(() => {
    if (orderId) {
      getSingleOrder(orderId);
    }
  }, [orderId]);

  return (
    <Container container direction="column">
      <Grid item container alignItems="center" columnSpacing={1}>
        <Grid item>
          <PreviousButton path="orders" />
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
        <CardsContainer item container direction="column">
          <Grid
            item
            container
            spacing={3}
            style={{ marginBottom: matchesSM ? 0 : "3rem" }}
            //   direction={matchesSM ? "column" : "row"}
          >
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg={6}>
              <OrderDetailsCard singleOrder={singleOrder} />
            </Grid>
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg>
              <BillingDetailsCard singleOrder={singleOrder} />
            </Grid>
          </Grid>

          <Grid item container spacing={3} sx={{ pt: 3 }}>
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg={6}>
              <ShippingDetailsCard singleOrder={singleOrder} />
            </Grid>
            <Grid item xs={12} md={!menuSlideIn ? 12 : 6} lg={6}></Grid>
          </Grid>
          <Grid item container>
            <OrderedProductsList
              loading={loadingSingleOrder}
              singleOrder={singleOrder}
            />
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

export default OrderDetails;
