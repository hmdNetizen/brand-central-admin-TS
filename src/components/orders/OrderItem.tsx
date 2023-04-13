import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import Moment from "react-moment";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import { capitalizeFirstLetters } from "src/lib/helpers";
import CustomOrderOptions from "./CustomOrderOptions";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useActions } from "src/hooks/useActions";
import {
  CompletedButton,
  OptionsTableData,
  StyledChip,
  StyledIconButton,
} from "./styles/OrderItemStyles";

type OrderItemProps = {
  order: OrderReturnedPayload;
  setOpenDeliveryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEmailCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderItem = (props: OrderItemProps) => {
  const {
    order,
    setOpenDeliveryStatus,
    setOpenEmailCustomer,
    setOpenDeleteOrder,
  } = props;
  const theme = useTheme();

  const { markOrderStatusAsCompleted, setCurrentOrder } = useActions();

  const {
    orderDate,
    orderId,
    ordersProducts,
    orderPaymentAmount,
    orderStatus,
    ordersCustomer: { email },
  } = order;

  const handleMarkAsCompleted = (order: OrderReturnedPayload) => {
    markOrderStatusAsCompleted(order.id);
  };

  const handleDeleteOrder = (order: OrderReturnedPayload) => {
    setCurrentOrder(order);
    setOpenDeleteOrder(true);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell style={{ minWidth: 200 }}>
        <Moment format="YYYY-MM-DD hh:mm:ss">{orderDate}</Moment>
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>{orderId}</TableCell>
      <TableCell style={{ minWidth: 250 }}>{email}</TableCell>
      <TableCell style={{ minWidth: 100 }} align="center">
        {ordersProducts.length}
      </TableCell>
      <TableCell style={{ minWidth: 120 }} align="center">
        {orderPaymentAmount.toFixed(2)}
      </TableCell>
      <TableCell align="center">
        <StyledChip
          label={capitalizeFirstLetters(orderStatus)}
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
        />
      </TableCell>
      <TableCell>
        <OptionsTableData>
          <CustomOrderOptions
            order={order}
            setOpenDeliveryStatus={setOpenDeliveryStatus}
            setOpenEmailCustomer={setOpenEmailCustomer}
          />
          <StyledIconButton onClick={() => handleDeleteOrder(order)}>
            <DeleteSharpIcon />
          </StyledIconButton>
          {orderStatus !== "completed" && orderStatus !== "declined" && (
            <CompletedButton
              variant="contained"
              disableRipple
              onClick={() => handleMarkAsCompleted(order)}
            >
              Mark Completed
            </CompletedButton>
          )}
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default OrderItem;
