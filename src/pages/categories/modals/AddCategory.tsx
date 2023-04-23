import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import CustomFormInput from "src/utils/CustomFormInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadBox from "src/components/uploads/FileUploadBox";
import { useActions } from "src/hooks/useActions";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { configureSlug } from "src/lib/helpers";
import { capitalizeFirstLetters } from "src/lib/helpers";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { CategoryData } from "src/services/categories/CategoryTypes";

import {
  ContentContainer,
  ErrorsList,
  ErrorMessage,
  FormContainer,
  CancelButton,
  StyledChip,
  StyledCircularProgress,
  StyledIconButton,
  SubmitButton,
} from "./styles/AddCategoryStyles";

type AddCategoryProps = {
  openAddCategory: boolean;
  setOpenAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCategory = (props: AddCategoryProps) => {
  const theme = useTheme();
  const { openAddCategory, setOpenAddCategory } = props;

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [categoryData, setCategoryData] = useState<CategoryData>({
    categoryName: "",
    categorySlug: "",
  });

  const [categoryNameError, setCategoryNameError] = useState("");
  const [categorySlugError, setCategorySlugError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  //   eslint-disable-next-line
  const [categoryImageError, setCategoryImageError] = useState("");

  const { categoryName, categorySlug } = categoryData;
  const uploadedFile = useTypedSelector((state) => state.common.uploadedFile);
  const error = useTypedSelector((state) => state.categories.error);
  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );

  const { addNewCategory, clearUploadedImages, uploadFile } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCategoryData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "categoryName":
        if (!value) {
          setCategoryNameError("Please enter category name");
        } else {
          setCategoryNameError("");
        }
        break;
      case "categorySlug":
        if (!value) {
          setCategorySlugError("Please enter category slug");
        } else {
          setCategorySlugError("");
        }
        break;
      default:
        setCategoryNameError("");
        setCategorySlugError("");
    }
  };

  const handleChangeProductImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleClick = () => {
    if (!categoryName.trim()) {
      setCategoryNameError("Please enter category name");
      setCategoryData({ ...categoryData, categorySlug: "" });
    } else {
      setCategoryData({
        ...categoryData,
        categorySlug: configureSlug(categoryName),
      });
      setCategoryNameError("");
      setCategorySlugError("");
    }
  };

  const handleClearUploadedImages = () => {
    clearUploadedImages();
  };

  const handleAddCategory = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!categoryName.trim() && !categorySlug.trim()) {
      setCategoryNameError("Please enter category name");
      setCategorySlugError("Please enter category slug");
      return;
    }

    if (!categoryName.trim()) {
      setCategoryNameError("Please enter category name");
      return;
    }

    if (!categorySlug.trim()) {
      setCategorySlugError("Please enter category slug");
      return;
    }

    if (categoryNameError || categorySlugError) return;

    addNewCategory({
      setCategoryData,
      setOpenAddCategory,
      file: selectedFile,
      categoryName: capitalizeFirstLetters(categoryName),
      categorySlug: configureSlug(categorySlug),
      setIcon: uploadedFile ? uploadedFile.url : "",
    });
  };

  return (
    <ShowDialog
      openModal={openAddCategory}
      handleClose={() => setOpenAddCategory(false)}
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
              Add New Category
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                setOpenAddCategory(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {!loadingRequestAction && error && (
          <ErrorsList item component="ul">
            <ErrorMessage variant="body1" component="li" color="error">
              {error}
            </ErrorMessage>
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
              <CustomFormInput
                type="text"
                label="Category Name (required)"
                labelId="categoryName"
                name="categoryName"
                value={categoryName}
                placeholder="Enter Category Name"
                onChange={handleChange}
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
                onChange={handleChange}
                error={categorySlugError}
                autoComplete="off"
              />
              <StyledChip
                label="Generate Slug"
                variant="outlined"
                onClick={handleClick}
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
                <StyledIconButton onClick={handleClearUploadedImages}>
                  <DeleteSharpIcon />
                </StyledIconButton>
                <label htmlFor="add-category-photo">
                  <input
                    accept="image/*"
                    id="add-category-photo"
                    multiple
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChangeProductImage}
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
        </FormContainer>
      </ContentContainer>
    </ShowDialog>
  );
};

export default AddCategory;
