import React from "react";
import CustomInfoTable from "./CustomInfoTable";
import { ordersColumns } from "src/lib/dataset/tableData";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button, { ButtonProps } from "@mui/material/Button";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { RecentOrdersReturnedPayload } from "src/services/orders/OrderTypes";
import { LinkProps } from "react-router-dom";

const StyledButton = styled(Button)<
  ButtonProps & { component: React.ElementType; to: LinkProps["to"] }
>(({ theme }) => ({
  textTransform: "none",
  background: theme.palette.secondary.dark,
  fontSize: "1.25rem",
  borderRadius: 20,
  padding: ".5rem .8rem",

  "&:hover": {
    background: theme.palette.secondary.light,
  },
}));

const DashboardOrdersTable = () => {
  const { loadingOrders, recentOrders } = useTypedSelector(
    (state) => state.orders
  );
  return (
    <CustomInfoTable
      heading="Recent Order(s)"
      dataset={recentOrders}
      headerColumns={ordersColumns}
      notFoundText="There are no recent orders"
      loading={loadingOrders}
    >
      {!loadingOrders &&
        recentOrders.length > 0 &&
        recentOrders.map((order: RecentOrdersReturnedPayload) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
            <TableCell>{order.orderId}</TableCell>
            <TableCell style={{ minWidth: 200 }}>
              <Moment format="D MMM YYYY hh:mm:ss" withTitle>
                {order.orderDate}
              </Moment>
            </TableCell>
            <TableCell style={{ minWidth: 120 }}>
              <StyledButton
                variant="contained"
                color="primary"
                component={Link}
                to={`/orders/${order._id}`}
              >
                View Details
              </StyledButton>
            </TableCell>
          </TableRow>
        ))}
    </CustomInfoTable>
  );
};

export default DashboardOrdersTable;
