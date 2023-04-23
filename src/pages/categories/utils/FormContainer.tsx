import React from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import CustomFormInput from "src/utils/CustomFormInput";
import {
  StyledFormContainer,
  StyledChip,
  CancelButton,
  SubmitButton,
  StyledIconButton,
  StyledCircularProgress,
} from "../modals/styles/CategoryModalsStyles";
import { configureSlug } from "src/lib/helpers";

type FormContainerProps = {
  onSubmit: (event: React.FormEvent<HTMLInputElement | HTMLDivElement>) => void;
  categoryName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categoryNameError: string;
  categorySlug: string;
  categorySlugError: string;
  setCategoryImageError: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
  onRemoveImage: () => void;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  setOpenAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  loadingRequestAction: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormContainer = (props: FormContainerProps) => {
  const theme = useTheme();
  const {
    categoryNameError,
    categoryName,
    categorySlug,
    categorySlugError,
    onChange,
    onClick,
    onSubmit,
    setCategoryImageError,
    onRemoveImage,
    selectedFile,
    setSelectedFile,
    loadingRequestAction,
    setOpenAddCategory,
    onImageChange,
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
          <CustomFormInput
            type="text"
            label="Category Name (required)"
            labelId="categoryName"
            name="categoryName"
            value={categoryName}
            placeholder="Enter Category Name"
            onChange={onChange}
            error={categoryNameError}
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
            label="Category Slug"
            labelId="categorySlug"
            name="categorySlug"
            value={configureSlug(categorySlug)}
            placeholder="Enter Category Slug"
            onChange={onChange}
            error={categorySlugError}
            autoComplete="off"
          />
          <StyledChip
            label="Generate Slug"
            variant="outlined"
            onClick={onClick}
          />
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item style={{ width: 200 }}>
          <FileUploadBox
            iconSize="5rem"
            setImageError={setCategoryImageError}
            errorMessage="Add an image for this category"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </Grid>
        {selectedFile && (
          <Grid
            item
            container
            justifyContent="center"
            columnGap={1}
            sx={{ mt: 1 }}
          >
            <StyledIconButton onClick={onRemoveImage}>
              <DeleteSharpIcon />
            </StyledIconButton>
            <label htmlFor="add-category-photo">
              <input
                accept="image/*"
                id="add-category-photo"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={onImageChange}
              />
              <Button
                variant="contained"
                component="span"
                style={{ width: 120 }}
                color="secondary"
              >
                Change
              </Button>
            </label>
          </Grid>
        )}
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
          <CancelButton onClick={() => setOpenAddCategory(false)}>
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
            Add Category
          </SubmitButton>
        </Grid>
      </Grid>
    </StyledFormContainer>
  );
};

export default FormContainer;
