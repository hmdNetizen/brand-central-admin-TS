import React from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CustomFormInput from "src/utils/CustomFormInput";
import {
  StyledFormContainer,
  StyledChip,
  CancelButton,
  SubmitButton,
  StyledCircularProgress,
} from "../modals/styles/CategoryModalsStyles";
import { configureSlug } from "src/lib/helpers";
import FileUploadLayout from "src/components/uploads/FileUploadLayout";

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
      <FileUploadLayout
        onImageChange={onImageChange}
        onRemoveImage={onRemoveImage}
        selectedFile={selectedFile}
        setCategoryImageError={setCategoryImageError}
        setSelectedFile={setSelectedFile}
      />
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