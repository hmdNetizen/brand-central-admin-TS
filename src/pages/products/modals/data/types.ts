import { ProductTypes } from "src/services/products/ProductTypes";

export type InitialStateCheckedTypes = {
  allowProductSizes: boolean;
  allowProductWholesale: boolean;
  allowMeasurement: boolean;
  isThresholdActive: boolean;
};

export type InitialStateTypes = {
  productName: string;
  productUPC: string;
  units: string;
  itemCode: string;
  category: string;
  subCategory: string;
  brandName: string;
  customBrandName: string;
  productStock: "";
  productDescription: "";
  productMeasurement: "";
  customMeasurement: "";
  priceCode1: "";
  priceCode2: "";
  priceCode3: "";
  priceCode4: "";
  SRP: "";
  shippingCategory: "";
};

export type ProductStateTypes = Pick<
  ProductTypes,
  | "productName"
  | "SRP"
  | "brandName"
  | "category"
  | "itemCode"
  | "priceCode1"
  | "priceCode2"
  | "priceCode3"
  | "priceCode4"
  | "productDescription"
  | "productMeasurement"
  | "shippingCategory"
  | "productStock"
  | "productUPC"
  | "units"
>;

export type ThresholdStateTypes = Pick<ProductTypes, "threshold">;
