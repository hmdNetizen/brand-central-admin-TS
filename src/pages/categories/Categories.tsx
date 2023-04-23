import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import CustomIconButton from "src/utils/CustomIconButton";
import CustomSelect from "src/utils/CustomSelect";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
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
import { SelectChangeEvent } from "@mui/material";

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

const Input = styled("input")(({ theme }) => ({
  fontSize: "1.6rem",
  borderRadius: 5,
  border: `1px solid ${theme.palette.common.lighterGrey}`,
  padding: "1rem 1rem",
  width: "100%",

  "&:focus": {
    outline: "none",
  },
}));

const Categories = () => {
  useTitle("Admin : List of all Categories");
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

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

  const { getAllCategories, clearUploadedImages } = useActions();

  // eslint-disable-next-line
  //   const debounceFilteredCategory = useCallback(
  //     debounce(handleFilteredCategory, 500),
  //     []
  //   );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);

    // debounceFilteredCategory(event.target.value);

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
        <Grid
          container
          direction={matchesSM ? "column" : "row"}
          justifyContent={matchesMD ? "space-around" : "space-between"}
          rowSpacing={matchesSM ? 2 : matchesMD ? 3 : 0}
          alignItems="center"
        >
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2">Show</Typography>
              </Grid>
              <Grid item style={{ marginRight: 5, marginLeft: 5 }}>
                <CustomSelect
                  style={{ width: "100%" }}
                  options={[10, 25, 50, 100]}
                  value={rowsPerPage.toString()}
                  onChange={handleSelectRowsPerPage}
                  hasLabel={false}
                />
              </Grid>
              <Grid item>
                <Typography variant="body2">entries</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: matchesSM ? "100%" : 350 }}>
            <Input
              placeholder="Search Category by name..."
              value={filterText}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item style={{ width: matchesXS ? "100%" : "auto" }}>
            <CustomIconButton
              title="Add New Category"
              background={theme.palette.secondary}
              startIcon={<AddIcon />}
              borderRadius={0}
              style={{ width: "100%" }}
              onClick={() => {
                setOpenAddCategory(true);
                clearUploadedImages();
              }}
            />
          </Grid>
        </Grid>
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
