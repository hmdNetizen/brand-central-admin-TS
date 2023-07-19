import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { salespeopleListColumns } from "src/lib/dataset/tableData";
import CustomerItem from "src/components/customers/CustomerItem";
// import EditCustomerProfile from "./modals/EditCustomerProfile";
// import DeleteCustomer from "./modals/DeleteCustomer";
// import EmailCustomer from "./modals/EmailCustomer";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import { SelectChangeEvent } from "@mui/material";
import PageHeadingActions from "src/components/common/PageHeadingActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SalesPersonsPageLayoutProps } from "../types";
import {
  ContainerWrapper,
  Container,
} from "src/components/common/styles/PageContainerStyles";
import SalesPersonItem from "src/components/salespersons/SalesPersonItem";

const SalesPersonsPageLayout = (props: SalesPersonsPageLayoutProps) => {
  const {
    title,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    filterText,
    onChange,
    openEditSalesperson,
    setOpenEditSalesperson,
    openDeleteSalesperson,
    setOpenDeleteSalesperson,
    salesPersonsDataset,
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
  const totalCustomers = useTypedSelector(
    (state) => state.customers.totalCustomers
  );

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
            headerColumns={salespeopleListColumns}
            page={page}
            setPage={setPage}
            total={totalCustomers}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loadingCustomers}
            notFoundText="No Customer found"
          >
            {!loadingCustomers &&
              salesPersonsDataset.map((salesperson) => {
                return (
                  <SalesPersonItem
                    key={salesperson._id}
                    salesperson={salesperson}
                    setOpenDeleteSalesperson={setOpenDeleteSalesperson}
                    setOpenEditSalesperson={setOpenEditSalesperson}
                  />
                );
              })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      {/* <EditCustomerProfile
        openEditCustomer={openEditCustomer}
        setOpenEditCustomer={setOpenEditCustomer}
        customerProfileData={singleCustomer!}
      />
      <DeleteCustomer
        openDeleteCustomer={openDeleteCustomer}
        setOpenDeleteCustomer={setOpenDeleteCustomer}
      />
      <EmailCustomer open={openEmail} setOpen={setOpenEmail} />
      <CustomLoadingDialog
        loading={
          loadingCustomerAction !== undefined ? loadingCustomerAction : false
        }
        handleLoading={handleLoadingCustomerAction}
      /> */}
    </Container>
  );
};

export default SalesPersonsPageLayout;
