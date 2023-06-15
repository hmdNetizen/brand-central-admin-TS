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
};

export const initialStateChecked = {
  allowProductSizes: false,
  allowProductWholesale: false,
  allowMeasurement: false,
  isThresholdActive: false,
};

export const initialProductSize = {
  productSize: [
    {
      _id: nanoid(),
      name: "",
      price: Number(""),
      quantity: Number(""),
    },
  ],
};

export const initialProductWholesale = {
  productWholesale: [
    {
      _id: nanoid(),
      quantity: Number(""),
      percentage: Number(""),
    },
  ],
};

export const initialThresholdState = {
  threshold: {
    isThresholdActive: false,
    maximumQuantity: 0,
  },
};
