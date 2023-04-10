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

type UserWishListTypes = {
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

export type ProductTypes = {
  highlight: ProductHighlightTypes;
  threshold: {
    isThresholdActive: boolean;
    maximumQuantity: number;
  };
  _id: string;
  productName: string;
  productDescription: string;
  itemCode: string;
  productUPC: string;
  units: string;
  category: string;
  subCategory: string;
  allowEstimatedShippingTime: boolean;
  allowProductSizes: boolean;
  productSize: [
    {
      name: string;
      quantity: number;
      price: number;
      _id: string;
    }
  ];
  allowProductWholesale: boolean;
  allowMeasurement: boolean;
  productMeasurement: string;
  productStock: number;
  featuredImage: string;
  hasImage: boolean;
  productGalleryImages: string[];
  priceCode1: number;
  priceCode2: number;
  priceCode3: number;
  priceCode4: number;
  SRP: number;
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

export type PaginatedReturnedPayloadType = {
  data: {
    paginatedProducts: ProductTypes[];
    total: number;
  };
};

export type initStateType = {
  loadingProducts: boolean;
  products: ProductTypes[];
  totalProducts: number;
  error: null | string;
};
