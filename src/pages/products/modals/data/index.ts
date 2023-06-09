import { nanoid } from "@reduxjs/toolkit";

export const initialState = {
  productName: "",
  productUPC: "",
  units: "",
  itemCode: "",
  category: "",
  subCategory: "",
  brandName: "",
  customBrandName: "",
  name: "",
  quantity: "",
  price: "",
  wholesaleQuantity: "",
  wholesaleDiscountPercentage: "",
  productStock: "",
  productDescription: "",
  productMeasurement: "",
  customMeasurement: "",
  priceCode1: "",
  priceCode2: "",
  priceCode3: "",
  priceCode4: "",
  SRP: "",
  shippingCategory: "",
  maximumQuantity: "",
};

export const initialStateChecked = {
  allowProductSizes: false,
  allowProductWholesale: false,
  allowMeasurement: false,
  isThresholdActive: false,
};

export const initialProductSize = [
  {
    _id: nanoid(),
    name: "",
    price: "",
    quantity: "",
  },
];

export const initialProductWholesale = [
  {
    _id: nanoid(),
    quantity: "",
    percentage: "",
  },
];
