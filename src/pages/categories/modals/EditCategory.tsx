import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { configureSlug, capitalizeFirstLetters } from "src/lib/helpers";
import {
  ContentContainer,
  ErrorsList,
  ErrorMessage,
} from "./styles/CategoryModalsStyles";
import FormContainer from "../utils/FormContainer";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { CategoryDataExcerpt } from "src/services/categories/CategoryTypes";

const initialCategoryData = {
  categoryName: "",
  categorySlug: "",
  setIcon: "",
};

type EditCategoryProps = {
  openEditCategory: boolean;
  setOpenEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditCategory = (props: EditCategoryProps) => {
  const { openEditCategory, setOpenEditCategory } = props;
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [categoryData, setCategoryData] =
    useState<CategoryDataExcerpt>(initialCategoryData);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [preview, setPreview] = useState<string | undefined>("");

  const { categoryName, categorySlug } = categoryData;

  const [categoryNameError, setCategoryNameError] = useState("");
  const [categorySlugError, setCategorySlugError] = useState("");
  //   eslint-disable-next-line
  const [categoryImageError, setCategoryImageError] = useState("");

  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );
  const singleCategory = useTypedSelector(
    (state) => state.categories.singleCategory
  );
  const error = useTypedSelector((state) => state.categories.error);

  const { updateCategory } = useActions();

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
      categoryId: singleCategory?._id!,
      setOpen: setOpenEditCategory,
      categoryName: capitalizeFirstLetters(categoryName),
      categorySlug,
      setIcon: singleCategory?.setIcon!,
      setCategoryData,
      file: selectedFile,
    });
  };

  useEffect(() => {
    if (singleCategory) {
      const newCategoryData = { ...initialCategoryData };

      for (const key in newCategoryData) {
        if (key in singleCategory) {
          newCategoryData[key as keyof CategoryDataExcerpt] =
            singleCategory[key as keyof CategoryDataExcerpt];
        }

        if (singleCategory.setIcon) {
          setPreview(singleCategory.setIcon);
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
              Edit Category
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
          onSubmit={handleUpdateCategory}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          onRemoveImage={handleRemoveImage}
          loadingRequestAction={loadingRequestAction}
          onImageChange={handleChangeCategoryImage}
          setOpen={setOpenEditCategory}
          categoryNameError={categoryNameError}
          categorySlugError={categorySlugError}
          setCategoryImageError={setCategoryImageError}
          preview={preview}
          setPreview={setPreview}
          buttonTitle="Update Category"
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default EditCategory;
