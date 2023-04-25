import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles, useTheme } from "@mui/styles";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useActions } from "src/hooks/useActions";
import { configureSlug, capitalizeFirstLetters } from "src/lib/helpers";
import {
  ContentContainer,
  ErrorsList,
  ErrorMessage,
} from "./styles/CategoryModalsStyles";
import FormContainer from "../utils/FormContainer";

const initialCategoryData = {
  categoryName: "",
  categorySlug: "",
};

const EditCategory = ({ openEditCategory, setOpenEditCategory }) => {
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [categoryData, setCategoryData] = useState(initialCategoryData);

  const { categoryName, categorySlug } = categoryData;

  const [categoryNameError, setCategoryNameError] = useState("");
  const [categorySlugError, setCategorySlugError] = useState("");
  //   eslint-disable-next-line
  const [productImageError, setProductImageError] = useState("");

  const { loadingAction, uploadedFile, singleCategory, error } = useSelector(
    (state) => state.common
  );
  const { uploadFile, clearUploadedImages, setFeaturedImage, updateCategory } =
    useActions();

  const handleChange = (event) => {
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

  const handleChangeProductImage = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    uploadFile({
      file,
    });
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

  const handleUpdateCategory = (
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

    updateCategory({
      categoryId: singleCategory._id,
      setOpenEditCategory,
      categoryName: capitalizeFirstLetters(categoryName),
      categorySlug,
      setIcon: uploadedFile ? uploadedFile.url : "",
    });
  };

  useEffect(() => {
    if (singleCategory) {
      const newCategoryData = { ...initialCategoryData };

      for (const key in newCategoryData) {
        if (key in singleCategory) {
          newCategoryData[key] = singleCategory[key];
        }

        if (singleCategory.setIcon) {
          setFeaturedImage(singleCategory.setIcon);
        }
      }
      setCategoryData(newCategoryData);
    }

    // eslint-disable-next-line
  }, [singleCategory]);

  return (
    <ShowDialog
      openModal={openEditCategory}
      handleClose={() => setOpenEditCategory(false)}
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
                setOpenEditCategory(false);
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
          categoryName={categoryName}
          categorySlug={categorySlug}
          onClick={handleClick}
          onChange={handleChange}
          onSubmit={handleAddCategory}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          onRemoveImage={handleRemoveImage}
          loadingRequestAction={loadingRequestAction}
          onImageChange={handleChangeProductImage}
          setOpen={setOpenEditCategory}
          categoryNameError={categoryNameError}
          categorySlugError={categorySlugError}
          setCategoryImageError={setCategoryImageError}
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default EditCategory;
