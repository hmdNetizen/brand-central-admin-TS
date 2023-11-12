import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useTheme, styled } from "@mui/material/styles";

import { StyledButton } from "../styles/SalespersonDetailsOrderItemStyles";
import { SalespersonCustomerResponsePayload } from "src/services/salespersons/customers/types";
import { capitalizeFirstLetters } from "src/lib/helpers";
import {
  ActionButton,
  StyledIconButton,
} from "src/components/common/styles/CommonPageStyles";
import { useActions } from "src/hooks/useActions";

type SalespeopleCustomerItemProps = {
  customer: SalespersonCustomerResponsePayload;
  setOpenEditSalespersonCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteSalespersonCustomer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export const OptionsTableData = styled("div")({
  minWidth: 150,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridColumnGap: "1rem",
});

const SalespeopleCustomerItem = ({
  customer,
  setOpenEditSalespersonCustomer,
  setOpenDeleteSalespersonCustomer,
}: SalespeopleCustomerItemProps) => {
  const theme = useTheme();
  const { customerCode, companyName, priceCode, phoneNumber, id, referrer } =
    customer;

  const { setCurrentSalespeopleCustomer } = useActions();

  const handleEditSalespersonCustomer = () => {
    setCurrentSalespeopleCustomer(customer);
    setOpenEditSalespersonCustomer(true);
  };

  const handleDeleteCustomer = () => {
    setCurrentSalespeopleCustomer(customer);
    setOpenDeleteSalespersonCustomer(true);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{customerCode}</TableCell>
      <TableCell style={{ minWidth: 200 }}>{companyName}</TableCell>
      <TableCell align="center">{phoneNumber ? phoneNumber : "N/A"}</TableCell>
      <TableCell align="center" style={{ minWidth: 200 }}>
        {referrer.fullName}
      </TableCell>
      <TableCell style={{ minWidth: 120 }}>
        {priceCode ? capitalizeFirstLetters(priceCode) : "Price code 1"}
      </TableCell>
      <TableCell style={{ minWidth: 300 }}>
        <OptionsTableData>
          <StyledButton
            variant="contained"
            color="secondary"
            component={Link}
            to={`/dashboard/salespeople/customers/${id}`}
            style={{ minWidth: 110 }}
          >
            View Details
          </StyledButton>

          <ActionButton
            startIcon={<EditSharpIcon />}
            background={theme.palette.secondary}
            title="Edit"
            onClick={handleEditSalespersonCustomer}
          />
          <StyledIconButton onClick={handleDeleteCustomer}>
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default SalespeopleCustomerItem;
