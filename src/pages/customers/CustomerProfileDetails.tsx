import React, { useEffect, useState, Fragment } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import PreviousButton from "src/utils/PreviousButton";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { Link, useParams } from "react-router-dom";
import avatarPlaceholder from "src/assets/images/placeholder-avatar.png";
import CustomerDetailsTable from "src/components/customers/CustomerDetailsTable";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import useMediaQuery from "@mui/material/useMediaQuery";
import Spinner from "src/utils/Spinner";
import CustomerOrdersTable from "src/components/customers/CustomerOrdersTable";
import EmailCustomer from "./modals/EmailCustomer";
import CustomIconButton from "src/utils/CustomIconButton";
import EditCustomerProfile from "./modals/EditCustomerProfile";
import { capitalizeFirstLetters } from "src/lib/helpers";
import useTitle from "src/hooks/useTitle";
import {
  Container,
  DetailsWrapper,
  Avatar,
  MessageButton,
  PageHeading,
} from "./styles/CustomerProfileDetailsStyles";

const CustomerProfileDetails = ({ menuSlideIn }: { menuSlideIn: boolean }) => {
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const [openEmailCustomer, setOpenEmailCustomer] = useState(false);
  const [openEditCustomer, setOpenEditCustomer] = useState(false);

  const loadingSingleCustomer = useTypedSelector(
    (state) => state.customers.loadingSingleCustomer
  );
  const singleCustomer = useTypedSelector(
    (state) => state.customers.singleCustomer
  );

  const loadingCustomerOrders = useTypedSelector(
    (state) => state.customers.loadingCustomerOrders
  );
  const customerOrders = useTypedSelector(
    (state) => state.customers.customerOrders
  );

  useTitle(
    `Admin : Customers | ${
      singleCustomer?.companyName
        ? capitalizeFirstLetters(singleCustomer.companyName)
        : "Customers"
    }`
  );

  const { getSingleCustomer, getCustomerOrders } = useActions();

  const { customerId } = useParams();

  const handleEditCustomer = () => {
    setOpenEditCustomer(true);
  };

  useEffect(() => {
    getSingleCustomer(customerId!);
    getCustomerOrders(customerId!);
    // eslint-disable-next-line
  }, [customerId]);

  return (
    <Container container direction="column">
      <Grid item container alignItems="center" columnSpacing={1}>
        <Grid item>
          <PreviousButton path="customers" />
        </Grid>
        <Grid item>
          <PageHeading variant="h2">Customer Details</PageHeading>
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
          to="/dashboard/customers"
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
          to={`/dashboard/customers/${customerId}`}
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.dark,
          }}
        >
          <Typography variant="body2">Details</Typography>
        </Grid>
      </Grid>
      {loadingSingleCustomer ? (
        <Spinner loaderHeight="60vh" />
      ) : !loadingSingleCustomer && singleCustomer ? (
        <Fragment>
          <DetailsWrapper item container menuSlideIn={menuSlideIn}>
            <Grid
              item
              style={{
                flex: 1,
                marginBottom: matchesSM
                  ? "2rem"
                  : matchesMD && !menuSlideIn
                  ? "2rem"
                  : 0,
              }}
            >
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Avatar
                    src={
                      singleCustomer?.profileImage
                        ? singleCustomer.profileImage
                        : avatarPlaceholder
                    }
                    alt={`${singleCustomer?.companyName}'s avatar`}
                  />
                </Grid>
                <Grid
                  item
                  container
                  columnGap={1}
                  px={1}
                  justifyContent="center"
                  rowGap={1}
                >
                  <Grid item>
                    <MessageButton
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpenEmailCustomer(true)}
                    >
                      Send Message
                    </MessageButton>
                  </Grid>
                  <Grid item>
                    <CustomIconButton
                      startIcon={<EditSharpIcon />}
                      background={theme.palette.success}
                      title="Edit"
                      style={{ minWidth: 80 }}
                      onClick={() => handleEditCustomer()}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container={matchesSM} style={{ flex: 3 }}>
              <Grid container>
                <Grid item container style={{ overflowX: "auto" }}>
                  <CustomerDetailsTable singleCustomer={singleCustomer} />
                </Grid>
              </Grid>
            </Grid>
          </DetailsWrapper>
          <Grid
            item
            container
            direction="column"
            rowSpacing={2}
            style={{ marginTop: "2rem" }}
          >
            <Grid item>
              <Typography variant="h3">Product Ordered</Typography>
            </Grid>
            <Grid item container>
              <CustomerOrdersTable
                customerOrders={customerOrders}
                loading={loadingCustomerOrders}
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
          <Typography variant="h2">Customer Not Found</Typography>
        </Grid>
      )}

      <EmailCustomer open={openEmailCustomer} setOpen={setOpenEmailCustomer} />
      <EditCustomerProfile
        openEditCustomer={openEditCustomer}
        setOpenEditCustomer={setOpenEditCustomer}
        customerProfileData={singleCustomer!}
      />
    </Container>
  );
};

export default CustomerProfileDetails;
