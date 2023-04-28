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
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import CustomSelect from "src/utils/CustomSelect";
import { configureSlug } from "src/lib/helpers";
import { useActions } from "src/hooks/useActions";
import PropTypes from "prop-types";
import { capitalizeFirstLetters } from "src/lib/helpers";
import {
  BrandCategoryData,
  SubCategoryReturnedPayload,
} from "src/services/categories/CategoryTypes";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SelectChangeEvent } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingBottom: "3rem",
  },
  errorsList: {
    "&.MuiGrid-root": {
      padding: "2rem 2rem 2rem 3rem",
      background: theme.palette.common.lightRed,
      alignSelf: "center",
      marginTop: "1rem",
      borderRadius: 5,
      listStyle: "none",
    },
  },
  errorMsg: {
    "&.MuiTypography-root": {
      fontSize: "1.5rem",
      "&:not(:first-of-type)": {
        paddingTop: ".5rem",
      },
    },
  },
  formContainer: {
    "&.MuiGrid-root": {
      padding: "2rem",
    },
  },
  submitButton: {
    "&.MuiButton-root": {
      minWidth: 180,
      fontSize: "1.6rem",
      fontWeight: 400,
      textTransform: "none",
      borderRadius: 0,

      "&:hover": {
        background: theme.palette.secondary.light,
      },

      "&:active": {
        background: theme.palette.secondary.dark,
      },

      "&:disabled": {
        cursor: "not-allowed",
        pointerEvents: "all !important",
        background: theme.palette.secondary.light,
        color: "#fff",
        // color: (props) => (props.loading ? "#fff" : "inherit"),
      },
    },
  },
  loader: {
    marginRight: "1rem",
    "&.MuiCircularProgress-root": {
      color: "#f2f2f2",
    },
  },
  cancelButton: {
    "&.MuiButton-root": {
      fontSize: "1.5rem",
      textTransform: "none",
      padding: ".5rem 2rem",
      borderRadius: 0,
      color: theme.palette.error.main,
      background: theme.palette.common.lightRed,
    },
  },
  chip: {
    "&.MuiChip-root": {
      marginTop: ".5rem",
      borderRadius: 0,
      height: 25,
      fontSize: "1rem",
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.dark,
      display: "flex",
      width: 100,
      textAlign: "center",
    },
  },
  iconButton: {
    "&.MuiIconButton-root": {
      background: theme.palette.error.main,
      maxWidth: 42,

      "&:hover": {
        background: theme.palette.error.light,
      },

      "&:active": {
        background: theme.palette.error.dark,
      },

      "& .MuiSvgIcon-root": {
        color: "#fff",
      },
    },
  },
}));

const AddBrandCategory = ({
  openAddBrandCategory,
  setOpenAddBrandCategory,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [brandCategoryData, setBrandCategoryData] = useState<BrandCategoryData>(
    {
      name: "",
      category: "",
      subCategory: "",
      categorySlug: "",
    }
  );

  const [brandSlugError, setBrandSlugError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [brandNameError, setBrandNameError] = useState("");
  const [filterListSubCategory, setFilterListSubCategory] = useState<
    SubCategoryReturnedPayload[]
  >([]);

  const { name, category, subCategory, categorySlug } = brandCategoryData;
  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );
  const categories = useTypedSelector((state) => state.categories.categories);
  const subCategories = useTypedSelector(
    (state) => state.categories.subCategories
  );
  const error = useTypedSelector((state) => state.categories.error);

  const { addNewBrandCategory } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setBrandCategoryData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "Name":
        if (!value.trim()) {
          setBrandNameError("Please enter Brand name");
        } else {
          setBrandNameError("");
        }
        break;
      case "categorySlug":
        if (!value.trim()) {
          setBrandSlugError("Please enter Brand Name slug");
        } else {
          setBrandSlugError("");
        }
        break;
      default:
        setCategoryNameError("");
        setSubCategoryError("");
        setBrandNameError("");
        setBrandSlugError("");
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const SelectEvent = event as SelectChangeEvent<HTMLInputElement>;
    const { name, value } = SelectEvent.target;

    setBrandCategoryData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "category":
        if (!value) {
          setCategoryNameError("Please select a Category");
        } else {
          setCategoryNameError("");
        }
        break;
      case "subCategory":
        if (!value) {
          setSubCategoryError("Please select a Subcategory");
        } else {
          setSubCategoryError("");
        }
        break;
      default:
        setCategoryNameError("");
        setSubCategoryError("");
    }
  };

  const handleClick = () => {
    if (!name.trim()) {
      setBrandNameError("Please enter brand name");
      setBrandCategoryData({ ...brandCategoryData, categorySlug: "" });
    } else {
      setBrandCategoryData({
        ...brandCategoryData,
        categorySlug: configureSlug(name),
      });
      setCategoryNameError("");
      setBrandSlugError("");
    }
  };

  const handleSubCategoryListFilter = (value: string) => {
    const newSubCategory = [...subCategories]
      .filter((subCategory) => subCategory.isActivate)
      .filter(
        (subCategoryData) =>
          subCategoryData.category.toLowerCase() === value.toLowerCase()
      );

    setFilterListSubCategory(newSubCategory);
  };

  const handleAddCategory = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!category && !subCategory && !name.trim() && !categorySlug.trim()) {
      setCategoryNameError("Please select category name");
      setSubCategoryError("Please select a sub category");
      setBrandNameError("Please enter a brand name");
      setBrandSlugError("Please enter brand name slug");
      return;
    }

    if (!category) {
      setCategoryNameError("Please select category name");
      return;
    }

    if (!subCategory) {
      setSubCategoryError("Please select a sub category");
      return;
    }

    if (!name.trim()) {
      setBrandNameError("Please enter a brand name");
      return;
    }

    if (!categorySlug.trim()) {
      setBrandSlugError("Please enter brand name slug");
      return;
    }

    if (
      categoryNameError ||
      subCategoryError ||
      brandNameError ||
      brandSlugError
    )
      return;

    addNewBrandCategory({
      setBrandCategoryData,
      setOpenAddBrandCategory,
      category,
      subCategory,
      name: capitalizeFirstLetters(name),
      categorySlug: configureSlug(categorySlug),
    });
  };

  return (
    <ShowDialog
      openModal={openAddBrandCategory}
      handleClose={() => setOpenAddBrandCategory(false)}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
    >
      <Grid container direction="column" className={classes.contentContainer}>
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
              Add New Brand Category
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setOpenAddBrandCategory(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {!loadingRequestAction && error && (
          <Grid item component="ul" className={classes.errorsList}>
            <Typography
              variant="body1"
              component="li"
              color="error"
              className={classes.errorMsg}
            >
              {error}
            </Typography>
          </Grid>
        )}
        <Grid
          item
          container
          direction="column"
          component="form"
          className={classes.formContainer}
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
              <CustomSelect
                options={
                  categories &&
                  categories
                    .filter((category) => category.isActivate)
                    .map((category) => category.categoryName)
                }
                name="category"
                value={category}
                onChange={(event) => {
                  handleSelectChange(event);
                  const value = event.target.value as string;
                  handleSubCategoryListFilter(value);
                }}
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
                options={
                  filterListSubCategory &&
                  filterListSubCategory.map((subCategory) => subCategory.name)
                }
                name="subCategory"
                value={subCategory}
                onChange={handleSelectChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                autoComplete="off"
                error={brandSlugError}
              />
              <Chip
                label="Generate Slug"
                variant="outlined"
                onClick={handleClick}
                className={classes.chip}
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
              <Button
                className={classes.cancelButton}
                onClick={() => setOpenAddBrandCategory(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                disableRipple
                color="secondary"
                className={classes.submitButton}
                disabled={loadingRequestAction}
              >
                {loadingRequestAction && (
                  <CircularProgress
                    style={{ height: 25, width: 25 }}
                    className={classes.loader}
                  />
                )}{" "}
                Add Brand Category
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ShowDialog>
  );
};

AddBrandCategory.propTypes = {
  openAddBrandCategory: PropTypes.bool.isRequired,
  setOpenAddBrandCategory: PropTypes.func.isRequired,
};

export default AddBrandCategory;
