import { Dayjs } from "dayjs";
import React from "react";

export type CouponReturnedPayload = {
  _id: string;
  couponCode: string;
  couponType: string;
  couponQuantity: string;
  couponUsageQuantity: string;
  usePerCustomer: string;
  usageQuantity: number;
  startDate: string;
  endDate: string;
  minimumPurchaseAmount: number;
  priceOff: number;
  couponDescription: string;
  isActive: boolean;
  usageCount: number;
};

export interface CouponRequestPayloadData {
  couponCode: string;
  couponType: string;
  couponUsageQuantity: number | string;
  usePerCustomer: string;
  couponDescription: string;
  minimumPurchaseAmount: number | string;
  priceOff: number;
  couponQuantity: string;
  usageQuantity: number | string;
  startDate: Dayjs | string;
  endDate: Dayjs | string;
}

// export interface CouponData {
//   couponCode: string;
//   couponType: string;
//   couponUsageQuantity: number | string;
//   usePerCustomer: string;
//   customerUsageQuantity: number;
//   couponDescription: string;
//   minPurchaseAmount: string;
//   percentageOff: string;
//   priceOff: number;
//   couponQuantity: string;
//   usageQuantity: number | string
// }

export interface CouponRequestData extends CouponRequestPayloadData {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  couponId?: string;
}

export type CouponReturnedPayloadType = {
  data: CouponReturnedPayload[];
};

export type SingleCouponPayloadType = {
  data: CouponReturnedPayload;
};

export type InitStateType = {
  loading: boolean;
  loadingCouponActivation: boolean;
  loadingRequestAction: boolean;
  error: null | string;
  coupons: CouponReturnedPayload[];
  singleCoupon: CouponReturnedPayload | null;
};
