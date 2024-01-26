import React from "react";
import OrderDetailsCardItem from "./SalespersonOrderDetailsCardItem";
import { useSelector } from "react-redux";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";

type SalespersonShippingDetailsCardProps = {
  singleOrder: SalespersonOrderResponsePayload;
};

const SalespersonShippingDetailsCard = (
  props: SalespersonShippingDetailsCardProps
) => {
  const { singleOrder } = props;

  if (singleOrder) {
    const {
      shippingAddress: { customerName, phoneNumber, address },
    } = singleOrder;
    return (
      <OrderDetailsCardItem heading="Shipping Details">
        <tr>
          <td>Company Name</td>
          <td>{customerName}</td>
        </tr>
        {/* <tr>
          <td>Company Email</td>
          <td>{email}</td>
        </tr> */}
        <tr>
          <td>Company Phone</td>
          <td>{phoneNumber ? phoneNumber : "N/A"}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td style={{ maxWidth: 250 }}>{address}</td>
        </tr>
      </OrderDetailsCardItem>
    );
  } else {
    return null;
  }
};

export default SalespersonShippingDetailsCard;
