import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { configureSlug } from "src/lib/helpers";
import { useActions } from "src/hooks/useActions";
import { capitalizeFirstLetters } from "src/lib/helpers";
import {
  BrandCategoryData,
  SubCategoryReturnedPayload,
} from "src/services/categories/CategoryTypes";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SelectChangeEvent } from "@mui/material";
import FormContainer from "../utils/FormContainer";
import {
  ContentContainer,
  ErrorsList,
  ErrorMsg,
} from "src/utilityStyles/pagesUtilityStyles";

type EditBrandCategoryProps = {
  openEditBrandCategory: boolean;
  setOpenEditBrandCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialBrandCategoryData = {
  category: "",
  subCategory: "",
  name: "",
  categorySlug: "",
};

const EditBrandCategory = (props: EditBrandCategoryProps) => {
  const { openEditBrandCategory, setOpenEditBrandCategory } = props;
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [brandCategoryData, setBrandCategoryData] = useState<BrandCategoryData>(
    initialBrandCategoryData
  );

  const [brandSlugError, setBrandSlugError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [brandNameError, setBrandNameError] = useState("");

  const { name, category, subCategory, categorySlug } = brandCategoryData;
  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );
  const categories = useTypedSelector((state) => state.categories.categories);
  const subCategories = useTypedSelector(
    (state) => state.categories.subCategories
  );
  const singleBrandCategory = useTypedSelector(
    (state) => state.categories.singleBrandCategory
  );
  const error = useTypedSelector((state) => state.categories.error);
  const [filteredSubCategory, setFilteredSubCategory] =
    useState<SubCategoryReturnedPayload[]>(subCategories);

  const { updateBrandCategory } = useActions();

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

  //   const handleSubCategoryListFilter = (value: string) => {
  //     const newSubCategory = [...subCategories]
  //       .filter((subCategory) => subCategory.isActivate)
  //       .filter(
  //         (subCategoryData) =>
  //           subCategoryData.category.toLowerCase() === value.toLowerCase()
  //       );

  //     setFilterListSubCategory(newSubCategory);
  //   };

  const handleFilter = (value: string) => {
    const newSubCategories = [...subCategories].filter((subCategory) =>
      subCategory.category.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSubCategory(newSubCategories);
  };

  const handleEditCategory = (
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

    updateBrandCategory({
      brandCategoryId: singleBrandCategory?._id!,
      setBrandCategoryData,
      setOpen: setOpenEditBrandCategory,
      category,
      subCategory,
      name: capitalizeFirstLetters(name),
      categorySlug: configureSlug(categorySlug),
    });
  };

  useEffect(() => {
    if (singleBrandCategory) {
      const newbrandCategoryData = { ...initialBrandCategoryData };

      for (const key in newbrandCategoryData) {
        if (key in singleBrandCategory) {
          newbrandCategoryData[key as keyof BrandCategoryData] =
            singleBrandCategory[key as keyof BrandCategoryData].toLowerCase();
        }
      }
      setBrandCategoryData(newbrandCategoryData);
      handleFilter(singleBrandCategory.category.toLowerCase());
    }

    // eslint-disable-next-line
  }, [singleBrandCategory]);

  return (
    <ShowDialog
      openModal={openEditBrandCategory}
      handleClose={() => setOpenEditBrandCategory(false)}
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
              Update Brand Category
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setOpenEditBrandCategory(false)}>
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
          filteredSubCategory={filteredSubCategory}
          category={category}
          brandNameError={brandNameError}
          brandSlugError={brandSlugError}
          categoryNameError={categoryNameError}
          categorySlug={categorySlug}
          name={name}
          subCategory={subCategory}
          subCategoryError={subCategoryError}
          loadingRequestAction={loadingRequestAction}
          setOpen={setOpenEditBrandCategory}
          onClick={handleClick}
          onChange={handleChange}
          onSelect={handleSelectChange}
          onSubmit={handleEditCategory}
          onSelectChange={(event) => {
            handleSelectChange(event);
            const value = event.target.value as string;
            handleFilter(value);
          }}
          buttonTitle="Update Brand Category"
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default EditBrandCategory;
