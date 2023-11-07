import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Moment from "react-moment";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  OrderStatus,
  StyledButton,
} from "../styles/SalespersonDetailsOrderItemStyles";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";

type SalespersonDetailsOrderItemProps = {
  order: SalespersonOrderResponsePayload;
};

const SalespersonDetailsOrderItem = (
  props: SalespersonDetailsOrderItemProps
) => {
  const { order } = props;
  const theme = useTheme();
  const { orderId, orderDate, orderPaymentAmount, orderStatus, orderedFor } =
    order;

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{orderId}</TableCell>
      <TableCell>{orderedFor.companyName}</TableCell>
      <TableCell style={{ minWidth: 200 }}>
        <Moment format="YYYY-MM-DD hh:mm:ss">{orderDate}</Moment>
      </TableCell>
      <TableCell>${orderPaymentAmount.toFixed(2)}</TableCell>
      <TableCell>
        <OrderStatus
          variant="body2"
          style={{
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
        >
          {orderStatus}
        </OrderStatus>
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>
        <StyledButton
          variant="contained"
          color="secondary"
          component={Link}
          to={`/dashboard/salespeople/orders/${order.id}`}
        >
          View Details
        </StyledButton>
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>
        <StyledButton
          variant="contained"
          style={{
            background: theme.palette.common.lightGrey,
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
          component={Link}
          to={`/dashboard/salespeople/orders/${order.id}/invoice`}
        >
          View Invoice
        </StyledButton>
      </TableCell>
    </TableRow>
  );
};

export default SalespersonDetailsOrderItem;
