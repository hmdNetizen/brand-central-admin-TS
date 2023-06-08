import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ShowDialog from "src/utils/ShowDialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useActions } from "src/hooks/useActions";
import { capitalizeFirstLetters } from "src/lib/helpers";
import PhotoGallery from "components/products/PhotoGallery";
import { PhotoGalleryTypes } from "src/services/products/ProductTypes";
import EditProductForm from "../utils/EditProductForm";
import { initialState, initialStateChecked } from "./data";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const EditProduct = ({ openEditProduct, setOpenEditProduct }) => {
  const theme = useTheme();

  const singleProduct = useTypedSelector(
    (state) => state.products.singleProduct
  );
  const loadingProductAction = useTypedSelector(
    (state) => state.products.loadingProductAction
  );

  const subCategories = useTypedSelector(
    (state) => state.categories.subCategories
  );
  const brands = useTypedSelector((state) => state.brands.brands);

  const { uploadedFile } = useSelector((state) => state.common);

  const { uploadFile, updateProduct } = useActions();

  //   MEDIA QUERIES
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const [productDetails, setProductDetails] = useState(initialState);

  //   CHECKBOXES STATES
  const [optionChecked, setOptionChecked] = useState(initialStateChecked);

  const [openProductGallery, setOpenProductGallery] = useState(false);
  const [previews, setPreviews] = useState<PhotoGalleryTypes[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [galleryItemId, setGalleryItemId] = useState("");
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  // ERROR HANDLING STATES
  const [productNameError, setProductNameError] = useState("");
  const [productUPCError, setProductUPCError] = useState("");
  const [unitError, setUnitError] = useState("");
  const [itemCodeError, setItemCodeError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [brandNameError, setBrandNameError] = useState("");
  const [productStockError, setProductStockError] = useState("");
  const [sizeNameError, setSizeNameError] = useState("");
  const [sizeQuantityError, setSizeQuantityError] = useState("");
  const [sizePriceError, setSizePriceError] = useState("");
  const [wholesaleQuantityError, setWholesaleQuantityError] = useState("");
  const [productMeasurementError, setProductMeasurementError] = useState("");
  const [customMeasurementError, setCustomMeasurementError] = useState("");
  const [productImageError, setProductImageError] = useState("");
  const [priceCode1Error, setPriceCode1Error] = useState("");
  const [priceCode2Error, setPriceCode2Error] = useState("");
  const [priceCode3Error, setPriceCode3Error] = useState("");
  const [priceCode4Error, setPriceCode4Error] = useState("");
  const [SRPError, setSRPError] = useState("");
  const [maximumQuantityError, setMaximumQuantityError] = useState("");

  const [filteredSubCategory, setFilteredSubCategory] = useState(subCategories);

  const {
    productName,
    productUPC,
    units,
    itemCode,
    category,
    subCategory,
    brandName,
    customBrandName,
    name,
    quantity,
    price,
    wholesaleQuantity,
    wholesaleDiscountPercentage,
    productStock,
    productDescription,
    productMeasurement,
    customMeasurement,
    priceCode1,
    priceCode2,
    priceCode3,
    priceCode4,
    SRP,
    shippingCategory,
    maximumQuantity,
  } = productDetails;

  const {
    allowProductSizes,
    allowProductWholesale,
    allowMeasurement,
    isThresholdActive,
  } = optionChecked;

  const handleFilter = (value) => {
    const newSubCategories = [...subCategories].filter((subCategory) =>
      subCategory.category.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSubCategory(newSubCategories);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "productName":
        if (!value.trim()) {
          setProductNameError("Enter Product Name");
        } else {
          setProductNameError("");
        }
        break;
      case "productCode":
        if (!value.trim()) {
          setProductUPCError("Enter Product Code");
        } else {
          setProductUPCError("");
        }
        break;
      case "productUnit":
        if (!value.trim()) {
          setUnitError("Enter Product Unit");
        } else {
          setUnitError("");
        }
        break;
      case "itemCode":
        if (!value.trim()) {
          setItemCodeError("Enter Item Code for this product");
        } else {
          setItemCodeError("");
        }
        break;
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
      case "brandName":
        if (!value.trim()) {
          setBrandNameError("Please select a brand name");
        } else {
          setBrandNameError("");
        }
        break;
      case "productStock":
        if (!value.trim()) {
          setProductStockError("Enter product stock");
        } else {
          setProductStockError("");
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
      case "SRP":
        if (!value.trim()) {
          setSRPError("SRP value must be provided");
        } else {
          setSRPError("");
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
      default:
        setProductNameError("");
        setProductUPCError("");
        setUnitError("");
        setCategoryError("");
        setSubCategoryError("");
        setBrandNameError("");
        setProductStockError("");
        setPriceCode1Error("");
        setPriceCode2Error("");
        setPriceCode3Error("");
        setPriceCode4Error("");
        setSRPError("");
        setMaximumQuantityError("");
    }

    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;

    setOptionChecked({ ...optionChecked, [name]: checked });
  };

  const handleChangeProductImage = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    uploadFile({
      file,
    });
  };

  const handleUpdateProduct = (event) => {
    event.preventDefault();

    if (
      !productName.trim() &&
      !productUPC.trim() &&
      !units.trim() &&
      !itemCode.trim() &&
      !category.trim() &&
      !subCategory.trim() &&
      !brandName.trim() &&
      !productStock.toString().trim() &&
      !uploadedFile &&
      (!priceCode1 || !priceCode1.toString().trim()) &&
      (!priceCode2 || !priceCode2.toString().trim()) &&
      (!priceCode3 || !priceCode3.toString().trim()) &&
      (!priceCode4 || !priceCode4.toString().trim())
    ) {
      setProductNameError("Enter Product Name");
      setProductUPCError("Enter unique product code");
      setUnitError("Enter the unit of measurement");
      setItemCodeError("Enter Item Code for this product");
      setCategoryError("Please select a category");
      setSubCategoryError("Please select a subcategory");
      setBrandNameError("Please select a brand name");
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
      setProductUPCError("Enter unique product code");
      return;
    }

    if (!units.trim()) {
      setUnitError("Enter Product Unit");
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

    if (!brandName) {
      setBrandNameError("Please select a brand name");
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

    if (productStock.toString().trim() === "") {
      setProductStockError("Enter product stock");
      return;
    }

    if (SRP.toString().trim() === "") {
      setSRPError("SRP value must be provided");
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

    if (allowProductSizes) {
      if (!name.trim()) {
        setSizeNameError("Enter size name for product");
        return;
      }

      if (quantity.trim() === "") {
        setSizeQuantityError("Enter size quantity for product");
        return;
      }

      if (price.trim() === "") {
        setSizePriceError("Enter size price for product");
        return;
      }
    }

    if (allowProductWholesale) {
      if (wholesaleQuantity.trim() === "") {
        setWholesaleQuantityError("Enter wholesale quantity for product");
        return;
      }
    }

    if (allowMeasurement) {
      if (!productMeasurement) {
        setProductMeasurementError("Select a measurement for product");
        return;
      }

      if (productMeasurement === "Custom" && !customMeasurement.trim()) {
        setCustomMeasurementError("Enter a preferred measurement for product");
        return;
      }
    }

    updateProduct({
      setOpenEditProduct,
      productId: singleProduct._id,
      productName,
      productType: "Physical",
      productUPC,
      itemCode,
      units,
      category: category ? category : "N/A",
      subCategory: subCategory ? subCategory : "N/A",
      brandName: brandName === "Others" ? customBrandName : brandName,
      allowProductSizes,
      productSize: [
        { name },
        { quantity: quantity ? parseInt(quantity) : "" },
        { price: price ? parseFloat(price) : "" },
      ],
      allowMeasurement,
      productMeasurement:
        productMeasurement === "Custom"
          ? customMeasurement
          : productMeasurement,
      allowProductWholesale,
      productWholesale: [
        { quantity: wholesaleQuantity ? parseInt(wholesaleQuantity) : "" },
        {
          percentage: wholesaleDiscountPercentage
            ? parseFloat(wholesaleDiscountPercentage)
            : "",
        },
      ],
      productStock: parseInt(productStock),
      productDescription,
      shippingCategory: shippingCategory ? shippingCategory.toLowerCase() : "",
      threshold: {
        isThresholdActive,
        maximumQuantity:
          isThresholdActive && maximumQuantity ? Number(maximumQuantity) : 0,
      },
      featuredImage: uploadedFile.url,
      productGalleryImages:
        previews.length > 0
          ? previews
              .filter((preview) => preview.isUploaded)
              .map((previewItem) => previewItem.url)
          : [],
      priceCode1: priceCode1 ? parseFloat(priceCode1).toFixed(2) : 0,
      priceCode2: priceCode2 ? parseFloat(priceCode2).toFixed(2) : 0,
      priceCode3: priceCode3 ? parseFloat(priceCode3).toFixed(2) : 0,
      priceCode4: priceCode4 ? parseFloat(priceCode4).toFixed(2) : 0,
      SRP: SRP ? parseFloat(SRP).toFixed(2) : 0,
      hasImage: uploadedFile?.url ? true : false,
    });
  };

  useEffect(() => {
    if (Object.keys(singleProduct).length > 0) {
      let newProductDetails = { ...initialState };
      let newOptionChecked = { ...initialStateChecked };
      const { units, UM, productName } = singleProduct;
      for (const key in singleProduct) {
        if (key in productDetails) {
          newProductDetails[key] = singleProduct[key];

          if (key === "category") {
            newProductDetails[key] = singleProduct.category.toLowerCase();
          }

          if (key === "subCategory") {
            newProductDetails[key] = singleProduct.subCategory.toLowerCase();
          }

          if (
            key === "brandName" &&
            brands
              .map((brand) => capitalizeFirstLetters(brand.name))
              .indexOf(capitalizeFirstLetters(singleProduct.brandName)) === -1
          ) {
            newProductDetails[key] = "Others";
            newProductDetails["customBrandName"] = singleProduct.brandName;
          }

          setProductDetails(newProductDetails);
        } else {
          setProductDetails({
            ...newProductDetails,
            units: units ? units : UM ? UM : "",
            productName: productName,
          });
        }
        if (key in optionChecked) {
          newOptionChecked[key] = singleProduct[key];
          setOptionChecked(newOptionChecked);
        }

        // setProductDetails({
        //   ...newProductDetails,
        //   maximumQuantity: singleProduct["threshold"].maximumQuantity,
        // });

        optionChecked.isThresholdActive =
          singleProduct["threshold"].isThresholdActive;
        newProductDetails.maximumQuantity =
          singleProduct["threshold"].maximumQuantity;

        setOptionChecked(optionChecked);
        setProductDetails(newProductDetails);
      }

      setFeaturedImage(singleProduct.featuredImage);
      setGalleryImages(singleProduct.productGalleryImages);

      //   This is for populating the sub category when the component mounts.
      handleFilter(singleProduct.category);
    }

    // CLEAR ALL ERRORS WHEN COMPONENT MOUNTS
    setProductNameError("");
    setProductUPCError("");
    setUnitError("");
    setCategoryError("");
    setSubCategoryError("");
    setBrandNameError("");
    setProductStockError("");
    setPriceCode1Error("");
    setPriceCode2Error("");
    setPriceCode3Error("");
    setPriceCode4Error("");
    setSRPError("");

    // eslint-disable-next-line
  }, [singleProduct]);

  const handleClose = () => {
    setOpenEditProduct((prev) => !prev);
  };

  return (
    <ShowDialog
      openModal={openEditProduct}
      handleClose={handleClose}
      width={matchesXS ? "100%" : matchesSM ? "85%" : 800}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.contentContainer}
      >
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            p: "1rem 2rem",
            background: "#f7f7f7",
          }}
        >
          <Grid item>
            <Typography variant="h4" style={{ marginBottom: 0 }}>
              Edit Product
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <EditProductForm
          SRP={SRP}
          SRPError={SRPError}
          allowMeasurement={allowMeasurement}
          allowProductSizes={allowProductSizes}
          allowProductWholesale={allowProductWholesale}
          brandName={brandName}
          brandNameError={brandNameError}
          category={category}
          categoryError={categoryError}
          customBrandName={customBrandName}
          customMeasurement={customMeasurement}
          customMeasurementError={customMeasurementError}
          filteredSubCategory={filteredSubCategory}
          galleryItemId={galleryItemId}
          imagePreview={imagePreview}
          isThresholdActive={isThresholdActive}
          itemCode={itemCode}
          itemCodeError={itemCodeError}
          maximumQuantity={maximumQuantity}
          maximumQuantityError={maximumQuantityError}
          name={name}
          onClose={handleClose}
          onInputChange={handleChange}
          onSubmit={handleUpdateProduct}
          onCheck={handleChecked}
          previews={previews}
          price={price}
          priceCode1={priceCode1}
          priceCode2={priceCode2}
          priceCode3={priceCode3}
          priceCode4={priceCode4}
          priceCode1Error={priceCode1Error}
          priceCode2Error={priceCode2Error}
          priceCode3Error={priceCode3Error}
          priceCode4Error={priceCode4Error}
          productDescription={productDescription}
          productImageError={productImageError}
          productName={productName}
          productNameError={productNameError}
          productMeasurement={productMeasurement}
          productMeasurementError={productMeasurementError}
          productStock={productStock}
          productStockError={productStockError}
          productUPC={productUPC}
          productUPCError={productUPCError}
          quantity={quantity}
          selectedFile={selectedFile}
          setFilteredSubCategory={setFilteredSubCategory}
          setGalleryItemId={setGalleryItemId}
          setImagePreview={setImagePreview}
          setMaximumQuantityError={setMaximumQuantityError}
          setOpenProductGallery={setOpenProductGallery}
          setPreviews={setPreviews}
          setProductImageError={setProductImageError}
          setSelectedFile={setSelectedFile}
          shippingCategory={shippingCategory}
          sizeNameError={sizeNameError}
          sizePriceError={sizePriceError}
          sizeQuantityError={sizeQuantityError}
          subCategory={subCategory}
          subCategoryError={subCategoryError}
          units={units}
          unitsError={unitError}
          wholesaleDiscountPercentage={wholesaleDiscountPercentage}
          wholesaleQuantity={wholesaleQuantity}
          wholesaleQuantityError={wholesaleQuantityError}
        />

        <PhotoGallery
          openProductGallery={openProductGallery}
          setOpenProductGallery={setOpenProductGallery}
          previews={previews}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setPreviews={setPreviews}
          setGalleryItemId={setGalleryItemId}
          galleryItemId={galleryItemId}
          onClose={handleClose}
        />
      </Grid>
    </ShowDialog>
  );
};

export default EditProduct;
