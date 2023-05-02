export type CouponReturnedPayload = {
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

export type CouponReturnedPayloadType = {
  data: CouponReturnedPayload[];
};

export type SingleCouponPayloadType = {
  data: CouponReturnedPayload;
};

export type InitStateType = {
  loading: boolean;
  loadingActivation: boolean;
  loadingRequestAction: boolean;
  error: null | string;
  coupons: CouponReturnedPayload[];
  singleCoupon: CouponReturnedPayload | null;
};
