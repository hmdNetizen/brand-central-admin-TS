import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import CustomFormInput from "src/utils/CustomFormInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import FileUploadBox from "src/components/uploads/FileUploadBox";
import { useActions } from "src/hooks/useActions";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
// import { configureSlug } from "lib/helpers";
import { capitalizeFirstLetters } from "src/lib/helpers";

const ContentContainer = styled(Grid)({
  paddingBottom: "3rem",
});

const ErrorsList = styled(Grid)<{ component: React.ElementType }>(
  ({ theme }) => ({
    padding: "2rem 2rem 2rem 3rem",
    background: theme.palette.common.lightRed,
    alignSelf: "center",
    marginTop: "1rem",
    borderRadius: 5,
    listStyle: "none",
  })
);

const ErrorMessage = styled(Typography)<{ component: React.ElementType }>({
  fontSize: "1.5rem",
  "&:not(:first-of-type)": {
    paddingTop: ".5rem",
  },
});

const FormContainer = styled(Grid)<{ component: React.ElementType }>({
  padding: "2rem",
});

const SubmitButton = styled(Button)(({ theme }) => ({
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
}));

const StyledCircularProgress = styled(CircularProgress)({
  marginRight: "1rem",
  "&.MuiCircularProgress-root": {
    color: "#f2f2f2",
  },
});

const CancelButton = styled(Button)(({ theme }) => ({
  fontSize: "1.5rem",
  textTransform: "none",
  padding: ".5rem 2rem",
  borderRadius: 0,
  color: theme.palette.error.main,
  background: theme.palette.common.lightRed,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginTop: ".5rem",
  borderRadius: 0,
  height: 25,
  fontSize: "1rem",
  borderColor: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  display: "flex",
  width: 100,
  textAlign: "center",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
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
}));

const AddCategory = ({ openAddCategory, setOpenAddCategory }) => {
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categorySlug: "",
  });

  const [categoryNameError, setCategoryNameError] = useState("");
  const [categorySlugError, setCategorySlugError] = useState("");
  //   eslint-disable-next-line
  const [categoryImageError, setCategoryImageError] = useState("");

  const { categoryName, categorySlug } = categoryData;
  const;

  const { loadingAction, uploadedFile, error } = useSelector(
    (state) => state.common
  );
  const { addNewCategory, clearUploadedImages, uploadFile } = useActions();

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

  const handleChangeProductImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

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
        {!loadingAction && error && (
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
              />
            </Grid>
            {uploadedFile && (
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
                <label htmlFor="add-product-photo">
                  <input
                    accept="image/*"
                    id="add-product-photo"
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
                disabled={loadingAction}
              >
                {loadingAction && (
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
