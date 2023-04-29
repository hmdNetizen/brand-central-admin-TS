import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tables from "components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { brandsColumn } from "src/lib/dataset/tableData";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";

//   import AddBrand from "./modals/AddBrand";
//   import EditBrand from "./modals/EditBrand";
//   import DeleteBrand from "./modals/DeleteBrand";
import debounce from "lodash.debounce";
import useTitle from "src/hooks/useTitle";
import BrandItem from "src/components/brands/BrandItem";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";

const Brands = () => {
  useTitle("Admin : List of all brands");
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openAddBrand, setOpenAddBrand] = useState(false);
  const [openEditBrand, setOpenEditBrand] = useState(false);
  const [openDeleteBrand, setOpenDeleteBrand] = useState(false);

  const loadingBrands = useTypedSelector((state) => state.brands.loadingBrands);
  const brands = useTypedSelector((state) => state.brands.brands);
  const total = useTypedSelector((state) => state.brands.total);

  const { getAllBrands } = useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   eslint-disable-next-line
  // const debounceFilteredBrands = useCallback(
  //   debounce(handleFilteredBrandsData, 500),
  //   []
  // );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);

    //   debounceFilteredBrands({
    //     brandData: brands,
    //     text: event.target.value,
    //   });

    setPage(0);
  };

  useEffect(() => {
    getAllBrands();
  }, []);

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

export default Brands;
