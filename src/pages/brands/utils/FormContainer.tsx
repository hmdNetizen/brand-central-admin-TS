import React from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  StyledFormContainer,
  CancelButton,
  StyledChip,
  StyledCircularProgress,
  SubmitButton,
} from "src/utilityStyles/categoriesUtilityStyles";
import { configureSlug } from "src/lib/helpers";
import CustomFormInput from "src/utils/CustomFormInput";
import FileUploadLayout from "src/components/uploads/FileUploadLayout";
import { FormContainerProps } from "../types";

const FormContainer = (props: FormContainerProps) => {
  const theme = useTheme();
  const {
    brandNameError,
    name,
    slug,
    onChange,
    onSubmit,
    brandSlugError,
    onClick,
    loadingBrands,
    setOpen,
    onImageChange,
    setSelectedFile,
    onRemoveImage,
    preview,
    selectedFile,
    setBrandImageError,
    setPreview,
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
            labelId="slug"
            name="slug"
            value={configureSlug(slug)}
            placeholder="Enter Brand Slug"
            onChange={onChange}
            error={brandSlugError}
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
          <FileUploadLayout
            onImageChange={onImageChange}
            onRemoveImage={onRemoveImage}
            selectedFile={selectedFile}
            setImageError={setBrandImageError}
            setSelectedFile={setSelectedFile}
            preview={preview}
            setPreview={setPreview}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        columnSpacing={1}
        rowSpacing={1}
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
            disabled={loadingBrands}
          >
            {loadingBrands && (
              <StyledCircularProgress style={{ height: 25, width: 25 }} />
            )}{" "}
            Add Brand
          </SubmitButton>
        </Grid>
      </Grid>
    </StyledFormContainer>
  );
};

export default FormContainer;
