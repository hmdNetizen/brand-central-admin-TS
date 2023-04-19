import React from "react";
import OrderDetailsCardItem from "./OrderDetailsCardItem";
import { useSelector } from "react-redux";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";

type ShippingDetailsCardProps = {
  singleOrder: OrderReturnedPayload;
};

const ShippingDetailsCard = (props: ShippingDetailsCardProps) => {
  const { singleOrder } = props;

  if (singleOrder) {
    const {
      shippingAddress: { customerName, phoneNumber, address, city, zipCode },
      ordersCustomer: { email },
    } = singleOrder;
    return (
      <OrderDetailsCardItem heading="Shipping Details">
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
      </OrderDetailsCardItem>
    );
  } else {
    return null;
  }
};

export default ShippingDetailsCard;
