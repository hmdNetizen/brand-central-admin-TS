import React from "react";

type ProductHighlightTypes = {
  inFeatured: boolean;
  inBestSellers: boolean;
  inPopular: boolean;
  inWeeklyOffer: boolean;
  newPriceCodeOne: number;
  newPriceCodeTwo: number;
  newPriceCodeThree: number;
  newPriceCodeFour: number;
  minimumQuantity: number;
};

export type UserWishListTypes = {
  userId: {
    _id: string;
    companyName: string;
    companyEmail: string;
  };
  createdAt: string;
  updatedAt: string;
  isNotified: boolean;
  _id: string;
};

export type PhotoGalleryTypes = {
  id: string;
  url: string;
  file?: File;
  isUploaded?: boolean;
};

export type ThresholdTypes = {
  isThresholdActive: boolean;
  maximumQuantity: number;
};

export type WholesaleTypes = {
  quantity: number;
  percentage: number;
  _id: string;
};

export type ProductSizeTypes = {
  name: string;
  quantity: number;
  price: number;
  _id: string;
};

export type ProductTypes = {
  highlight: ProductHighlightTypes;
  threshold: ThresholdTypes;
  _id: string;
  productName: string;
  productDescription: string;
  productType: string;
  itemCode: string;
  productUPC: string;
  units: string;
  category: string;
  subCategory: string;
  allowEstimatedShippingTime: boolean;
  allowProductSizes: boolean;
  productSize: ProductSizeTypes[];
  allowProductWholesale: boolean;
  productWholesale: WholesaleTypes[];
  allowMeasurement: boolean;
  productMeasurement: string;
  productStock: number | string;
  featuredImage: string;
  hasImage: boolean;
  productGalleryImages: string[];
  priceCode1: number | string;
  priceCode2: number | string;
  priceCode3: number | string;
  priceCode4: number | string;
  SRP: number | string;
  brandName: string;
  productStatus: boolean;
  productInCatalog: boolean;
  createdAt: string;
  updatedAt: string;
  shippingCategory: string;
  testList: {
    userId: string[];
  };
  userWishList: UserWishListTypes[];
};

export type ProductBulkUpdateRequestPayload = Pick<
  ProductTypes,
  | "brandName"
  | "category"
  | "itemCode"
  | "priceCode1"
  | "priceCode2"
  | "priceCode3"
  | "priceCode4"
  | "productDescription"
  | "productName"
  | "productStock"
  | "subCategory"
  | "units"
  | "SRP"
  | "productType"
  | "productUPC"
>;

export type ProductRequestPayloadTypes<T> = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
  file: string | File;
  dataset: T;
};

type WholesaleExcerpt = Pick<WholesaleTypes, "percentage" | "quantity">;
type ProductSizeExcerpt = Pick<ProductSizeTypes, "name" | "price" | "quantity">;

export type ProductEditRequestPayload = {
  productName: string;
  productType: string;
  productUPC: string;
  itemCode: string;
  units: string;
  category: string;
  subCategory: string;
  brandName: string;
  allowProductSizes: boolean;
  productSize: ProductSizeExcerpt[];
  allowMeasurement: boolean;
  productMeasurement: string;
  allowProductWholesale: boolean;
  productWholesale: WholesaleExcerpt[];
  productStock: number;
  productDescription: string;
  shippingCategory: string;
  threshold: ThresholdTypes;
  featuredImage: string;
  productGalleryImages: string[];
  priceCode1: number;
  priceCode2: number;
  priceCode3: number;
  priceCode4: number;
  SRP: number;
  hasImage?: boolean;
};

export type ProductsBulkUpdatePayload = {
  Size: string;
  Category: string;
  Description: string;
  Brand: string;
  "Item Code": string;
  UM: string;
  Physical: string;
  UPC: string;
  "Sub Category": string;
  Stock: number;
  "Price Code 1": number;
  "Price Code 2": number;
  "Price Code 3": number;
  "Price Code 4": number;
  MSRP: number;
};

export type PaginatedReturnedPayloadType = {
  data: {
    paginatedProducts: ProductTypes[];
    total: number;
  };
};

export type ProductsReturnedPayloadType = {
  data: {
    products: ProductTypes[];
    total?: number;
  };
};

export type DashboardProductType = Pick<
  ProductTypes,
  | "_id"
  | "productName"
  | "hasImage"
  | "featuredImage"
  | "productType"
  | "priceCode3"
  | "category"
  | "subCategory"
>;

export type DashboardProductPayloadType = {
  data: {
    products: DashboardProductType[];
  };
};

export type initStateType = {
  loadingProducts: boolean;
  loadingRecentProducts: boolean;
  loadingPopularProducts: boolean;
  loadingProductAction: boolean;
  loadingProductActivation: boolean;
  loadingSingleProduct: boolean;
  uploadingImage: boolean;
  products: ProductTypes[];
  recentProducts: DashboardProductType[];
  popularProducts: DashboardProductType[] | ProductTypes[];
  singleProduct: ProductTypes | null;
  totalProducts: number;
  uploadedFiles: string;
  updatedInventory: string;
  error: null | string;
};
