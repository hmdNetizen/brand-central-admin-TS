import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import CustomFormInput from "src/utils/CustomFormInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import CustomSelect from "src/utils/CustomSelect";
import { configureSlug, capitalizeFirstLetters } from "src/lib/helpers";
import { useActions } from "src/hooks/useActions";
import {
  ContentContainer,
  FormContainer,
  ErrorsList,
  ErrorMsg,
  SubmitButton,
  StyledCircularProgress,
  CancelButton,
  StyledChip,
} from "src/utilityStyles/categoriesUtilityStyles";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SelectChangeEvent } from "@mui/material";

type AddSubCategoryProps = {
  openAddSubCategory: boolean;
  setOpenAddSubCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

type SubCategoryDataTypes = {
  name: string;
  category: string;
  categorySlug: string;
};

const AddSubCategory = (props: AddSubCategoryProps) => {
  const { openAddSubCategory, setOpenAddSubCategory } = props;
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [subCategoryData, setSubCategoryData] = useState<SubCategoryDataTypes>({
    name: "",
    category: "",
    categorySlug: "",
  });

  const [subCategorySlugError, setSubCategorySlugError] = useState("");
  const [subCategoryNameError, setSubCategoryNameError] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  //   eslint-disable-next-line
  const [productImageError, setProductImageError] = useState("");

  const { name, category, categorySlug } = subCategoryData;

  const categories = useTypedSelector((state) => state.categories.categories);
  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );
  const error = useTypedSelector((state) => state.categories.error);

  //   const { addNewSubCategory } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSubCategoryData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "Name":
        if (!value.trim()) {
          setSubCategoryNameError("Please enter Subcategory name");
        } else {
          setSubCategoryNameError("");
        }
        break;
      case "categorySlug":
        if (!value.trim()) {
          setSubCategorySlugError("Please enter Subcategory slug");
        } else {
          setSubCategorySlugError("");
        }
        break;
      default:
        setCategoryNameError("");
        setSubCategoryNameError("");
        setSubCategorySlugError("");
    }
  };

  const handleClick = () => {
    if (!name.trim()) {
      setSubCategoryNameError("Please enter Subcategory name");
      setSubCategoryData({ ...subCategoryData, categorySlug: "" });
    } else {
      setSubCategoryData({
        ...subCategoryData,
        categorySlug: configureSlug(name),
      });
      setCategoryNameError("");
      setSubCategorySlugError("");
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const selectEvent = event as SelectChangeEvent<HTMLInputElement>;
    setSubCategoryData((prev) => ({
      ...prev,
      [name]: selectEvent.target.value,
    }));

    switch (name) {
      case "category":
        if (!selectEvent.target.value) {
          setCategoryNameError("Please select a category");
        } else {
          setCategoryNameError("");
        }
        break;
    }
  };

  const handleAddCategory = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!name.trim() && !categorySlug.trim() && !category) {
      setCategoryNameError("Please select category name");
      setSubCategoryNameError("Please enter a sub category name");
      setSubCategorySlugError("Please enter sub category slug");
      return;
    }

    if (!category.trim()) {
      setCategoryNameError("Please select category name");
      return;
    }

    if (!name.trim()) {
      setSubCategoryNameError("Please enter sub category name");
      return;
    }

    if (!categorySlug.trim()) {
      setSubCategorySlugError("Please enter sub category slug");
      return;
    }

    if (categoryNameError || subCategoryNameError || subCategorySlugError)
      return;

    // addNewSubCategory({
    //   setSubCategoryData,
    //   setOpenAddSubCategory,
    //   category,
    //   name: capitalizeFirstLetters(name),
    //   categorySlug: configureSlug(categorySlug),
    // });
  };

  return (
    <ShowDialog
      openModal={openAddSubCategory}
      handleClose={() => setOpenAddSubCategory(false)}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
    >
      <ContentContainer container direction="column">
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            p: "1rem 2rem",
            background: "#f7f7f7",
          }}
        >
          <Grid item alignSelf="center">
            <Typography
              variant="h4"
              style={{ marginBottom: 0 }}
              color="secondary"
            >
              Add New Sub Category
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setOpenAddSubCategory(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {!loadingRequestAction && error && (
          <ErrorsList item component="ul">
            <ErrorMsg variant="body1" component="li" color="error">
              {error}
            </ErrorMsg>
          </ErrorsList>
        )}
        <FormContainer
          item
          container
          direction="column"
          component="form"
          onSubmit={handleAddCategory}
        >
          <Grid
            item
            container
            justifyContent="center"
            style={{ marginBottom: "2rem" }}
          >
            <Grid
              item
              style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
            >
              <CustomSelect
                options={categories
                  .filter((category) => category.isActivate)
                  .map((category) => category.categoryName)}
                name="category"
                value={category}
                onChange={handleSelectChange}
                label="Category"
                placeholder="Select Category"
                errorMessage={categoryNameError}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            style={{ marginBottom: "2rem" }}
          >
            <Grid
              item
              style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
            >
              <CustomFormInput
                type="text"
                label="Sub Category Name (required)"
                labelId="name"
                name="name"
                value={name}
                placeholder="Enter Sub Category Name"
                onChange={handleChange}
                error={subCategoryNameError}
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            style={{ marginBottom: "2rem" }}
          >
            <Grid
              item
              style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
            >
              <CustomFormInput
                type="text"
                label="Sub Category Slug"
                labelId="categorySlug"
                name="categorySlug"
                value={configureSlug(categorySlug)}
                placeholder="Enter Sub Category Slug"
                onChange={handleChange}
                autoComplete="off"
                error={subCategorySlugError}
              />
              <StyledChip
                label="Generate Slug"
                variant="outlined"
                onClick={handleClick}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={1}
            style={{ marginTop: "5rem" }}
          >
            <Grid item>
              <CancelButton onClick={() => setOpenAddSubCategory(false)}>
                Cancel
              </CancelButton>
            </Grid>
            <Grid item>
              <SubmitButton
                type="submit"
                variant="contained"
                disableRipple
                color="secondary"
                disabled={loadingRequestAction}
              >
                {loadingRequestAction && (
                  <StyledCircularProgress style={{ height: 25, width: 25 }} />
                )}{" "}
                Add Sub Category
              </SubmitButton>
            </Grid>
          </Grid>
        </FormContainer>
      </ContentContainer>
    </ShowDialog>
  );
};

export default AddSubCategory;
