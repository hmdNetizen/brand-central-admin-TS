import React, { Fragment, useEffect } from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useParams } from "react-router-dom";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useTheme, styled } from "@mui/material/styles";

import { Container } from "./utils/styles";
import PreviousButton from "src/utils/PreviousButton";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import Spinner from "src/utils/Spinner";
import placeholderAvatar from "src/assets/images/placeholder-avatar.png";
import CustomIconButton from "src/utils/CustomIconButton";
import SalespersonDetailsTable from "src/components/salespersons/SalespersonDetailsTable";
import SalespersonOrdersTable from "src/components/salespersons/orders/SalespersonOrdersTable";

export const DetailsWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "menuSlideIn",
})<GridProps & { menuSlideIn: boolean }>(({ theme, menuSlideIn }) => ({
  background: "#fff",
  padding: "5rem 2rem 5rem 0",
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

const SalespersonProfileDetails = ({
  menuSlideIn,
}: {
  menuSlideIn: boolean;
}) => {
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const loadingSingleSalesperson = useTypedSelector(
    (state) => state.salesPersons.loadingSingleSalesperson
  );
  const singleSalesperson = useTypedSelector(
    (state) => state.salesPersons.singleSalesperson
  );
  const loadingOrders = useTypedSelector(
    (state) => state.salespersonOrders.loadingOrders
  );
  const salespersonOrders = useTypedSelector(
    (state) => state.salespersonOrders.salespersonOrders
  );
  const totalOrders = useTypedSelector(
    (state) => state.salespersonOrders.totalOrders
  );

  const { getSalespersonProfile, getSingleSalespersonOrders } = useActions();

  const { salespersonId } = useParams();

  const handleEditSalesperson = () => {
    console.log("Hello");
  };

  useEffect(() => {
    getSalespersonProfile(salespersonId!);
  }, [salespersonId]);

  return (
    <Container container direction="column">
      <Grid item container alignItems="center" columnSpacing={1}>
        <Grid item>
          <PreviousButton path="/dashboard/salespersons" />
        </Grid>
        <Grid item>
          <Typography variant="h2">Customer Details</Typography>
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
          <Typography variant="body2">Salespersons</Typography>
        </Grid>
        <KeyboardDoubleArrowRightSharpIcon color="secondary" />
        <Grid
          item
          component={Link}
          to={`/dashboard/salespersons/${salespersonId}`}
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.dark,
          }}
        >
          <Typography variant="body2">Details</Typography>
        </Grid>
      </Grid>
      {loadingSingleSalesperson ? (
        <Spinner loaderHeight="60vh" />
      ) : !loadingSingleSalesperson && singleSalesperson ? (
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
                  <img
                    src={
                      singleSalesperson?.profileImage
                        ? singleSalesperson.profileImage
                        : placeholderAvatar
                    }
                    alt={`${singleSalesperson?.fullName}'s avatar`}
                    width={200}
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
                    <CustomIconButton
                      startIcon={<EditSharpIcon />}
                      background={theme.palette.success}
                      title="Edit"
                      style={{ minWidth: 80 }}
                      onClick={handleEditSalesperson}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container={matchesSM} style={{ flex: 3 }}>
              <Grid container>
                <Grid item container style={{ overflowX: "auto" }}>
                  <SalespersonDetailsTable
                    singleSalesperson={singleSalesperson}
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
            style={{ marginTop: "2rem" }}
          >
            <Grid item>
              <Typography variant="h3">Orders Placed</Typography>
            </Grid>
            <Grid item container>
              <SalespersonOrdersTable
                salespersonOrders={salespersonOrders}
                loading={loadingOrders}
                total={totalOrders}
                salespersonId={salespersonId}
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
    </Container>
  );
};

export default SalespersonProfileDetails;
