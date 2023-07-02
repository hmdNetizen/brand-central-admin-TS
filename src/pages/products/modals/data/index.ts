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

export const initialHighlightState = {
  newPriceCodeOne: 0,
  newPriceCodeTwo: 0,
  newPriceCodeThree: 0,
  newPriceCodeFour: 0,
  minimumQuantity: 0,
  inFeatured: false,
  inBestSellers: false,
  inPopular: false,
  inWeeklyOffer: false,
};

export const initialHighlightCheckedState = {
  inFeatured: false,
  inBestSellers: false,
  inPopular: false,
  inWeeklyOffer: false,
};

export const initialHighlightPriceCodes = {
  priceCode1: "",
  priceCode2: "",
  priceCode3: "",
  priceCode4: "",
  minimumQuantity: 0,
};
