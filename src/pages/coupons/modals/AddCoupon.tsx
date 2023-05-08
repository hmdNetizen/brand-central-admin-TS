import React, { useState } from "react";
import CouponFieldsLayout from "./CouponFieldsLayout";
import { CouponDataPropTypes, DateData } from "../types";

type AddCouponProps = {
  openAddCoupon: boolean;
  setOpenAddCoupon: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewCoupon = (props: AddCouponProps) => {
  const { openAddCoupon, setOpenAddCoupon } = props;
  const [couponData, setCouponData] = useState<CouponDataPropTypes>({
    couponCode: "",
    couponType: "" /* discount by percentage or discount by amount */,
    couponQuantity:
      "unlimited" /* Whether there should be a limit to usage or not */,
    couponUsageQuantity:
      "" /* Number of times the coupon can be used if it's limited */,
    usePerCustomer:
      "limited" /* Whether there should be a limit to how many time customer can use it  */,
    usageQuantity: 1 /* The number of times customer can use it if usePerCustomer is limited */,
    couponDescription: "" /* A description for the coupon if any */,
    minimumPurchaseAmount:
      "" /* A minimum threshold amount before coupon can be applied */,
    percentageOff: "" /* Percentage off */,
    amountOff:
      "" /* Amount off. PS: It can either be one of percentageOff or priceOff */,
  });

  const [dateData, setDateData] = useState<DateData>({
    startDate: null,
    endDate: null,
  });

  const [minAmountChecked, setMinAmountChecked] = useState(false);

  return (
    <CouponFieldsLayout
      couponData={couponData}
      setCouponData={setCouponData}
      openCoupon={openAddCoupon}
      setOpenCoupon={setOpenAddCoupon}
      dateData={dateData}
      setDateData={setDateData}
      minAmountChecked={minAmountChecked}
      setMinAmountChecked={setMinAmountChecked}
      isEdit={false}
    />
  );
};

export default AddNewCoupon;
