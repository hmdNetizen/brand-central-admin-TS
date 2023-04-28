import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { brandCategoryColumns } from "src/lib/dataset/tableData";
import TableRow from "@mui/material/TableRow";
import AddBrandCategory from "./modals/AddBrandCategory";
//   import EditBrandCategory from "./modals/EditBrandCategory";
//   import DeleteBrandCategory from "./modals/DeleteBrandCategory";
import CustomSwitch from "src/utils/CustomSwitch";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import debounce from "lodash.debounce";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import BrandsCategoryItem from "src/components/brands-categories/BrandsCategoryItem";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";

const BrandsCategory = () => {
  useTitle("Admin : List of all Brands categories");
  const theme = useTheme();

  const loading = useTypedSelector((state) => state.categories.loading);
  const loadingActivation = useTypedSelector(
    (state) => state.categories.loadingActivation
  );
  const brandCategories = useTypedSelector(
    (state) => state.categories.brandCategories
  );
  const total = useTypedSelector((state) => state.categories.total);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openAddBrandCategory, setOpenAddBrandCategory] = useState(false);
  const [openEditBrandCategory, setOpenEditBrandCategory] = useState(false);
  const [openDeleteBrandCategory, setOpenDeleteBrandCategory] = useState(false);
  // const [filteredBrandCategory, setFilterBrandCategory] =
  //   useState(brandCategories);

  const {
    getAllSubcategories,
    getAllCategories,
    getAllBrandsCategories,
    getSearchedBrandsCategories,
  } = useActions();

  const debounceFilteredBrandCategory = useCallback(
    debounce(getSearchedBrandsCategories, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceFilteredBrandCategory({
      limit: rowsPerPage,
      page: page + 1,
      searchTerm: event.target.value,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBrandCategoryAction = () => {
    return !loadingActivation;
  };

  useEffect(() => {
    getAllSubcategories();
    getAllCategories();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!filterText) {
      getAllBrandsCategories({
        limit: rowsPerPage,
        page: page + 1,
      });
    } else {
      getSearchedBrandsCategories({
        limit: rowsPerPage,
        page: page + 1,
        searchTerm: filterText,
      });
    }
  }, [rowsPerPage, page]);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Subcategories Brands
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingWithActionButton
          filterText={filterText}
          handleSearch={handleSearch}
          rowsPerPage={rowsPerPage}
          setOpen={setOpenAddBrandCategory}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={brandCategoryColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={total}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
            notFoundText="No Brand Category Found"
          >
            {!loading &&
              brandCategories.map((brandCategory) => {
                return (
                  <BrandsCategoryItem
                    key={brandCategory._id}
                    brandCategory={brandCategory}
                    setOpenEditBrandCategory={setOpenEditBrandCategory}
                    setOpenDeleteBrandCategory={setOpenDeleteBrandCategory}
                  />
                );
              })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      <AddBrandCategory
        openAddBrandCategory={openAddBrandCategory}
        setOpenAddBrandCategory={setOpenAddBrandCategory}
      />
      {/* <EditBrandCategory
        openEditBrandCategory={openEditBrandCategory}
        setOpenEditBrandCategory={setOpenEditBrandCategory}
      /> */}
      {/* <DeleteBrandCategory
        setOpenDeleteBrandCategory={setOpenDeleteBrandCategory}
        openDeleteBrandCategory={openDeleteBrandCategory}
      /> */}
      <CustomLoadingDialog
        loading={loadingActivation}
        handleLoading={handleBrandCategoryAction}
      />
    </Container>
  );
};

export default BrandsCategory;
