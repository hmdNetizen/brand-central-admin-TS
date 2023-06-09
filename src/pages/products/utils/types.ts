import { SelectChangeEvent } from "@mui/material";
import React, { FormEvent } from "react";
import { SubCategoryReturnedPayload } from "src/services/categories/CategoryTypes";
import {
  PhotoGalleryTypes,
  ProductSizeTypes,
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
  isThresholdActive: boolean;
  maximumQuantity: string;
  maximumQuantityError: string;
  setMaximumQuantityError: React.Dispatch<React.SetStateAction<string>>;
  setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
  allowProductWholesale: boolean;
  allowProductSizes: boolean;
  productMeasurement: string;
  productMeasurementError: string;
  productSizeForm: ProductSizeTypes[];
  setProductSizeForm: React.Dispatch<React.SetStateAction<ProductSizeTypes[]>>;
  sizeQuantityError: string;
  sizeNameError: string;
  sizePriceError: string;
  wholesaleQuantityError: string;
  setWholesaleQuantityError: React.Dispatch<React.SetStateAction<string>>;
  allowMeasurement: boolean;
  customMeasurement: string;
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
  wholesaleForm: WholesaleTypes[];
  setWholesaleForm: React.Dispatch<React.SetStateAction<WholesaleTypes[]>>;
};

export type ProductSizeFormProps = {
  productSizeForm: ProductSizeTypes[];
  sizeNameError: string;
  sizeQuantityError: string;
  sizePriceError: string;
  setProductSizeForm: React.Dispatch<React.SetStateAction<ProductSizeTypes[]>>;
};
