import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { subCategoryColumns } from "src/lib/dataset/tableData";

// import EditSubCategory from "./modals/EditSubCategory";
// import DeleteSubCategory from "./modals/DeleteSubCategory";
// import AddSubCategory from "./modals/AddSubCategory";

import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import debounce from "lodash.debounce";
import useTitle from "src/hooks/useTitle";
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";
import SubCategoryItem from "src/components/subcategories/SubCategoryItem";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const SubCategory = () => {
  useTitle("Admin : List of all Subcategories");

  const theme = useTheme();

  const loading = useTypedSelector((state) => state.categories.loading);
  const loadingActivation = useTypedSelector(
    (state) => state.categories.loadingActivation
  );
  const subCategories = useTypedSelector(
    (state) => state.categories.subCategories
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false);
  const [openDeleteSubCategory, setOpenDeleteSubCategory] = useState(false);
  // const [filteredSubCategory, setFilteredSubCategory] = useState(subCategories);

  const { getAllSubcategories, getAllCategories } = useActions();

  // eslint-disable-next-line
  // const debounceFilteredSubCategory = useCallback(
  //   debounce(handleFilteredSubCategory, 500),
  //   []
  // );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);

    // debounceFilteredSubCategory(event.target.value);

    setPage(0);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubCategoryAction = () => {
    return !loadingActivation;
  };

  useEffect(() => {
    getAllSubcategories();
    getAllCategories();

    // eslint-disable-next-line
  }, []);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Subcategories
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingWithActionButton
          filterText={filterText}
          handleSearch={handleSearch}
          rowsPerPage={rowsPerPage}
          setOpenAddCategory={setOpenAddSubCategory}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={subCategoryColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={subCategories.length}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
            notFoundText="No Subcategory Found"
          >
            {!loading &&
              subCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subCategory) => {
                  return (
                    <SubCategoryItem
                      key={subCategory._id}
                      subCategory={subCategory}
                      setOpenDeleteSubCategory={setOpenDeleteSubCategory}
                      setOpenEditSubCategory={setOpenEditSubCategory}
                    />
                  );
                })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      {/* <AddSubCategory
          openAddSubCategory={openAddSubCategory}
          setOpenAddSubCategory={setOpenAddSubCategory}
        /> */}
      {/* <EditSubCategory
          openEditSubCategory={openEditSubCategory}
          setOpenEditSubCategory={setOpenEditSubCategory}
        /> */}
      {/* <DeleteSubCategory
          openDeleteSubCategory={openDeleteSubCategory}
          setOpenDeleteSubCategory={setOpenDeleteSubCategory}
        /> */}
      <CustomLoadingDialog
        loading={loadingActivation}
        handleLoading={handleSubCategoryAction}
      />
    </Container>
  );
};

export default SubCategory;
