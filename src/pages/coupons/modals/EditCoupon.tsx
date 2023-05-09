import React, { useState, useEffect } from "react";
import CouponFieldsLayout from "../CouponFieldsLayout";
import { CouponDataPropTypes, DateData } from "../types";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import dayjs from "dayjs";
import { CouponReturnedPayload } from "src/services/coupon/CouponTypes";

type EditCouponProps = {
  openEditCoupon: boolean;
  setOpenEditCoupon: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialDateData = {
  startDate: dayjs(new Date()),
  endDate: dayjs(new Date()),
};

const initialState = {
  _id: "",
  couponCode: "",
  couponType: "" /* discount by percentage or discount by amount */,
  couponQuantity:
    "unlimited" /* Whether there should be a limit to usage or not */,
  couponUsageQuantity:
    "" /* Number of times the coupon can be used if it's limited */,
  usePerCustomer:
    "limited" /* Whether there should be a limit to how many time customer can use it  */,
  usageQuantity: 1 /* The number of times customer can use it if it's limited */,
  couponDescription: "" /* A description for the coupon if any */,
  minimumPurchaseAmount:
    "" /* A minimum threshold amount before coupon can be applied */,
  percentageOff: "" /* Percentage off */,
  amountOff:
    "" /* Amount off. PS: It can either be one of percentageOff or priceOff */,
};

const initialMinAmountChecked = false;

const EditCoupon = (props: EditCouponProps) => {
  const { openEditCoupon, setOpenEditCoupon } = props;
  const [couponData, setCouponData] =
    useState<CouponDataPropTypes>(initialState);

  const [dateData, setDateData] = useState<DateData>(initialDateData);

  const [minAmountChecked, setMinAmountChecked] = useState(
    initialMinAmountChecked
  );

  const singleCoupon = useTypedSelector((state) => state.coupon.singleCoupon);

  useEffect(() => {
    if (singleCoupon) {
      const newCouponData = { ...initialState };
      const newDateData = { ...initialDateData };
      const newInitialMinAmountChecked = initialMinAmountChecked;

      for (let key in singleCoupon) {
        if (key in newCouponData) {
          // @ts-ignore
          newCouponData[key as keyof CouponReturnedPayload] =
            singleCoupon[key as keyof CouponReturnedPayload];

          setCouponData(newCouponData);
        }

        // newCouponData["customerUsageQuantity"] = singleCoupon["usageQuantity"];
        // newCouponData["minPurchaseAmount"] =
        //   singleCoupon["minimumPurchaseAmount"];

        if (key in newDateData) {
          newDateData[key as keyof DateData] = dayjs(
            singleCoupon[key as keyof DateData]
          );

          setDateData(newDateData);
        }

        if (
          singleCoupon.couponType.toLowerCase() === "discount by percentage"
        ) {
          newCouponData["percentageOff"] = singleCoupon["priceOff"].toString();
        } else {
          newCouponData["amountOff"] = singleCoupon["priceOff"].toString();
        }

        if (singleCoupon.minimumPurchaseAmount) {
          setMinAmountChecked(true);
        } else {
          setMinAmountChecked(newInitialMinAmountChecked);
        }
      }
    }
  }, [singleCoupon]);

  return (
    <CouponFieldsLayout
      couponData={couponData}
      setCouponData={setCouponData}
      openCoupon={openEditCoupon}
      setOpenCoupon={setOpenEditCoupon}
      dateData={dateData}
      setDateData={setDateData}
      minAmountChecked={minAmountChecked}
      setMinAmountChecked={setMinAmountChecked}
      isEdit={true}
    />
  );
};

export default EditCoupon;
