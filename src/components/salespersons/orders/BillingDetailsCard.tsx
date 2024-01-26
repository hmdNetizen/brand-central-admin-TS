import React from "react";
import SalespersonOrderDetailsCardItem from "./SalespersonOrderDetailsCardItem";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";

type SalespersonBillingDetailsCardProps = {
  singleOrder: SalespersonOrderResponsePayload | null;
};

const SalespersonBillingDetailsCard = (
  props: SalespersonBillingDetailsCardProps
) => {
  const { singleOrder } = props;

  if (singleOrder) {
    const {
      billingAddress: { customerName, phoneNumber, city, zipCode, address },
      orderedFor: { companyName },
    } = singleOrder;
    return (
      <SalespersonOrderDetailsCardItem heading="Billing Details">
        <tr>
          <td>Company Name</td>
          <td>{companyName}</td>
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
          <td>{address ? address : "N/A"}</td>
        </tr>
        {/* <tr>
          <td>City/State</td>
          <td>{city}</td>
        </tr>
        <tr>
          <td>Zip Code</td>
          <td>{zipCode}</td>
        </tr> */}
      </SalespersonOrderDetailsCardItem>
    );
  } else {
    return null;
  }
};

export default SalespersonBillingDetailsCard;
