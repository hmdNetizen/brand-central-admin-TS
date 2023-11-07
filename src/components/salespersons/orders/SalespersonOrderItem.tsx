import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import Moment from "react-moment";
import { capitalizeFirstLetters } from "src/lib/helpers";
import CustomSalespersonOrderOptions from "./CustomSalespersonOrderOptions";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useActions } from "src/hooks/useActions";
import {
  CompletedButton,
  OptionsTableData,
  StyledChip,
  StyledIconButton,
} from "../../orders/styles/OrderItemStyles";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";

type OrderItemProps = {
  order: SalespersonOrderResponsePayload;
  setOpenDeliveryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEmailCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

const SalespersonOrderItem = (props: OrderItemProps) => {
  const {
    order,
    setOpenDeliveryStatus,
    setOpenEmailCustomer,
    setOpenDeleteOrder,
  } = props;
  const theme = useTheme();

  const { markOrderStatusAsCompleted, setCurrentSalespersonOrder } =
    useActions();

  const {
    orderDate,
    orderId,
    ordersProducts,
    orderPaymentAmount,
    orderStatus,
    placedBy: { fullName },
    orderedFor: { companyName },
  } = order;

  const handleMarkAsCompleted = (order: SalespersonOrderResponsePayload) => {
    markOrderStatusAsCompleted(order.id);
  };

  const handleDeleteOrder = (order: SalespersonOrderResponsePayload) => {
    setCurrentSalespersonOrder(order);
    setOpenDeleteOrder(true);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell style={{ minWidth: 200 }}>
        <Moment format="YYYY-MM-DD hh:mm:ss">{orderDate}</Moment>
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>{orderId}</TableCell>
      <TableCell style={{ minWidth: 200 }}>{fullName}</TableCell>
      <TableCell style={{ minWidth: 250 }}>{companyName}</TableCell>
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
          <CustomSalespersonOrderOptions
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

export default SalespersonOrderItem;
