export type BrandReturnedPayload = {
  _id: string;
  couponCode: string;
  couponType: string;
  couponQuantity: string;
  couponUsageQuantity: null | number;
  usePerCustomer: string;
  usageQuantity: number;
  startDate: string;
  endDate: string;
  minimumPurchaseAmount: number;
  priceOff: number;
  couponDescription: string;
  isActive: boolean;
  usageCount: number;
  appliedBy: string[];
};

export type InitStateType = {
  loading: boolean;
  error: null | string;
  coupons: BrandReturnedPayload[];
};
