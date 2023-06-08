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
  name: string;
  quantity: string | number;
  price: string | number;
  wholesaleQuantity: string | number;
  wholesaleDiscountPercentage: "";
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
  maximumQuantity: "";
};
