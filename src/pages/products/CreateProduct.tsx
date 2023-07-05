import React, { useState, useEffect, FormEvent } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme, styled } from "@mui/material/styles";
import { capitalizeFirstLetters } from "src/lib/helpers";
import ShowDialog from "src/utils/ShowDialog";
import { useSelector } from "react-redux";
import { useActions } from "src/hooks/useActions";
import PhotoGallery from "src/components/products/PhotoGallery";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import CreateProductLeftForm from "./utils/CreateProductLeftForm";
import { SelectChangeEvent } from "@mui/material";
import { ProductSizeDataType, WholesaleDataType } from "./utils/types";
import { initialProductSize, initialProductWholesale } from "./modals/data";
import CreateProductRightForm from "./utils/CreateProductRightForm";

const Container = styled(Grid)(({ theme }) => ({
  padding: "2rem 3rem",

  [theme.breakpoints.only("xs")]: {
    padding: "5rem 1.5rem",
  },
}));

// const useStyles = makeStyles((theme) => ({
//   uploadError: {
//     fontSize: "1.25rem",
//     color: theme.palette.error.main,
//     fontFamily: "Open Sans, Roboto",
//   },
// }));

const CreateProduct = () => {
  useTitle("Admin : Create a new product");
  // const classes = useStyles();
  const theme = useTheme();

  const [productDetails, setProductDetails] = useState({
    productName: "",
    productUPC: "",
    units: "",
    itemCode: "",
    category: "",
    subCategory: "",
    productBrand: "",
    customBrandName: "",
    shippingTime: "",
    productStock: 0,
    productDescription: "",
    productMeasurement: "",
    customMeasurement: "",
    priceCode1: 0,
    priceCode2: 0,
    priceCode3: 0,
    priceCode4: 0,
    srpPrice: 0,
    shippingCategory: "",
    maximumQuantity: 0,
  });

  const [optionChecked, setOptionChecked] = useState({
    shippingTimeChecked: false,
    sizesChecked: false,
    wholesaleChecked: false,
    measurementChecked: false,
    isThresholdActive: false,
  });

  const [productSizeForm, setProductSizeForm] =
    useState<ProductSizeDataType>(initialProductSize);
  const [wholesaleForm, setWholesaleForm] = useState<WholesaleDataType>(
    initialProductWholesale
  );
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  // ERROR HANDLING STATES
  const [productNameError, setProductNameError] = useState("");
  const [productUPCError, setProductUPCError] = useState("");
  const [unitsError, setUnitsError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [productBrandError, setProductBrandError] = useState("");
  const [productStockError, setProductStockError] = useState("");
  const [customBrandNameError, setCustomBrandNameError] = useState("");
  const [shippingTimeError, setShippingTimeError] = useState("");
  const [sizeNameError, setSizeNameError] = useState("");
  const [sizeQuantityError, setSizeQuantityError] = useState("");
  const [sizePriceError, setSizePriceError] = useState("");
  const [wholesaleQuantityError, setWholesaleQuantityError] = useState("");
  const [
    wholesalePercentageDiscountError,
    setWholesalePercentageDiscountError,
  ] = useState("");
  const [productMeasurementError, setProductMeasurementError] = useState("");
  const [customMeasurementError, setCustomMeasurementError] = useState("");
  const [productImageError, setProductImageError] = useState("");
  const [priceCode1Error, setPriceCode1Error] = useState("");
  const [priceCode2Error, setPriceCode2Error] = useState("");
  const [priceCode3Error, setPriceCode3Error] = useState("");
  const [priceCode4Error, setPriceCode4Error] = useState("");
  const [SRPError, setSRPError] = useState("");
  const [itemCodeError, setItemCodeError] = useState("");
  const [maximumQuantityError, setMaximumQuantityError] = useState("");

  const { uploadedFile, uploadedFiles } = useSelector((state) => state.common);

  const categories = useTypedSelector((state) => state.categories.categories);
  const subCategories = useTypedSelector(
    (state) => state.categories.subCategories
  );
  const brands = useTypedSelector((state) => state.brands.brandsList);

  const [openGallery, setOpenGallery] = useState(false);
  const [filteredSubCategory, setFilteredSubCategory] = useState(subCategories);

  const { loadingProducts, productSuccessMessage, error } = useSelector(
    (state) => state.products
  );

  const {
    uploadFile,
    createProduct,
    clearProductMessages,
    clearUploadedImages,
    getAllCategories,
    getAllSubcategories,
    fetchAllBrands,
  } = useActions();

  // BREAKPOINTS DEFINITION
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const {
    productName,
    productUPC,
    units,
    itemCode,
    category,
    subCategory,
    productBrand,
    customBrandName,
    shippingTime,
    productStock,
    productDescription,
    productMeasurement,
    customMeasurement,
    priceCode1,
    priceCode2,
    priceCode3,
    priceCode4,
    srpPrice,
    shippingCategory,
    maximumQuantity,
  } = productDetails;

  const {
    shippingTimeChecked,
    sizesChecked,
    wholesaleChecked,
    measurementChecked,
    isThresholdActive,
  } = optionChecked;

  const handleFilter = (value: string) => {
    const newSubCategories = [...subCategories].filter((subCategory) =>
      subCategory.category.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSubCategory(newSubCategories);
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;

    setOptionChecked((prev) => ({ ...prev, [name]: checked }));
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

  const handleFormSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();

    if (
      !productName.trim() &&
      !productUPC.trim() &&
      !units.trim() &&
      !itemCode.trim() &&
      !category.trim() &&
      !subCategory.trim() &&
      !productBrand.trim() &&
      productStock.toString().trim() === "" &&
      !uploadedFile &&
      priceCode1.toString().trim() === "" &&
      priceCode2.toString().trim() === "" &&
      priceCode3.toString().trim() === "" &&
      priceCode4.toString().trim() === "" &&
      srpPrice.toString().trim() === ""
    ) {
      setProductNameError("Enter Product Name");
      setProductUPCError("Enter unique product code");
      setUnitsError("Enter the unit of measurement");
      setItemCodeError("Enter Item Code for this product");
      setCategoryError("Please select a category");
      setSubCategoryError("Please select a subcategory");
      setProductBrandError("Please select a brand name");
      setProductStockError("Enter product stock");
      setProductImageError("Add a photo for this product");
      setPriceCode1Error("Price code 1 must be provided");
      setPriceCode2Error("Price code 2 must be provided");
      setPriceCode3Error("Price code 3 must be provided");
      setPriceCode4Error("Price code 4 must be provided");
      setSRPError("SRP value must be provided");
      return;
    }

    if (!productName.trim()) {
      setProductNameError("Enter Product Name");
      return;
    }

    if (!productUPC.trim()) {
      setProductUPCError("Enter Product Code");
      return;
    }

    if (!units.trim()) {
      setUnitsError("Enter Product Unit");
      return;
    }

    if (!itemCode.trim()) {
      setItemCodeError("Enter Item Code for this product");
      return;
    }

    if (!category) {
      setCategoryError("Please select a category");
      return;
    }

    if (!subCategory) {
      setSubCategoryError("Please select a subcategory");
      return;
    }

    if (!productBrand) {
      setProductBrandError("Please select a brand name");
      return;
    }

    if (productBrand === "Others" && !customBrandName.trim()) {
      setCustomBrandNameError("Enter specific brand name");
      return;
    }

    if (shippingTimeChecked && !shippingTime.trim()) {
      setShippingTimeError("Please enter an estimated shipping time");
      return;
    }

    // if (sizesChecked) {
    //   if (!sizeName.trim()) {
    //     setSizeNameError("Enter size name for product");
    //     return;
    //   }

    //   if (!sizeQuantity.trim()) {
    //     setSizeQuantityError("Enter size quantity for product");
    //     return;
    //   }

    //   if (!sizePrice.trim()) {
    //     setSizePriceError("Enter size price for product");
    //     return;
    //   }
    // }

    // if (wholesaleChecked) {
    //   if (!wholesaleQuantity.trim()) {
    //     setWholesaleQuantityError("Enter wholesale quantity for product");
    //     return;
    //   }

    //   if(!wholesaleDiscountPercentage) {
    //     setWholesaleDiscountPercentageError("Enter wholesale discount for product");
    //   return;
    //   }
    // }

    if (productStock.toString().trim() === "") {
      setProductStockError("Enter product stock");
      return;
    }

    if (isThresholdActive) {
      if (!Number(maximumQuantity)) {
        setMaximumQuantityError("Enter a valid maximum quantity");
        return;
      } else if (units === "EA" && Number(maximumQuantity) % 6 !== 0) {
        setMaximumQuantityError("Maximum Quantity should be in multiples of 6");
        return;
      }
    }

    if (measurementChecked) {
      if (!productMeasurement) {
        setProductMeasurementError("Select a measurement for product");
        return;
      }

      if (productMeasurement === "Custom" && !customMeasurement.trim()) {
        setCustomMeasurementError("Enter a preferred measurement for product");
        return;
      }
    }

    if (!uploadedFile) {
      setProductImageError("Add a photo for this product");
      return;
    }

    if (priceCode1.toString().trim() === "") {
      setPriceCode1Error("Price code 1 must be provided");
      return;
    }

    if (priceCode2.toString().trim() === "") {
      setPriceCode2Error("Price code 2 must be provided");
      return;
    }

    if (priceCode3.toString().trim() === "") {
      setPriceCode3Error("Price code 3 must be provided");
      return;
    }

    if (priceCode4.toString().trim() === "") {
      setPriceCode4Error("Price code 4 must be provided");
      return;
    }

    if (srpPrice.toString().trim() === "") {
      setSRPError("SRP value must be provided");
      return;
    }

    createProduct({
      setProductDetails,
      setOptionChecked,
      productName,
      productType: "Physical",
      productUPC: productUPC,
      itemCode,
      units: units,
      category: capitalizeFirstLetters(category),
      subCategory: capitalizeFirstLetters(subCategory),
      brandName:
        productBrand === "Others"
          ? capitalizeFirstLetters(customBrandName)
          : capitalizeFirstLetters(productBrand),
      allowEstimatedShippingTime: shippingTimeChecked,
      estimatedShippingTime: shippingTime,
      shippingCategory: shippingCategory ? shippingCategory.toLowerCase() : "",
      allowProductSizes: sizesChecked,
      // productSize: [
      //   { name: sizeName },
      //   { quantity: sizeQuantity ? parseInt(sizeQuantity) : "" },
      //   { price: sizePrice ? parseFloat(sizePrice) : "" },
      // ],
      allowMeasurement: measurementChecked,
      productMeasurement:
        productMeasurement === "Custom"
          ? customMeasurement
          : productMeasurement,
      allowProductWholesale: wholesaleChecked,
      // productWholesale: [
      //   { quantity: wholesaleQuantity ? parseInt(wholesaleQuantity) : "" },
      //   {
      //     percentage: wholesaleDiscountPercentage
      //       ? parseFloat(wholesaleDiscountPercentage)
      //       : "",
      //   },
      // ],
      productStock,
      productDescription,
      threshold: {
        isThresholdActive,
        maximumQuantity:
          isThresholdActive && maximumQuantity ? Number(maximumQuantity) : 0,
      },
      featuredImage: uploadedFile.url,
      hasImage: uploadedFile.url ? true : false,
      productGalleryImages:
        uploadedFiles.length > 0
          ? uploadedFiles.map((uploaded) => uploaded.url)
          : [],
      priceCode1,
      priceCode2,
      priceCode3,
      priceCode4,
      SRP: srpPrice,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case "productName":
        if (!value.trim()) {
          setProductNameError("Enter Product Name");
        } else {
          setProductNameError("");
        }
        break;
      case "productUPC":
        if (!value.trim()) {
          setProductUPCError("Enter Product Code");
        } else {
          setProductUPCError("");
        }
        break;
      case "units":
        if (!value.trim()) {
          setUnitsError("Enter Product Unit");
        } else {
          setUnitsError("");
        }
        break;
      case "itemCode":
        if (!value.trim()) {
          setItemCodeError("Enter Item Code for this product");
        } else {
          setItemCodeError("");
        }
        break;
      case "productStock":
        if (!value.trim()) {
          setProductStockError("Enter product stock");
        } else {
          setProductStockError("");
        }
        break;
      case "maximumQuantity":
        if (isThresholdActive && !value.trim()) {
          setMaximumQuantityError("Maximum Quantity Threshold cannot be empty");
        } else if (!Number(value)) {
          setMaximumQuantityError("Enter a valid maximum Quantity");
        } else {
          setMaximumQuantityError("");
        }
        break;
      case "priceCode1":
        if (!value.trim()) {
          setPriceCode1Error("Price code 1 must be provided");
        } else {
          setPriceCode1Error("");
        }
        break;
      case "priceCode2":
        if (!value.trim()) {
          setPriceCode2Error("Price code 2 must be provided");
        } else {
          setPriceCode2Error("");
        }
        break;
      case "priceCode3":
        if (!value.trim()) {
          setPriceCode3Error("Price code 3 must be provided");
        } else {
          setPriceCode3Error("");
        }
        break;
      case "priceCode4":
        if (!value.trim()) {
          setPriceCode4Error("Price code 4 must be provided");
        } else {
          setPriceCode4Error("");
        }
        break;
      case "srpPrice":
        if (!value.trim()) {
          setSRPError("SRP value must be provided");
        } else {
          setSRPError("");
        }
        break;
      default:
        setProductNameError("");
        setProductUPCError("");
        setUnitsError("");
        setCategoryError("");
        setSubCategoryError("");
        setProductBrandError("");
        setProductStockError("");
        setPriceCode1Error("");
        setPriceCode2Error("");
        setPriceCode3Error("");
        setPriceCode4Error("");
        setMaximumQuantityError("");
    }

    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const selectEvent = event as React.ChangeEvent<HTMLInputElement>;
    const { name, value } = selectEvent.target;

    switch (name) {
      case "category":
        if (!value.trim()) {
          setCategoryError("Please select a category");
        } else {
          setCategoryError("");
        }
        break;
      case "subCategory":
        if (!value.trim()) {
          setSubCategoryError("Please select a subcategory");
        } else {
          setSubCategoryError("");
        }
        break;
      case "productBrand":
        if (!value.trim()) {
          setProductBrandError("Please select a brand name");
        } else {
          setProductBrandError("");
        }
        break;

      default:
        setCategoryError("");
        setSubCategoryError("");
        setProductBrandError("");
    }

    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseGallery = () => {
    setOpenGallery(false);
  };

  useEffect(() => {
    // clearProductMessages();
    // clearUploadedImages();
    getAllCategories();
    getAllSubcategories();
    fetchAllBrands();

    // eslint-disable-next-line
  }, []);

  return (
    <Container container direction="column">
      <Grid item container pb={2} justifyContent="center">
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Add New Product
        </Typography>
      </Grid>
      <Grid
        item
        container
        style={{ gap: "4rem" }}
        component="form"
        onSubmit={handleFormSubmit}
        direction={matchesSM ? "column" : "row"}
      >
        {/* Left form goes here */}
        <CreateProductLeftForm
          category={category}
          categoryError={categoryError}
          customBrandName={customBrandName}
          customBrandNameError={customBrandNameError}
          customMeasurement={customMeasurement}
          customMeasurementError={customMeasurementError}
          filteredSubCategory={filteredSubCategory}
          isThresholdActive={isThresholdActive}
          itemCode={itemCode}
          itemCodeError={itemCodeError}
          maximumQuantity={maximumQuantity}
          maximumQuantityError={maximumQuantityError}
          measurementChecked={measurementChecked}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          productBrand={productBrand}
          productBrandError={productBrandError}
          productUPC={productUPC}
          productUPCError={productUPCError}
          productDescription={productDescription}
          productMeasurement={productMeasurement}
          productName={productName}
          productMeasurementError={productMeasurementError}
          productNameError={productNameError}
          productStockError={productStockError}
          productStock={productStock}
          setFilteredSubCategory={setFilteredSubCategory}
          setMaximumQuantityError={setMaximumQuantityError}
          setWholesalePercentageDiscountError={
            setWholesalePercentageDiscountError
          }
          setWholesaleQuantityError={setWholesaleQuantityError}
          shippingCategory={shippingCategory}
          shippingTime={shippingTime}
          shippingTimeChecked={shippingTimeChecked}
          shippingTimeError={shippingTimeError}
          sizeNameError={sizeNameError}
          sizePriceError={sizePriceError}
          sizeQuantityError={sizeQuantityError}
          sizesChecked={sizesChecked}
          subCategory={subCategory}
          subCategoryError={subCategoryError}
          units={units}
          unitsError={unitsError}
          wholesalePercentageDiscountError={wholesalePercentageDiscountError}
          wholesaleQuantityError={wholesaleQuantityError}
          onChecked={handleChecked}
          wholesaleChecked={wholesaleChecked}
          productSizeForm={productSizeForm}
          setProductSizeForm={setProductSizeForm}
          wholesaleForm={wholesaleForm}
          setWholesaleForm={setWholesaleForm}
        />

        {/* Right form goes here */}
        <CreateProductRightForm
          onChange={handleChange}
          SRPError={SRPError}
          srpPrice={srpPrice}
          priceCode1={priceCode1}
          priceCode2={priceCode2}
          priceCode3={priceCode3}
          priceCode4={priceCode4}
          priceCode1Error={priceCode1Error}
          priceCode2Error={priceCode2Error}
          priceCode3Error={priceCode3Error}
          priceCode4Error={priceCode4Error}
          imagePreview={imagePreview}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setImagePreview={setImagePreview}
          setProductImageError={setProductImageError}
        />
      </Grid>
      {/* <ShowDialog
        openModal={openGallery}
        handleClose={handleCloseGallery}
        width={700}
      >
        <PhotoGallery setOpenProductGallery={setOpenGallery} />
      </ShowDialog> */}
    </Container>
  );
};

export default CreateProduct;
