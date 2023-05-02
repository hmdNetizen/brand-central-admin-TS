import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles, useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { useActions } from "src/hooks/useActions";

import CustomCheckbox from "src/utils/CustomCheckbox";
import CustomSelect from "src/utils/CustomSelect";
import { generateCode } from "src/lib/helpers";
import FormContainer from "../utils/FormContainer";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingBottom: "3rem",
  },
  errorsList: {
    "&.MuiGrid-root": {
      padding: "2rem 2rem 2rem 3rem",
      background: theme.palette.common.lightRed,
      alignSelf: "center",
      marginTop: "1rem",
      borderRadius: 5,
      listStyle: "none",
    },
  },
  errorMsg: {
    "&.MuiTypography-root": {
      fontSize: "1.5rem",
      "&:not(:first-of-type)": {
        paddingTop: ".5rem",
      },
    },
  },
  formContainer: {
    "&.MuiGrid-root": {
      padding: "2rem",
    },
  },
  submitButton: {
    "&.MuiButton-root": {
      minWidth: 180,
      fontSize: "1.6rem",
      fontWeight: 400,
      textTransform: "none",
      borderRadius: 0,

      "&:hover": {
        background: theme.palette.secondary.light,
      },

      "&:active": {
        background: theme.palette.secondary.dark,
      },

      "&:disabled": {
        cursor: "not-allowed",
        pointerEvents: "all !important",
        background: theme.palette.secondary.light,
        color: "#fff",
        // color: (props) => (props.loading ? "#fff" : "inherit"),
      },
    },
  },
  loader: {
    marginRight: "1rem",
    "&.MuiCircularProgress-root": {
      color: "#f2f2f2",
    },
  },
  cancelButton: {
    "&.MuiButton-root": {
      fontSize: "1.5rem",
      textTransform: "none",
      padding: ".5rem 2rem",
      borderRadius: 0,
      color: theme.palette.error.main,
      background: theme.palette.common.lightRed,
    },
  },
  chip: {
    "&.MuiChip-root": {
      marginTop: ".5rem",
      borderRadius: 0,
      height: 30,
      fontSize: "1.2rem",
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.dark,
      display: "flex",
      width: 170,
      fontWeight: 600,
      textAlign: "center",
      cursor: "pointer",
      "&:hover": {
        background: "#f6f6f6",
      },
      "&:active": {
        background: "#ddd",
      },
    },
  },
  iconButton: {
    "&.MuiIconButton-root": {
      background: theme.palette.error.main,
      maxWidth: 42,

      "&:hover": {
        background: theme.palette.error.light,
      },

      "&:active": {
        background: theme.palette.error.dark,
      },

      "& .MuiSvgIcon-root": {
        color: "#fff",
      },
    },
  },
}));

const CouponFieldsLayout = ({
  openCoupon,
  setOpenCoupon,
  couponData,
  setCouponData,
  dateData,
  setDateData,
  minAmountChecked,
  setMinAmountChecked,
  isEdit,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [couponCodeError, setCouponCodeError] = useState("");
  //   eslint-disable-next-line
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
  //   eslint-disable-next-line
  const [productImageError, setProductImageError] = useState("");
  const { loadingCouponAction, error, singleCoupon } = useSelector(
    (state) => state.coupon
  );

  const { addNewCoupon, updateCoupon } = useActions();

  const {
    couponCode,
    couponType,
    couponQuantity,
    couponUsageQuantity,
    usePerCustomer,
    couponDescription,
    minPurchaseAmount,
    percentageOff,
    amountOff,
    customerUsageQuantity,
  } = couponData;
  const { startDate, endDate } = dateData;

  const handleChange = (event) => {
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
      case "couponType":
        if (!value) {
          setCouponTypeError("Select a type for this coupon");
        } else {
          setCouponTypeError("");
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
      case "couponQuantity":
        if (!value) {
          setCouponQuantityError("Select a valid quantity");
        } else {
          setCouponQuantityError("");
          setCouponUsageQuantityError("");
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
      case "usePerCustomer":
        if (!value) {
          setUsesPerCustomerError("Select valid usage amount per customer");
        } else {
          setUsesPerCustomerError("");
          setCustomerUsageQuantityError("");
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

  const handleClick = () => {
    setCouponData({
      ...couponData,
      couponCode: generateCode(),
    });
    setCouponCodeError("");
  };

  const handleClose = () => {
    setOpenCoupon(false);
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
      customerUsageQuantity === "limited" &&
      (!usePerCustomer.toString().trim() || parseInt(usePerCustomer) === 0)
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
      (!minPurchaseAmount.toString().trim() ||
        parseFloat(minPurchaseAmount) === 0)
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
        setOpenAddCoupon: setOpenCoupon,
        couponCode: couponCode.toUpperCase(),
        couponType: couponType.toLowerCase(),
        priceOff:
          couponType === "discount by amount"
            ? parseFloat(amountOff)
            : parseFloat(percentageOff),
        couponQuantity: couponQuantity.toLowerCase(),
        couponUsageQuantity:
          couponQuantity === "limited" ? parseInt(couponUsageQuantity) : "",
        usePerCustomer: usePerCustomer.toLowerCase(),
        usageQuantity:
          usePerCustomer === "limited" ? parseInt(customerUsageQuantity) : "",
        startDate,
        endDate,
        minimumPurchaseAmount: minAmountChecked
          ? parseFloat(minPurchaseAmount)
          : "",
        couponDescription,
      });
    } else {
      updateCoupon({
        couponId: singleCoupon._id,
        setOpenEditCoupon: setOpenCoupon,
        couponCode: couponCode.toUpperCase(),
        couponType: couponType.toLowerCase(),
        priceOff:
          couponType === "discount by amount"
            ? parseFloat(amountOff)
            : parseFloat(percentageOff),
        couponQuantity,
        couponUsageQuantity:
          couponQuantity === "limited" ? parseInt(couponUsageQuantity) : "",
        usePerCustomer,
        usageQuantity:
          usePerCustomer === "limited" ? parseInt(customerUsageQuantity) : "",
        startDate,
        endDate,
        minimumPurchaseAmount: minAmountChecked
          ? parseFloat(minPurchaseAmount)
          : "",
        couponDescription,
      });
    }
  };

  return (
    <ShowDialog
      openModal={openCoupon}
      handleClose={handleClose}
      width={matchesXS ? "100%" : matchesSM ? "85%" : 800}
    >
      <Grid container direction="column" className={classes.contentContainer}>
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
            <IconButton
              onClick={() => {
                setOpenCoupon(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {!loadingCouponAction && error && (
          <Grid item component="ul" className={classes.errorsList}>
            <Typography
              variant="body1"
              component="li"
              color="error"
              className={classes.errorMsg}
            >
              {error}
            </Typography>
          </Grid>
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
          customerUsageQuantity={customerUsageQuantity}
          customerUsageQuantityError={customerUsageQuantityError}
          endDate={endDate}
          endDateError={endDateError}
          minAmountChecked={minAmountChecked}
          minPurchaseAmount={minPurchaseAmount}
          minPurchaseAmountError={minPurchaseAmountError}
          onClick={handleClick}
          onSubmit={handleSubmit}
          percentageOff={percentageOff}
          percentageOffError={percentageOffError}
          setMinAmountChecked={setMinAmountChecked}
          setMinPurchaseAmountError={setMinPurchaseAmountError}
          startDate={startDate}
          isEdit={false}
          startDateError={startDateError}
          usePerCustomer={usePerCustomer}
          usesPerCustomerError={usesPerCustomerError}
          onChange={handleChange}
        />
      </Grid>
    </ShowDialog>
  );
};

CouponFieldsLayout.defaultProps = {
  isEdit: false,
};

export default CouponFieldsLayout;
