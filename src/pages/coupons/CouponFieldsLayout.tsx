import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { generateCode } from "src/lib/helpers";
import FormContainer from "./utils/FormContainer";
import { SelectChangeEvent } from "@mui/material";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  ContentContainer,
  ErrorsList,
  ErrorMsg,
} from "src/utilityStyles/pagesUtilityStyles";
import { Dayjs } from "dayjs";
import { CouponFieldsLayoutProps } from "./types";

const CouponFieldsLayout = (props: CouponFieldsLayoutProps) => {
  const {
    openCoupon,
    setOpenCoupon,
    couponData,
    setCouponData,
    dateData,
    setDateData,
    minAmountChecked,
    setMinAmountChecked,
    isEdit,
  } = props;
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [couponCodeError, setCouponCodeError] = useState("");
  const [couponTypeError, setCouponTypeError] = useState("");
  const [couponDescriptionError, setCouponDescriptionError] = useState("");
  const [amountOffError, setAmountOffError] = useState("");
  const [percentageOffError, setPercentageOffError] = useState("");
  const [couponQuantityError, setCouponQuantityError] = useState("");
  const [couponUsageQuantityError, setCouponUsageQuantityError] = useState("");
  const [usesPerCustomerError, setUsesPerCustomerError] = useState("");
  const [customerUsageQuantityError, setCustomerUsageQuantityError] =
    useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [minPurchaseAmountError, setMinPurchaseAmountError] = useState("");

  const loadingRequestAction = useTypedSelector(
    (state) => state.coupon.loadingRequestAction
  );
  const singleCoupon = useTypedSelector((state) => state.coupon.singleCoupon);
  const error = useTypedSelector((state) => state.coupon.error);

  const { addNewCoupon, updateCoupon } = useActions();

  const {
    couponCode,
    couponType,
    couponQuantity,
    couponUsageQuantity,
    usePerCustomer,
    couponDescription,
    minimumPurchaseAmount,
    percentageOff,
    amountOff,
    usageQuantity,
  } = couponData;
  const { startDate, endDate } = dateData;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setCouponData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "couponCode":
        if (!value) {
          setCouponCodeError("Please enter coupon code");
        } else {
          setCouponCodeError("");
        }
        break;

      case "amountOff":
        if (
          couponType === "discount by amount" &&
          (!value.trim() || parseFloat(value) === 0)
        ) {
          setAmountOffError("Enter a valid amount off for this coupon");
        } else {
          setAmountOffError("");
          setPercentageOffError("");
        }
        break;
      case "percentageOff":
        if (
          couponType === "discount by percentage" &&
          (!value.trim() || parseFloat(value) === 0)
        ) {
          setPercentageOffError("Enter a valid amount off for this coupon");
        } else {
          setPercentageOffError("");
          setAmountOffError("");
        }
        break;

      case "couponUsageQuantity":
        if (
          couponQuantity === "limited" &&
          (!value.trim() || parseInt(value) === 0)
        ) {
          setCouponUsageQuantityError("Enter usage quantity for this coupon");
        } else {
          setCouponUsageQuantityError("");
        }
        break;

      case "customerUsageQuantity":
        if (
          usePerCustomer === "limited" &&
          (!value.trim() || parseInt(value) === 0)
        ) {
          setCustomerUsageQuantityError(
            "Enter usage quantity for each customer"
          );
        } else {
          setCustomerUsageQuantityError("");
        }
        break;
      case "couponDescription":
        if (!value) {
          setCouponDescriptionError("Enter coupon description");
        } else {
          setCouponDescriptionError("");
        }
        break;
      case "minPurchaseAmount":
        if (minAmountChecked && !value.trim()) {
          setMinPurchaseAmountError("Enter a valid minimum amount");
        } else {
          setMinPurchaseAmountError("");
        }
        break;

      default:
        setCouponCodeError("");
        setCouponDescriptionError("");
        setPercentageOffError("");
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>): void => {
    const selectEvent = event as React.ChangeEvent<HTMLInputElement>;

    const { value, name } = selectEvent.target;
    setCouponData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "couponType":
        if (!value) {
          setCouponTypeError("Select a type for this coupon");
        } else {
          setCouponTypeError("");
        }
        break;
      case "couponQuantity":
        if (!value) {
          setCouponQuantityError("Select a valid quantity");
        } else {
          setCouponQuantityError("");
          setCouponUsageQuantityError("");
        }
        break;
      case "usePerCustomer":
        if (!value) {
          setUsesPerCustomerError("Select valid usage amount per customer");
        } else {
          setUsesPerCustomerError("");
          setCustomerUsageQuantityError("");
        }
        break;

      default:
        setUsesPerCustomerError("");
    }
  };

  const handleClick = () => {
    setCouponData({
      ...couponData,
      couponCode: generateCode(),
    });
    setCouponCodeError("");
  };

  const handleStartDate = (newValue: Dayjs | null) => {
    if (!newValue) {
      setStartDateError("Enter a start date");
    } else {
      setStartDateError("");
    }
    setDateData({ ...dateData, startDate: newValue });
  };

  const handleEndDate = (newValue: Dayjs | null) => {
    if (!newValue) {
      setEndDateError("Enter an end date");
    } else {
      setEndDateError("");
    }

    setDateData({ ...dateData, endDate: newValue });
  };

  const handleClose = () => {
    setOpenCoupon(false);
    setCouponData({
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

    setDateData({
      startDate: null,
      endDate: null,
    });
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!couponCode.trim()) {
      setCouponCodeError("Please enter coupon code");
      return;
    }

    if (!couponType) {
      setCouponTypeError("Select a type for this coupon");
      return;
    }

    if (
      couponType === "discount by amount" &&
      (!amountOff.toString().trim() || parseFloat(amountOff) === 0)
    ) {
      setAmountOffError("Enter a valid amount off for this coupon");
      setPercentageOffError("");
      return;
    }

    if (
      couponType === "discount by percentage" &&
      (!percentageOff.toString().trim() || parseFloat(percentageOff) === 0)
    ) {
      setPercentageOffError("Enter a valid percentage off for this coupon");
      setAmountOffError("");
      return;
    }

    if (!couponQuantity) {
      setCouponQuantityError("Select a valid quantity");
      return;
    }

    if (
      couponQuantity === "limited" &&
      (!couponUsageQuantity.toString().trim() ||
        parseInt(couponUsageQuantity) === 0)
    ) {
      setCouponUsageQuantityError("Enter usage quantity for this coupon");
      return;
    }

    if (!usePerCustomer) {
      setUsesPerCustomerError("Select valid usage amount per customer");
      return;
    }

    if (
      usePerCustomer === "limited" &&
      (!usePerCustomer.toString().trim() || Number(usageQuantity) === 0)
    ) {
      setCustomerUsageQuantityError("Enter usage quantity for each customer");
      return;
    }

    if (!startDate) {
      setStartDateError("Enter a valid start date");
      return;
    }

    if (!endDate) {
      setEndDateError("Enter a valid end date");
      return;
    }

    if (
      minAmountChecked &&
      (!minimumPurchaseAmount.toString().trim() ||
        parseFloat(minimumPurchaseAmount) === 0)
    ) {
      setMinPurchaseAmountError("Enter a valid minimum amount");
      return;
    }

    if (!couponDescription.trim()) {
      setCouponDescriptionError("Please enter coupon description");
      return;
    }

    if (
      couponCodeError ||
      couponTypeError ||
      percentageOffError ||
      amountOffError ||
      couponDescriptionError ||
      couponQuantityError ||
      couponUsageQuantityError ||
      customerUsageQuantityError ||
      usesPerCustomerError ||
      startDateError ||
      endDateError ||
      minPurchaseAmountError ||
      couponDescriptionError
    )
      return;

    if (!isEdit) {
      addNewCoupon({
        setOpen: setOpenCoupon,
        couponCode: couponCode.toUpperCase(),
        couponType: couponType.toLowerCase(),
        couponUsageQuantity:
          couponQuantity === "limited" ? Number(couponUsageQuantity) : "",
        usePerCustomer: usePerCustomer.toLowerCase(),
        couponDescription,
        minimumPurchaseAmount: minAmountChecked
          ? Number(minimumPurchaseAmount)
          : "",
        priceOff:
          couponType === "discount by amount"
            ? Number(amountOff)
            : Number(percentageOff),
        couponQuantity: couponQuantity.toLowerCase(),
        usageQuantity:
          usePerCustomer === "limited" ? Number(usageQuantity) : "",
        startDate,
        endDate,
      });
    } else {
      updateCoupon({
        couponId: singleCoupon?._id,
        setOpen: setOpenCoupon,
        couponCode: couponCode.toUpperCase(),
        couponType: couponType.toLowerCase(),
        couponUsageQuantity:
          couponQuantity === "limited" ? Number(couponUsageQuantity) : "",
        usePerCustomer: usePerCustomer.toLowerCase(),
        couponDescription,
        minimumPurchaseAmount: minAmountChecked
          ? Number(minimumPurchaseAmount)
          : "",
        priceOff:
          couponType === "discount by amount"
            ? Number(amountOff)
            : Number(percentageOff),
        couponQuantity: couponQuantity.toLowerCase(),
        usageQuantity:
          usePerCustomer === "limited" ? Number(usageQuantity) : "",
        startDate,
        endDate,
      });
    }
  };

  return (
    <ShowDialog
      openModal={openCoupon}
      handleClose={handleClose}
      width={matchesXS ? "100%" : matchesSM ? "85%" : 800}
    >
      <ContentContainer container direction="column">
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            p: "1rem 2rem",
            background: "#f7f7f7",
          }}
        >
          <Grid item alignSelf="center">
            <Typography
              variant="h4"
              style={{ marginBottom: 0 }}
              color="secondary"
            >
              {isEdit ? "Edit Coupon" : "Add New Coupon"}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {!loadingRequestAction && error && (
          <ErrorsList item component="ul">
            <ErrorMsg variant="body1" component="li" color="error">
              {error}
            </ErrorMsg>
          </ErrorsList>
        )}
        <FormContainer
          amountOff={amountOff}
          amountOffError={amountOffError}
          couponCode={couponCode}
          couponCodeError={couponCodeError}
          couponDescription={couponDescription}
          couponDescriptionError={couponDescriptionError}
          couponQuantity={couponQuantity}
          couponQuantityError={couponQuantityError}
          couponType={couponType}
          couponTypeError={couponTypeError}
          couponUsageQuantity={couponUsageQuantity}
          couponUsageQuantityError={couponUsageQuantityError}
          usageQuantity={usageQuantity}
          customerUsageQuantityError={customerUsageQuantityError}
          endDate={endDate}
          endDateError={endDateError}
          minAmountChecked={minAmountChecked}
          minimumPurchaseAmount={minimumPurchaseAmount}
          minPurchaseAmountError={minPurchaseAmountError}
          onClick={handleClick}
          onSubmit={handleSubmit}
          percentageOff={percentageOff}
          percentageOffError={percentageOffError}
          setMinAmountChecked={setMinAmountChecked}
          setMinPurchaseAmountError={setMinPurchaseAmountError}
          startDate={startDate}
          isEdit={isEdit}
          startDateError={startDateError}
          usePerCustomer={usePerCustomer}
          usesPerCustomerError={usesPerCustomerError}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onClose={handleClose}
          onEndDate={handleEndDate}
          onStartDate={handleStartDate}
          loadingRequestAction={loadingRequestAction}
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default CouponFieldsLayout;
