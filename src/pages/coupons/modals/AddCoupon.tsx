import React, { useState } from "react";
import CouponFieldsLayout from "./CouponFieldsLayout";
import PropTypes from "prop-types";
import { CouponDataPropTypes, DateData } from "../types";

type AddCouponProps = {
  openAddCoupon: boolean;
  setOpenAddCoupon: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewCoupon = (props: AddCouponProps) => {
  const { openAddCoupon, setOpenAddCoupon } = props;
  // const [dataSet, setDataset] = useState({
  //   couponCode: "",
  //   couponType: "",
  //   couponQuantityLimit: "",
  //   couponQuantity: "unlimited",
  //   usesPerCustomerLimit: "limited",
  //   usesPerCustomerQuantity: 1,
  //   couponDescription: "",
  //   percentageOff: "",
  //   minPurchaseAmount: "",
  //   amountOff: "",
  // });

  const [couponData, setCouponData] = useState<CouponDataPropTypes>({
    couponCode: "",
    couponType: "" /* Limited or Unlimited */,
    couponQuantity:
      "unlimited" /* Whether there should be a limit to usage or not */,
    couponUsageQuantity:
      "" /* Number of times the coupon can be used if it's limited */,
    usePerCustomer:
      "limited" /* Whether there should be a limit to how many time customer can use it  */,
    customerUsageQuantity: 1 /* The number of times customer can use it if it's limited */,
    couponDescription: "" /* A description for the coupon if any */,
    minPurchaseAmount:
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

AddNewCoupon.propTypes = {
  openAddCoupon: PropTypes.bool.isRequired,
  setOpenAddCoupon: PropTypes.func.isRequired,
};

export default AddNewCoupon;
