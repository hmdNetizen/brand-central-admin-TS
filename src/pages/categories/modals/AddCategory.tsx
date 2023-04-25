import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { configureSlug } from "src/lib/helpers";
import { capitalizeFirstLetters } from "src/lib/helpers";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { CategoryData } from "src/services/categories/CategoryTypes";

import {
  ContentContainer,
  ErrorsList,
  ErrorMessage,
} from "./styles/CategoryModalsStyles";
import FormContainer from "../utils/FormContainer";

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
  const [preview, setPreview] = useState<string | undefined>();
  //   eslint-disable-next-line
  const [categoryImageError, setCategoryImageError] = useState("");

  const { categoryName, categorySlug } = categoryData;
  const uploadedFile = useTypedSelector((state) => state.common.uploadedFile);
  const error = useTypedSelector((state) => state.categories.error);
  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );

  const { addNewCategory } = useActions();

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

  const handleChangeCategoryImage = (
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

  const handleRemoveImage = () => {
    setSelectedFile("");
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
      setOpen: setOpenAddCategory,
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
          categoryName={categoryName}
          categorySlug={categorySlug}
          onClick={handleClick}
          onChange={handleChange}
          onSubmit={handleAddCategory}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          onRemoveImage={handleRemoveImage}
          loadingRequestAction={loadingRequestAction}
          onImageChange={handleChangeCategoryImage}
          setOpen={setOpenAddCategory}
          categoryNameError={categoryNameError}
          categorySlugError={categorySlugError}
          setCategoryImageError={setCategoryImageError}
          preview={preview}
          setPreview={setPreview}
          buttonTitle="Add Category"
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default AddCategory;
