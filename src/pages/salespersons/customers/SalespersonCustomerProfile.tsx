import React, { Fragment, useEffect } from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";

import { Container } from "src/components/common/styles/PageContainerStyles";
import PreviousButton from "src/utils/PreviousButton";
import Spinner from "src/utils/Spinner";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import SalespersonCustomerDetailsTable from "src/components/salespersons/customers/SalespersonCustomerDetailsTable";
import { getSingleSalespersonCustomers } from "src/services/salespersons/customers";
import SaleespersonCustomerOrderDetailsTable from "src/components/salespersons/customers/orders/SalespersonCustomerOrderDetailsTable";

export const DetailsWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "menuSlideIn",
})<GridProps & { menuSlideIn: boolean }>(({ theme, menuSlideIn }) => ({
  background: "#fff",
  padding: "5rem 2rem 5rem 2rem",
  marginBottom: "5rem",

  [theme.breakpoints.only("md")]: {
    flexDirection: menuSlideIn ? "row" : "column",
    paddingLeft: menuSlideIn ? 0 : "2rem",
    paddingTop: menuSlideIn ? "5rem" : "3rem",
  },

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: "2rem 2rem 5rem",
  },

  [theme.breakpoints.only("xs")]: {
    padding: "2rem 1.5rem 5rem",
  },
}));

type SalespersonCustomerProfileProps = {
  menuSlideIn: boolean;
};

const SalespersonCustomerProfile = ({
  menuSlideIn,
}: SalespersonCustomerProfileProps) => {
  const theme = useTheme();

  const loadingSingleSalespersonCustomer = useTypedSelector(
    (state) => state.salespersonCustomers.loadingSingleSalespersonCustomer
  );
  const error = useTypedSelector((state) => state.salespersonCustomers.error);
  const singleSalespersonCustomer = useTypedSelector(
    (state) => state.salespersonCustomers.singleSalespersonCustomer
  );
  const salespersonCustomerOrders = useTypedSelector(
    (state) => state.salespersonCustomers.salespersonCustomerOrders
  );
  const loadingCustomerOrders = useTypedSelector(
    (state) => state.salespersonCustomers.loadingCustomerOrders
  );
  const totalCustomerOrders = useTypedSelector(
    (state) => state.salespersonCustomers.totalCustomerOrders
  );

  const { getSalespersonCustomerProfile } = useActions();

  const { customerId } = useParams();

  useEffect(() => {
    if (customerId) {
      getSalespersonCustomerProfile(customerId);
    }
  }, [customerId]);

  return (
    <Container container direction="column">
      <Grid item container alignItems="center" columnSpacing={1}>
        <Grid item>
          <PreviousButton path="/dashboard/salespeople/customers" />
        </Grid>
        <Grid item>
          <Typography variant="h2">Sales Rep's Customer Details</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        columnGap={0.5}
        style={{ paddingBottom: "1rem" }}
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
          to="/dashboard/salespeople/customers"
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.dark,
          }}
        >
          <Typography variant="body2">Customers</Typography>
        </Grid>
        <KeyboardDoubleArrowRightSharpIcon color="secondary" />
        <Grid
          item
          component={Link}
          to={`/dashboard/salespeople/customers/${customerId}`}
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.dark,
          }}
        >
          <Typography variant="body2">Details</Typography>
        </Grid>
      </Grid>
      {loadingSingleSalespersonCustomer ? (
        <Spinner loaderHeight="60vh" />
      ) : !loadingSingleSalespersonCustomer && singleSalespersonCustomer ? (
        <Fragment>
          <DetailsWrapper item container menuSlideIn={menuSlideIn}>
            <Grid item container>
              <Grid container>
                <Grid item container style={{ overflowX: "auto" }}>
                  <SalespersonCustomerDetailsTable
                    singleSalespersonCustomer={singleSalespersonCustomer}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DetailsWrapper>
          <Grid
            item
            container
            direction="column"
            rowSpacing={2}
            style={{ marginTop: "1rem" }}
          >
            <Grid item>
              <Typography variant="h3" style={{ fontSize: "2.25rem" }}>
                Orders Placed
              </Typography>
            </Grid>
            <Grid item container>
              <SaleespersonCustomerOrderDetailsTable
                customerId={customerId}
                salespersonCustomerOrders={salespersonCustomerOrders}
                loading={loadingCustomerOrders}
                total={totalCustomerOrders}
              />
            </Grid>
          </Grid>
        </Fragment>
      ) : (
        <Grid
          item
          container
          sx={{ minHeight: "85vh", background: "#fff", borderRadius: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">{error}</Typography>
        </Grid>
      )}
    </Container>
  );
};

export default SalespersonCustomerProfile;
