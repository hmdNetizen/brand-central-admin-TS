import React, { useState } from "react";
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
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";
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

  const [OpenCreateSalesperson, setOpenCreateSalesperson] = useState(false);

  const loadingSalespersons = useTypedSelector(
    (state) => state.salesPersons.loadingSalespersons
  );

  const loadingCustomerAction = useTypedSelector(
    (state) => state.customers.loadingCustomerAction
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
        <PageHeadingWithActionButton
          filterText={filterText}
          handleSearch={onChange}
          rowsPerPage={rowsPerPage}
          buttonTitle="Create a Salesperson"
          setOpen={setOpenCreateSalesperson}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          isDeactivatedPage={false}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={salespeopleListColumns}
            page={page}
            setPage={setPage}
            total={salesPersonsDataset.length}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loadingSalespersons}
            notFoundText="No Salesperson found"
          >
            {!loadingSalespersons &&
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
