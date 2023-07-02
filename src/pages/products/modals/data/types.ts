import { ProductTypes } from "src/services/products/ProductTypes";

export type InitialStateCheckedTypes = {
  allowProductSizes: boolean;
  allowProductWholesale: boolean;
  allowMeasurement: boolean;
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

export type InitialHighlightCheckedTypes = {
  inFeatured: boolean;
  inBestSellers: boolean;
  inPopular: boolean;
  inWeeklyOffer: boolean;
};

export type InitialHighlightStateTypes = {
  newPriceCodeOne: number;
  newPriceCodeTwo: number;
  newPriceCodeThree: number;
  newPriceCodeFour: number;
  minimumQuantity: number;
  inFeatured: boolean;
  inBestSellers: boolean;
  inPopular: boolean;
  inWeeklyOffer: boolean;
};

export type InitialHighlightPriceCodesTypes = {
  priceCode1: string;
  priceCode2: string;
  priceCode3: string;
  priceCode4: string;
  minimumQuantity: number;
};
