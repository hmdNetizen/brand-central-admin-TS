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

// export type ProductStateTypes = Pick<
//   ProductTypes,
//   | "productName"
//   | "SRP"
//   | "brandName"
//   | "category"
//   | "itemCode"
//   | "priceCode1"
//   | "priceCode2"
//   | "priceCode3"
//   | "priceCode4"
//   | "productDescription"
//   | "productMeasurement"
//   | "shippingCategory"
//   | "productStock"
//   | "productUPC"
//   | "units"
// >;

export type ProductStateTypes = {
  productName: string;
  SRP: string;
  brandName: string;
  category: string;
  subCategory: string;
  itemCode: string;
  priceCode1: string;
  priceCode2: string;
  priceCode3: string;
  priceCode4: string;
  productMeasurement: string;
  shippingCategory: string;
  productDescription: string;
  productStock: string;
  productUPC: string;
  units: string;
};

export type ThresholdStateTypes = Pick<ProductTypes, "threshold">;
