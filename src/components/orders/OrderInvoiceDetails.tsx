import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import Moment from "react-moment";

const Heading = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.85rem",
  marginBottom: "1rem",
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",

  "& span": {
    fontWeight: 400,
  },
}));

type OrderInvoiceProps = {
  singleOrder: OrderReturnedPayload;
};

const OrderInvoiceDetails = ({ singleOrder }: OrderInvoiceProps) => {
  return (
    <Grid item>
      <Heading variant="h3">Order Details</Heading>
      <Title variant="body1">
        Invoice Number :{" "}
        <span>
          {singleOrder.orderInVoiceNumber
            ? singleOrder.orderInVoiceNumber
            : "N/A"}
        </span>
      </Title>
      <Title variant="body1">
        Order Date :{" "}
        <span style={{ fontWeight: 400 }}>
          <Moment format="D MMM YYYY hh:mm:ss" withTitle>
            {singleOrder.orderDate}
          </Moment>
        </span>
      </Title>
      <Title variant="body1">
        Order ID : <span>${singleOrder.orderId}</span>
      </Title>
      <Title variant="body1">
        Payment Method :{" "}
        <span>
          {singleOrder.orderPaymentMethod === "Cash/Check"
            ? `${singleOrder.orderPaymentMethod} on delivery`
            : singleOrder.orderPaymentMethod}
        </span>
      </Title>
      {singleOrder.orderPaymentMethod === "Credit Card" && (
        <Title variant="body1">
          Transaction Fee :{" "}
          <span>${singleOrder?.paymentReceipt?.transactionFee}</span>
        </Title>
      )}
      {singleOrder.orderDiscount !== 0 && (
        <Title variant="body1">
          Order Discount : <span>${singleOrder.orderDiscount}</span>
        </Title>
      )}
      {singleOrder.orderShippingAmount !== 0 && (
        <Title variant="body1">
          Shipping Fee :{" "}
          <span>${singleOrder.orderShippingAmount.toFixed(2)}</span>
        </Title>
      )}
    </Grid>
  );
};

export default OrderInvoiceDetails;
