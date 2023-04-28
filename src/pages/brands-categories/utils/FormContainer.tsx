import React from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CustomSelect from "src/utils/CustomSelect";
import CustomFormInput from "src/utils/CustomFormInput";
import {
  StyledFormContainer,
  CancelButton,
  StyledChip,
  StyledCircularProgress,
  SubmitButton,
} from "src/utilityStyles/categoriesUtilityStyles";
import { configureSlug } from "src/lib/helpers";
import { FormContainerProps } from "../types";

const FormContainer = (props: FormContainerProps) => {
  const theme = useTheme();
  const {
    name,
    categories,
    category,
    categoryNameError,
    filteredSubCategory,
    onClick,
    onSelect,
    onSelectChange,
    onSubmit,
    subCategory,
    subCategoryError,
    onChange,
    brandNameError,
    brandSlugError,
    categorySlug,
    loadingRequestAction,
    setOpen,
    buttonTitle,
  } = props;

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <StyledFormContainer
      item
      container
      direction="column"
      component="form"
      onSubmit={onSubmit}
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
              .map((category) => category.categoryName.toLowerCase())}
            name="category"
            value={category}
            onChange={onSelectChange}
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
          <CustomSelect
            options={filteredSubCategory
              .filter((subCategory) => subCategory.isActivate)
              .map((subCategory) => subCategory.name.toLowerCase())}
            name="subCategory"
            value={subCategory}
            onChange={onSelect}
            label="Sub Category"
            placeholder="Select Sub Category"
            errorMessage={subCategoryError}
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
            label="Brand Name (required)"
            labelId="name"
            name="name"
            value={name}
            placeholder="Enter Brand Name"
            onChange={onChange}
            error={brandNameError}
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
            label="Brand Slug"
            labelId="categorySlug"
            name="categorySlug"
            value={configureSlug(categorySlug)}
            placeholder="Enter Brand Slug"
            onChange={onChange}
            autoComplete="off"
            error={brandSlugError}
          />
          <StyledChip
            label="Generate Slug"
            variant="outlined"
            onClick={onClick}
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
          <CancelButton onClick={() => setOpen(false)}>Cancel</CancelButton>
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
            {buttonTitle}
          </SubmitButton>
        </Grid>
      </Grid>
    </StyledFormContainer>
  );
};

export default FormContainer;
