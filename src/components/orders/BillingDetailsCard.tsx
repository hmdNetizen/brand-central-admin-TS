import React from "react";
import OrdersCardItem from "./OrderDetailsCardItem";
import { useSelector } from "react-redux";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";

type BillingDetailsCardProps = {
  singleOrder: OrderReturnedPayload;
};

const BillingDetailsCard = (props: BillingDetailsCardProps) => {
  const { singleOrder } = props;

  if (singleOrder) {
    const {
      billingAddress: { customerName, phoneNumber, city, zipCode, address },
      ordersCustomer: { email },
    } = singleOrder;
    return (
      <OrdersCardItem heading="Billing Details">
        <tr>
          <td>Company Name</td>
          <td>{customerName}</td>
        </tr>
        <tr>
          <td>Company Email</td>
          <td>{email}</td>
        </tr>
        <tr>
          <td>Company Phone</td>
          <td>{phoneNumber}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>{address}</td>
        </tr>
        <tr>
          <td>City/State</td>
          <td>{city}</td>
        </tr>
        <tr>
          <td>Zip Code</td>
          <td>{zipCode}</td>
        </tr>
      </OrdersCardItem>
    );
  } else {
    return null;
  }
};

export default BillingDetailsCard;
