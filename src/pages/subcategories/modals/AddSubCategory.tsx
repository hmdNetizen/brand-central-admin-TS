import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { configureSlug, capitalizeFirstLetters } from "src/lib/helpers";
import { useActions } from "src/hooks/useActions";
import {
  ContentContainer,
  ErrorsList,
  ErrorMsg,
} from "src/utilityStyles/categoriesUtilityStyles";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SelectChangeEvent } from "@mui/material";
import FormContainer from "../utils/FormContainer";

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

  const { name, category, categorySlug } = subCategoryData;

  const categories = useTypedSelector((state) => state.categories.categories);
  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );
  const error = useTypedSelector((state) => state.categories.error);

  const { addNewSubCategory } = useActions();

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
    const {
      target: { name, value },
    } = selectEvent;

    setSubCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));

    switch (name) {
      case "category":
        if (!value) {
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

    addNewSubCategory({
      setSubCategoryData,
      setOpen: setOpenAddSubCategory,
      category,
      name: capitalizeFirstLetters(name),
      categorySlug: configureSlug(categorySlug),
    });
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
          categories={categories}
          category={category}
          categoryNameError={categoryNameError}
          categorySlug={categorySlug}
          name={name}
          subCategoryNameError={subCategoryNameError}
          subCategorySlugError={subCategorySlugError}
          loadingRequestAction={loadingRequestAction}
          onChange={handleChange}
          onClick={handleClick}
          onSelect={handleSelectChange}
          onSubmit={handleAddCategory}
          setOpen={setOpenAddSubCategory}
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default AddSubCategory;
