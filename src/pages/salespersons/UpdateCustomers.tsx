import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme, styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { Container } from "src/components/common/styles/PageContainerStyles";
import { ErrorMsg, ErrorsList } from "src/utilityStyles/pagesUtilityStyles";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import SalespersonCustomerUploads from "src/components/salespersons/customers/SalespersonCustomerUploads";
import { useActions } from "src/hooks/useActions";

const ContentWrapper = styled(Grid)({
  minHeight: "80vh",
  background: "#fff",
  display: "flex",
  justifyContent: "center",
});

const UploadBoxWrapper = styled(Grid)(({ theme }) => ({
  padding: "2rem 5rem",

  [theme.breakpoints.only("xs")]: {
    padding: "2rem",
  },
}));

const UpdateCustomers = () => {
  const theme = useTheme();
  const error = useTypedSelector((state) => state.salespersonCustomers.error);
  const loadingCustomerAction = useTypedSelector(
    (state) => state.salespersonCustomers.loadingSalespersonCustomerAction
  );

  const { getAllSalespersons, getSalespeopleCustomers } = useActions();

  useEffect(() => {
    getAllSalespersons({
      isActive: true,
      limit: 50,
      page: 1,
    });

    getSalespeopleCustomers({
      limit: 1000,
      page: 1,
    });
  }, []);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Update Sales Rep's Customers
        </Typography>
      </Grid>
      <ContentWrapper item container alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h4" align="center" gutterBottom>
            Attach document below
          </Typography>
          <Typography variant="body2" align="center" color="dimgrey">
            Note: Only Excel spreadsheet file is allowed
          </Typography>
        </Grid>
        {!loadingCustomerAction && error && (
          <Grid item>
            <ErrorsList
              item
              container
              component="ul"
              justifyContent="center"
              alignItems="center"
              columnGap={1}
            >
              <ErrorOutlineIcon color="error" />
              <ErrorMsg variant="body2" color="error" component="li">
                {error}
              </ErrorMsg>
            </ErrorsList>
          </Grid>
        )}
        <UploadBoxWrapper item container>
          <SalespersonCustomerUploads />
        </UploadBoxWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default UpdateCustomers;
