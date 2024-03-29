import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { StyledButton } from "../styles/SalespersonDetailsOrderItemStyles";
import { SalespersonCustomerResponsePayload } from "src/services/salespersons/customers/types";
import { Link } from "react-router-dom";
import { capitalizeFirstLetters } from "src/lib/helpers";

type SalespersonDetailsCustomerItemProps = {
  customer: SalespersonCustomerResponsePayload;
  salespersonId: string | undefined;
};

const SalespersonDetailsCustomerItem = ({
  customer,
  salespersonId,
}: SalespersonDetailsCustomerItemProps) => {
  const {
    customerCode,
    companyName,
    companyEmail,
    priceCode,
    phoneNumber,
    id,
  } = customer;
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{customerCode}</TableCell>
      <TableCell style={{ minWidth: 200 }}>{companyName}</TableCell>
      <TableCell align="center">
        {companyEmail ? companyEmail : "N/A"}
      </TableCell>
      <TableCell>{phoneNumber ? phoneNumber : "N/A"}</TableCell>
      <TableCell style={{ minWidth: 120 }}>
        {priceCode ? capitalizeFirstLetters(priceCode) : "Price code 1"}
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>
        <StyledButton
          variant="contained"
          color="secondary"
          component={Link}
          to={`/dashboard/salespeople/${salespersonId}/customers/${id}`}
        >
          View Details
        </StyledButton>
      </TableCell>
    </TableRow>
  );
};

export default SalespersonDetailsCustomerItem;
