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
import { BrandReturnedPayload } from "src/services/brands/BrandTypes";
import BrandItem from "src/components/brands/BrandItem";

type PageLayoutProps = {
  filterText: string;
  rowsPerPage: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  brands: BrandReturnedPayload[];
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  setOpenDeleteBrand: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEditBrand: React.Dispatch<React.SetStateAction<boolean>>;
};

const BrandPageLayout = (props: PageLayoutProps) => {
  const theme = useTheme();
  const {
    brands,
    filterText,
    page,
    rowsPerPage,
    setOpen,
    setPage,
    setRowsPerPage,
    setFilterText,
    setOpenEditBrand,
    setOpenDeleteBrand,
  } = props;
  const total = useTypedSelector((state) => state.brands.total);
  const loadingBrands = useTypedSelector((state) => state.brands.loadingBrands);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);

    //   debounceFilteredBrands({
    //     brandData: brands,
    //     text: event.target.value,
    //   });

    setPage(0);
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
          setOpen={setOpen}
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
                    brand={brand}
                    setOpenDeleteBrand={setOpenDeleteBrand}
                    setOpenEditBrand={setOpenEditBrand}
                  />
                );
              })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      {/* <AddBrand openAddBrand={openAddBrand} setOpenAddBrand={setOpenAddBrand} /> */}
      {/* <EditBrand
          openEditBrand={openEditBrand}
          setOpenEditBrand={setOpenEditBrand}
        /> */}
      {/* <DeleteBrand
          openDeleteBrand={openDeleteBrand}
          setOpenDeleteBrand={setOpenDeleteBrand}
        /> */}
    </Container>
  );
};

export default BrandPageLayout;
