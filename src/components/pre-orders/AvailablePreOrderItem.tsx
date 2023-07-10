import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import Moment from "react-moment";
import { useTheme, styled } from "@mui/material/styles";
import { UpdateStockType } from "src/services/pre-orders/PreOrderTypes";
import {
  OptionsTableData,
  ActionButton,
} from "../common/styles/CommonPageStyles";

const IgnoreButton = styled(Button)({
  fontSize: "1.25rem",
  color: "#fff",
  minWidth: 56,
  borderRadius: 20,
  textTransform: "capitalize",
});

type AvailablePreOrderItemProps = {
  preOrderItem: UpdateStockType;
  onClickEmailButton: (item: UpdateStockType) => void;
  onClickIgnoreButton: (item: UpdateStockType) => void;
};

const AvailablePreOrderItem = (props: AvailablePreOrderItemProps) => {
  const theme = useTheme();
  const { preOrderItem, onClickEmailButton, onClickIgnoreButton } = props;
  const { customerData, productData } = preOrderItem;

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell style={{ minWidth: 200 }}>
        {productData.map((product) => (
          <div key={product._id}>
            <Moment format="YYYY-MM-DD hh:mm:ss">{product.updatedAt}</Moment>
          </div>
        ))}
      </TableCell>
      <TableCell style={{ minWidth: 250 }}>
        <ul>
          {productData.map((product) => (
            <li key={product._id}>{product.productName}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>
        <ul style={{ listStyleType: "circle" }}>
          {Array.isArray(customerData) ? (
            customerData.map((customer, index) => (
              <li key={index}>{customer.companyName}</li>
            ))
          ) : (
            <li>{customerData.companyName}</li>
          )}
        </ul>
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>
        <ul style={{ listStyleType: "circle" }}>
          {Array.isArray(customerData) ? (
            customerData.map((customer, index) => (
              <li key={index}>{customer.companyEmail}</li>
            ))
          ) : (
            <li>{customerData.companyEmail}</li>
          )}
        </ul>
      </TableCell>
      <TableCell>
        <OptionsTableData>
          <ActionButton
            startIcon={<MailSharpIcon />}
            background={theme.palette.secondary}
            title="Send"
            onClick={() => onClickEmailButton(preOrderItem)}
          />
          <IgnoreButton
            variant="contained"
            color="warning"
            onClick={() => onClickIgnoreButton(preOrderItem)}
          >
            Ignore
          </IgnoreButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default AvailablePreOrderItem;
