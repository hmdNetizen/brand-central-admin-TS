import React from "react";
import OrdersCardItem from "./SalespersonOrderDetailsCardItem";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { capitalizeFirstLetters } from "src/lib/helpers";
import Moment from "react-moment";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";

type SalespersonOrderDetailsCardProps = {
  singleOrder: SalespersonOrderResponsePayload;
};

const SalespersonOrderDetailsCard = (
  props: SalespersonOrderDetailsCardProps
) => {
  const { singleOrder } = props;
  const theme = useTheme();

  if (singleOrder) {
    const {
      orderId,
      ordersProducts,
      orderPaymentMethod,
      orderStatus,
      orderPaymentAmount,
      orderDate,
      orderPaymentStatus,
      paymentReceipt,
    } = singleOrder;
    return (
      <OrdersCardItem heading="Order Details" hasButton>
        <tr>
          <td>Order Number</td>
          <td>{orderId}</td>
        </tr>
        <tr>
          <td>Total Product</td>
          <td>{ordersProducts.length}</td>
        </tr>
        <tr>
          <td>Total Cost</td>
          <td>${orderPaymentAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Order Date</td>
          <td>
            <Moment format="D MMM YYYY" withTitle>
              {orderDate}
            </Moment>
          </td>
        </tr>
        <tr>
          <td>Payment Method</td>
          <td>
            {orderPaymentMethod === "Cash/Check"
              ? "Cash on Delivery"
              : orderPaymentMethod}
          </td>
        </tr>
        <tr>
          <td>Payment Status</td>
          <td>
            <Chip
              label={capitalizeFirstLetters(orderPaymentStatus)}
              style={{
                fontSize: "1.25rem",
                fontWeight: 500,
                background:
                  orderPaymentStatus === "unpaid"
                    ? theme.palette.error.light
                    : orderPaymentStatus === "paid"
                    ? theme.palette.success.light
                    : theme.palette.common.lightGreen,
                color:
                  orderPaymentStatus === "processing"
                    ? theme.palette.success.dark
                    : "#fff",
              }}
            />
          </td>
        </tr>

        {orderPaymentMethod === "Credit Card" && (
          <tr>
            <td>Processing Fee</td>
            <td>${paymentReceipt?.transactionFee}</td>
          </tr>
        )}

        {orderPaymentMethod !== "Cash/Check" && (
          <tr>
            <td>Transaction ID</td>
            <td>{paymentReceipt?.transactionDetails?.transactionId}</td>
          </tr>
        )}
        <tr>
          <td>Order Status</td>
          <td>
            <Chip
              label={capitalizeFirstLetters(orderStatus)}
              style={{
                fontSize: "1.25rem",
                background:
                  orderStatus === "pending"
                    ? theme.palette.warning.light
                    : orderStatus === "declined"
                    ? theme.palette.error.light
                    : orderStatus === "completed"
                    ? theme.palette.success.light
                    : theme.palette.common.lightGreen,
                color:
                  orderStatus === "processing"
                    ? theme.palette.success.dark
                    : "#fff",
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Placed by</td>
          <td>{singleOrder.placedBy.fullName}</td>
        </tr>
      </OrdersCardItem>
    );
  } else {
    return (
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "70vh" }}
      >
        <Typography variant="h2">Order Not Found</Typography>
      </Grid>
    );
  }
};

export default SalespersonOrderDetailsCard;
