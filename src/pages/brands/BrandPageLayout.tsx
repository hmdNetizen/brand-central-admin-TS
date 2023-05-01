import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { brandsColumn } from "src/lib/dataset/tableData";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import BrandItem from "src/components/brands/BrandItem";
import AddBrand from "./modals/AddBrand";
import { PageLayoutProps } from "./types";
import debounce from "lodash.debounce";
import EditBrand from "./modals/EditBrand";
import DeleteBrand from "./modals/DeleteBrand";

const BrandPageLayout = (props: PageLayoutProps) => {
  const theme = useTheme();
  const {
    brands,
    filterText,
    page,
    rowsPerPage,
    setOpenAddBrand,
    setPage,
    setRowsPerPage,
    setFilterText,
    setOpenEditBrand,
    setOpenDeleteBrand,
    openAddBrand,
    openEditBrand,
    openDeleteBrand,
  } = props;
  const total = useTypedSelector((state) => state.brands.total);
  const loadingBrands = useTypedSelector((state) => state.brands.loadingBrands);

  const { getSearchedBrands } = useActions();

  const debounceFilteredBrands = useCallback(
    debounce(getSearchedBrands, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceFilteredBrands({
      page: page + 1,
      limit: rowsPerPage,
      searchTerm: event.target.value,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Brands
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingWithActionButton
          filterText={filterText}
          handleSearch={handleSearch}
          rowsPerPage={rowsPerPage}
          setOpen={setOpenAddBrand}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          buttonTitle="Add New Brand"
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={brandsColumn}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={total}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loadingBrands}
            notFoundText="No Brand Found"
          >
            {!loadingBrands &&
              brands.map((brand) => {
                return (
                  <BrandItem
                    key={brand._id}
                    brand={brand}
                    setOpenDeleteBrand={setOpenDeleteBrand}
                    setOpenEditBrand={setOpenEditBrand}
                  />
                );
              })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      <AddBrand openAddBrand={openAddBrand} setOpenAddBrand={setOpenAddBrand} />
      <EditBrand
        openEditBrand={openEditBrand}
        setOpenEditBrand={setOpenEditBrand}
      />
      <DeleteBrand
        openDeleteBrand={openDeleteBrand}
        setOpenDeleteBrand={setOpenDeleteBrand}
      />
    </Container>
  );
};

export default BrandPageLayout;
