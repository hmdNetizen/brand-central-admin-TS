import React, { useState } from "react";
import { customerOrderColumns } from "src/lib/dataset/tableData";
import Tables from "components/table/Tables";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Moment from "react-moment";
import { Link, LinkProps } from "react-router-dom";

const OrderStatus = styled(Typography)({
  padding: ".5rem .5rem",
  textAlign: "center",
  borderRadius: 20,
  fontWeight: 700,
});

const StyledButton = styled(Button)<{
  component: React.ElementType;
  to: LinkProps["to"];
}>({
  borderRadius: 20,
  fontSize: "1.25rem",
  fontWeight: 500,
  textTransform: "none",
});

const CustomerOrdersTable = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { loadingCustomerOrders, customerOrders } = useSelector(
    (state) => state.orders
  );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Tables
      headerColumns={customerOrderColumns}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      total={customerOrders.length}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      loading={loadingCustomerOrders}
      notFoundText="No Order found for this customer"
      loaderHeight="50vh"
    >
      {!loadingCustomerOrders &&
        customerOrders
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((order, index) => {
            const { orderId, orderDate, orderStatus, orderPaymentAmount } =
              order;
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
          })}
    </Tables>
  );
};

export default CustomerOrdersTable;
