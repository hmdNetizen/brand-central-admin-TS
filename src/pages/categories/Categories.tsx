import React, { useState, useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { categoryColumns } from "src/lib/dataset/tableData";
import AddCategory from "./modals/AddCategory";
// import EditCategory from "./modals/EditCategory";
// import DeleteCategory from "./modals/DeleteCategory";
import debounce from "lodash.debounce";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import useTitle from "src/hooks/useTitle";
import CategoryItem from "src/components/categories/CategoryItem";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";

const Categories = () => {
  useTitle("Admin : List of all Categories");
  const theme = useTheme();

  const loading = useTypedSelector((state) => state.categories.loading);
  const loadingActivation = useTypedSelector(
    (state) => state.categories.loadingActivation
  );
  const categories = useTypedSelector((state) => state.categories.categories);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);

  const { getAllCategories, getSearchedCategory } = useActions();

  const debounceFilteredCategory = useCallback(
    debounce(getSearchedCategory, 500),
    []
  );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);

    debounceFilteredCategory(event.target.value);

    setPage(0);
  };

  const handleCategoryAction = () => {
    return !loadingActivation;
  };

  useEffect(() => {
    getAllCategories();

    // eslint-disable-next-line
  }, []);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Categories
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingWithActionButton
          filterText={filterText}
          handleSearch={handleSearch}
          rowsPerPage={rowsPerPage}
          setOpenAddCategory={setOpenAddCategory}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={categoryColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={categories.length}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
            notFoundText="No Category Found"
          >
            {!loading &&
              categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => {
                  return (
                    <CategoryItem
                      key={category._id}
                      category={category}
                      setOpenDeleteCategory={setOpenDeleteCategory}
                      setOpenEditCategory={setOpenEditCategory}
                    />
                  );
                })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      <AddCategory
        openAddCategory={openAddCategory}
        setOpenAddCategory={setOpenAddCategory}
      />
      {/* <EditCategory
        openEditCategory={openEditCategory}
        setOpenEditCategory={setOpenEditCategory}
      /> */}
      {/* <DeleteCategory
        openDeleteCategory={openDeleteCategory}
        setOpenDeleteCategory={setOpenDeleteCategory}
      /> */}
      <CustomLoadingDialog
        loading={loadingActivation}
        handleLoading={handleCategoryAction}
      />
    </Container>
  );
};

export default Categories;
