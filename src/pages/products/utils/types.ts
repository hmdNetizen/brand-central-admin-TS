import { SelectChangeEvent } from "@mui/material";
import { FormEvent } from "react";
import { SubCategoryReturnedPayload } from "src/services/categories/CategoryTypes";
import { PhotoGalleryTypes } from "src/services/products/ProductTypes";

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
  productStock: number;
  productStockError: string;
  category: string;
  categoryError: string;
  subCategory: string;
  subCategoryError: string;
  brandName: string;
  brandNameError: string;
  customBrandName: string;
  priceCode1: number;
  priceCode1Error: string;
  priceCode2: number;
  priceCode2Error: string;
  priceCode3: number;
  priceCode3Error: string;
  priceCode4: number;
  priceCode4Error: string;
  SRP: number;
  SRPError: string;
  shippingCategory: string;
  shippingCategoryError: string;
  isThresholdActive: boolean;
  maximumQuantity: number;
  maximumQuantityError: string;
  setMaximumQuantityError: React.Dispatch<React.SetStateAction<string>>;
  setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
  wholesaleQuantity: number;
  allowProductWholesale: boolean;
  allowProductSizes: boolean;
  productMeasurement: string;
  productMeasurementError: string;
  name: string;
  quantity: number;
  price: number;
  sizeQuantityError: string;
  sizeNameError: string;
  sizePriceError: string;
  wholesaleQuantityError: string;
  allowMeasurement: boolean;
  customMeasurement: string;
  customMeasurementError: string;
  wholesaleDiscountPercentage: number;
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
  updatingProduct: boolean;
  setGalleryItemId: React.Dispatch<React.SetStateAction<string>>;
  galleryItemId: string;
};
