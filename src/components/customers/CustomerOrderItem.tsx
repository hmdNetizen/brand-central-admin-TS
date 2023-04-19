import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Moment from "react-moment";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import { OrderStatus, StyledButton } from "./styles/CustomerOrderItemStyles";

type CustomerOrderItemProps = {
  order: OrderReturnedPayload;
};

const CustomerOrderItem = (props: CustomerOrderItemProps) => {
  const { order } = props;
  const theme = useTheme();
  const { orderId, orderDate, orderPaymentAmount, orderStatus } = order;

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{orderId}</TableCell>
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
          to={`/admin/orders/${order.id}`}
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
          to={`/admin/orders/${order.id}/invoice`}
        >
          View Invoice
        </StyledButton>
      </TableCell>
    </TableRow>
  );
};

export default CustomerOrderItem;
