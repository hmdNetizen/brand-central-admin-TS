import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { salespeopleListColumns } from "src/lib/dataset/tableData";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SalesPersonsPageLayoutProps } from "../types";
import {
  ContainerWrapper,
  Container,
} from "src/components/common/styles/PageContainerStyles";
import SalesPersonItem from "src/components/salespersons/SalesPersonItem";
import CreateSalesperson from "../modals/CreateSalesperson";
import EditSalesperson from "../modals/EditSalesperson";
import DeleteSalesperson from "../modals/DeleteSalesperson";

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
    setOpenAddSalesperson,
    openAddSalesperson,
  } = props;
  const theme = useTheme();

  const loadingSalespersons = useTypedSelector(
    (state) => state.salesPersons.loadingSalespersons
  );

  const loadingActivation = useTypedSelector(
    (state) => state.salesPersons.loadingActivation
  );
  const totalSalespersons = useTypedSelector(
    (state) => state.salesPersons.totalSalespersons
  );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLoadingSalespersonActivation = () => {
    return !loadingActivation;
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
          setOpen={setOpenAddSalesperson}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          isDeactivatedPage={false}
          placeholderText="Search..."
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={salespeopleListColumns}
            page={page}
            setPage={setPage}
            total={totalSalespersons}
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
      <CreateSalesperson
        openAddSalesperson={openAddSalesperson}
        setOpenAddSalesperson={setOpenAddSalesperson}
      />
      <EditSalesperson
        openEditSalesperson={openEditSalesperson}
        setOpenEditSalesperson={setOpenEditSalesperson}
      />
      <DeleteSalesperson
        openDeleteSalesperson={openDeleteSalesperson}
        setOpenDeleteSalesperson={setOpenDeleteSalesperson}
      />
      <CustomLoadingDialog
        loading={loadingActivation !== undefined ? loadingActivation : false}
        handleLoading={handleLoadingSalespersonActivation}
      />
    </Container>
  );
};

export default SalesPersonsPageLayout;
