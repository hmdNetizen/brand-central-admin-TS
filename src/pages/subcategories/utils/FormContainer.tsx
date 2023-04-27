import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CustomFormInput from "src/utils/CustomFormInput";
import CustomSelect from "src/utils/CustomSelect";
import { configureSlug } from "src/lib/helpers";
import {
  StyledFormContainer,
  SubmitButton,
  StyledCircularProgress,
  CancelButton,
  StyledChip,
} from "src/utilityStyles/categoriesUtilityStyles";
import { FormContainerProps } from "../types";

const FormContainer = (props: FormContainerProps) => {
  const {
    categories,
    category,
    categoryNameError,
    categorySlug,
    subCategorySlugError,
    loadingRequestAction,
    onChange,
    onClick,
    onSelect,
    onSubmit,
    setOpen,
    name,
    subCategoryNameError,
    buttonTitle,
  } = props;
  const theme = useTheme();
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
              .map((category) => category.categoryName)}
            name="category"
            value={category}
            onChange={onSelect}
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
            onChange={onChange}
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
            onChange={onChange}
            autoComplete="off"
            error={subCategorySlugError}
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
