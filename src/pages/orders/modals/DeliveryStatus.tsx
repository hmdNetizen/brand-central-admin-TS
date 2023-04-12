import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomSelect from "src/utils/CustomSelect";
import CustomTextArea from "src/utils/CustomTextArea";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { useActions } from "src/hooks/useActions";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    "&.MuiGrid-root": {
      padding: "2rem 3rem",
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
}));

const initialState = {
  orderPaymentStatus: "",
  orderStatus: "",
  orderNote: "",
};

const OrderDeliveryStatus = ({ openDeliveryStatus, setOpenDeliveryStatus }) => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [orderData, setOrderData] = useState(initialState);

  const [orderPaymentStatusError, setOrderPaymentStatusError] = useState("");
  const [orderStatusError, setOrderStatusError] = useState("");

  const { orderPaymentStatus, orderStatus, orderNote } = orderData;

  const { singleOrder, loadingOrderAction } = useSelector(
    (state) => state.orders
  );

  const { updateOrderStatus } = useActions();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setOrderData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "orderPaymentStatus":
        if (!value) {
          setOrderPaymentStatusError("Select order payment status");
        } else {
          setOrderPaymentStatusError("");
        }
        break;
      case "orderStatus":
        if (!value) {
          setOrderStatusError("Select order delivery status");
        } else {
          setOrderStatusError("");
        }
        break;
      default:
        setOrderPaymentStatusError("");
        setOrderStatusError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!orderPaymentStatus && !orderStatus) {
      setOrderPaymentStatusError("Select order payment status");
      setOrderStatusError("Select order delivery status");
      return;
    }

    if (!orderPaymentStatus) {
      setOrderPaymentStatusError("Select order payment status");
      return;
    }

    if (!orderStatus) {
      setOrderStatusError("Select order delivery status");
      return;
    }

    if (orderPaymentStatusError || orderStatusError) return;

    updateOrderStatus({
      orderId: singleOrder.id,
      setOpenDeliveryStatus,
      orderStatus,
      orderPaymentStatus,
    });
  };

  useEffect(() => {
    if (singleOrder) {
      const newOrderData = { ...initialState };
      for (const key in singleOrder) {
        if (key in newOrderData) {
          newOrderData[key] = singleOrder[key];
        }

        setOrderData(newOrderData);
      }
    }
  }, [singleOrder]);

  return (
    <ShowDialog
      openModal={openDeliveryStatus}
      width={matchesXS ? "95%" : matchesSM ? 500 : 600}
      handleClose={() => setOpenDeliveryStatus(false)}
    >
      <Grid container direction="column" className={classes.container}>
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
            <Typography variant="h4" style={{ marginBottom: 0 }}>
              Delivery Status
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setOpenDeliveryStatus(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          component="form"
          className={classes.formContainer}
          onSubmit={handleSubmit}
        >
          <Grid item container pb={2}>
            <CustomSelect
              options={["paid", "unpaid", "processing"]}
              name="orderPaymentStatus"
              value={orderPaymentStatus}
              onChange={handleChange}
              label="Payment Status"
              placeholder="Select Payment Status"
              errorMessage={orderPaymentStatusError}
            />
          </Grid>
          <Grid item container pb={2}>
            <CustomSelect
              options={["pending", "processing", "completed", "declined"]}
              name="orderStatus"
              value={orderStatus}
              onChange={handleChange}
              label="Delivery Status"
              placeholder="Select Payment Status"
              errorMessage={orderStatusError}
            />
          </Grid>

          <Grid item container>
            <CustomTextArea
              name="orderNote"
              label="Track Note"
              id="orderNote"
              value={orderNote}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={1}
            style={{ marginTop: "5rem" }}
          >
            <Grid item>
              <Button
                className={classes.cancelButton}
                onClick={() => setOpenDeliveryStatus(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                disableRipple
                color="secondary"
                className={classes.submitButton}
                disabled={loadingOrderAction}
              >
                {loadingOrderAction && (
                  <CircularProgress
                    style={{ height: 25, width: 25 }}
                    className={classes.loader}
                  />
                )}{" "}
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ShowDialog>
  );
};

export default OrderDeliveryStatus;
