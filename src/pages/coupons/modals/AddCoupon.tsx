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
    couponType: "",
    couponUsageQuantity: "",
    usePerCustomer: "limited",
    customerUsageQuantity: 1,
    couponDescription: "",
    minPurchaseAmount: "",
    percentageOff: "",
    amountOff: "",
    couponQuantity: "unlimited",
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
    />
  );
};

AddNewCoupon.propTypes = {
  openAddCoupon: PropTypes.bool.isRequired,
  setOpenAddCoupon: PropTypes.func.isRequired,
};

export default AddNewCoupon;
