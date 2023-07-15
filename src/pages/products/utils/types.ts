import { SelectChangeEvent } from "@mui/material";
import React, { FormEvent } from "react";
import { SubCategoryReturnedPayload } from "src/services/categories/CategoryTypes";
import {
  PhotoGalleryTypes,
  ProductSizeTypes,
  ThresholdTypes,
  WholesaleTypes,
} from "src/services/products/ProductTypes";

export type ProductFormProps = {
  onSubmit: (event: FormEvent<Element>) => void;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (event: SelectChangeEvent<unknown>) => void;
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  productName: string;
  productNameError: string;
  units: string;
  unitsError: string;
  productUPC: string;
  productUPCError: string;
  itemCode: string;
  itemCodeError: string;
  productStock: string;
  productStockError: string;
  category: string;
  categoryError: string;
  subCategory: string;
  subCategoryError: string;
  brandName: string;
  brandNameError: string;
  customBrandName: string;
  setCustomBrandName: React.Dispatch<React.SetStateAction<string>>;
  priceCode1: string;
  priceCode1Error: string;
  priceCode2: string;
  priceCode2Error: string;
  priceCode3: string;
  priceCode3Error: string;
  priceCode4: string;
  priceCode4Error: string;
  SRP: string;
  SRPError: string;
  shippingCategory: string;
  maximumQuantityError: string;
  setMaximumQuantityError: React.Dispatch<React.SetStateAction<string>>;
  setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
  allowProductWholesale: boolean;
  allowProductSizes: boolean;
  productMeasurement: string;
  productMeasurementError: string;
  productSizeForm: ProductSizeDataType;
  setProductSizeForm: React.Dispatch<React.SetStateAction<ProductSizeDataType>>;
  sizeQuantityError: string;
  sizeNameError: string;
  sizePriceError: string;
  wholesaleQuantityError: string;
  setWholesaleQuantityError: React.Dispatch<React.SetStateAction<string>>;
  allowMeasurement: boolean;
  customMeasurement: string;
  setCustomMeasurement: React.Dispatch<React.SetStateAction<string>>;
  customMeasurementError: string;
  wholesalePercentageDiscountError: string;
  setWholesalePercentageDiscountError: React.Dispatch<
    React.SetStateAction<string>
  >;
  productDescription: string;
  filteredSubCategory: SubCategoryReturnedPayload[];
  setFilteredSubCategory: React.Dispatch<
    React.SetStateAction<SubCategoryReturnedPayload[]>
  >;
  previews: PhotoGalleryTypes[];
  setPreviews: React.Dispatch<React.SetStateAction<PhotoGalleryTypes[]>>;
  imagePreview: string | undefined;
  setImagePreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  productImageError: string;
  setProductImageError: React.Dispatch<React.SetStateAction<string>>;
  uploadingImage: boolean;
  loadingProductAction: boolean;
  setGalleryItemId: React.Dispatch<React.SetStateAction<string>>;
  galleryItemId: string;
  wholesaleForm: WholesaleDataType;
  setWholesaleForm: React.Dispatch<React.SetStateAction<WholesaleDataType>>;
  thresholdData: ThresholdDataType;
  setThresholdData: React.Dispatch<React.SetStateAction<ThresholdDataType>>;
};

export type ProductSizeFormProps = {
  sizeNameError: string;
  sizeQuantityError: string;
  sizePriceError: string;
  productSizeForm: ProductSizeDataType;
  setProductSizeForm: React.Dispatch<React.SetStateAction<ProductSizeDataType>>;
};

export type ThresholdDataType = {
  threshold: ThresholdTypes;
};

export type WholesaleDataType = {
  productWholesale: WholesaleTypes[];
};

export type ProductSizeDataType = {
  productSize: ProductSizeTypes[];
};

export type HighlightFormProps = {
  onSubmit: (event: React.FormEvent<Element>) => void;
  onChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  inFeatured: boolean;
  inPopular: boolean;
  inBestSellers: boolean;
  inWeeklyOffer: boolean;
  loading: boolean;
  newPriceCodeOne: number;
  newPriceCodeTwo: number;
  newPriceCodeThree: number;
  newPriceCodeFour: number;
  priceCode1Error: string;
  minimumQuantity: number;
  priceCode2Error: string;
  priceCode3Error: string;
  priceCode4Error: string;
  minQuantityError: string;
};

export type ProductLeftFormProps = {
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (event: SelectChangeEvent<unknown>) => void;
  onChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFilteredSubCategory: React.Dispatch<
    React.SetStateAction<SubCategoryReturnedPayload[]>
  >;
  filteredSubCategory: SubCategoryReturnedPayload[];
  productName: string;
  productNameError: string;
  productStock: number;
  productStockError: string;
  productUPC: string;
  productUPCError: string;
  itemCode: string;
  itemCodeError: string;
  units: string;
  unitsError: string;
  category: string;
  categoryError: string;
  subCategory: string;
  subCategoryError: string;
  productBrand: string;
  productBrandError: string;
  customBrandName: string;
  customBrandNameError: string;
  shippingTimeChecked: boolean;
  shippingTime: string;
  shippingTimeError: string;
  sizesChecked: boolean;
  sizeNameError: string;
  sizePriceError: string;
  sizeQuantityError: string;
  productSizeForm: ProductSizeDataType;
  setProductSizeForm: React.Dispatch<React.SetStateAction<ProductSizeDataType>>;
  wholesaleChecked: boolean;
  wholesaleQuantityError: string;
  setWholesaleQuantityError: React.Dispatch<React.SetStateAction<string>>;
  wholesalePercentageDiscountError: string;
  setWholesalePercentageDiscountError: React.Dispatch<
    React.SetStateAction<string>
  >;
  wholesaleForm: WholesaleDataType;
  setWholesaleForm: React.Dispatch<React.SetStateAction<WholesaleDataType>>;
  isThresholdActive: boolean;
  setMaximumQuantityError: React.Dispatch<React.SetStateAction<string>>;
  maximumQuantityError: string;
  maximumQuantity: number;
  shippingCategory: string;
  measurementChecked: boolean;
  productMeasurement: string;
  productMeasurementError: string;
  customMeasurement: string;
  customMeasurementError: string;
  productDescription: string;
  loading: boolean;
  error: string | null;
  errors: { param: string; msg: string }[] | null;
  productSuccessMessage: string;
};

export type ProductRightFormProps = {
  setOpenGallery: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  priceCode1: number;
  priceCode1Error: string;
  priceCode2: number;
  priceCode2Error: string;
  priceCode3: number;
  priceCode3Error: string;
  priceCode4: number;
  priceCode4Error: string;
  srpPrice: number;
  SRPError: string;
  loading: boolean;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  imagePreview: string | undefined;
  setImagePreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  setProductImageError: React.Dispatch<React.SetStateAction<string>>;
};
