import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Tables from "components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { customersListColumns } from "src/lib/dataset/tableData";
import CustomerItem from "src/components/customers/CustomerItem";
import EditCustomerProfile from "./modals/EditCustomerProfile";
import DeleteCustomer from "./modals/DeleteCustomer";
import EmailCustomer from "./modals/EmailCustomer";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import { SelectChangeEvent } from "@mui/material";
import PageHeadingActions from "src/components/common/PageHeadingActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { CustomerPageLayoutProps } from "./types";

const Container = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem 5rem 2rem",

  [theme.breakpoints.only("xs")]: {
    padding: "5rem 1rem 5rem 1rem",
  },
}));

const ContainerWrapper = styled(Grid)(({ theme }) => ({
  background: "#fff",
  padding: "2rem 3rem",
  borderRadius: 5,

  [theme.breakpoints.only("xs")]: {
    padding: "2rem 1rem",
  },
}));

const CustomerPageLayout = (props: CustomerPageLayoutProps) => {
  const {
    title,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    filterText,
    onChange,
    openEditCustomer,
    setOpenEditCustomer,
    openDeleteCustomer,
    setOpenDeleteCustomer,
    openEmail,
    setOpenEmail,
    customerDataset,
  } = props;
  const theme = useTheme();

  const loadingCustomers = useTypedSelector(
    (state) => state.customers.loadingCustomers
  );
  const loadingCustomerAction = useTypedSelector(
    (state) => state.customers.loadingCustomerAction
  );
  const singleCustomer = useTypedSelector(
    (state) => state.customers.singleCustomer
  );

  const { setCurrentCustomer, handleToggleCustomerBlock, unblockCustomer } =
    useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectRowsPerPage = (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ): void => {
    const selectEvent = event as SelectChangeEvent<HTMLInputElement>;
    setRowsPerPage(+selectEvent.target.value);
    setPage(0);
  };

  const handleLoadingCustomerAction = () => {
    return !loadingCustomerAction;
  };

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          {title}
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingActions
          filterText={filterText}
          onChange={onChange}
          rowsPerPage={rowsPerPage.toString()}
          handleSelectRowsPerPage={handleSelectRowsPerPage}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={customersListColumns}
            page={page}
            setPage={setPage}
            total={customerDataset.length}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loadingCustomers}
            notFoundText="No Customer found"
          >
            {!loadingCustomers &&
              customerDataset.map((customer) => {
                return (
                  <CustomerItem
                    key={customer._id}
                    customer={customer}
                    setOpenDeleteCustomer={setOpenDeleteCustomer}
                    setOpenEditCustomer={setOpenEditCustomer}
                    setOpenEmail={setOpenEmail}
                  />
                );
              })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      {/* <EditCustomerProfile
        openEditCustomer={openEditCustomer}
        setOpenEditCustomer={setOpenEditCustomer}
        customerProfileData={singleCustomer}
      /> */}
      {/* <DeleteCustomer
        openDeleteCustomer={openDeleteCustomer}
        setOpenDeleteCustomer={setOpenDeleteCustomer}
      /> */}
      {/* <EmailCustomer open={openEmail} setOpen={setOpenEmail} /> */}
      {/* <CustomLoadingDialog
        loading={
          loadingCustomerAction !== undefined ? loadingCustomerAction : false
        }
        handleLoading={handleLoadingCustomerAction}
      /> */}
    </Container>
  );
};

export default CustomerPageLayout;
