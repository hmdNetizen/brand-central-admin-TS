import React from "react";
import CustomInfoTable from "./CustomInfoTable";
import { customerColumns } from "src/lib/dataset/tableData";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";
import { CustomerExcerptDataTypes } from "src/services/customers/CustomerTypes";
import { useTypedSelector } from "src/hooks/useTypedSelector";

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

const DashboardCustomersTable = () => {
  const { loadingCustomers, recentCustomers } = useTypedSelector(
    (state) => state.customers
  );

  return (
    <CustomInfoTable
      heading="Recent Customer(s)"
      headerColumns={customerColumns}
      dataset={recentCustomers}
      notFoundText="No Customer Found"
      loading={loadingCustomers}
    >
      {recentCustomers.length > 0 &&
        recentCustomers.map((customer: CustomerExcerptDataTypes) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={customer._id}>
            <TableCell>{customer.companyEmail}</TableCell>
            <TableCell style={{ minWidth: 200 }}>
              <Moment format="D MMM YYYY hh:mm:ss">{customer.createdAt}</Moment>
            </TableCell>
            <TableCell style={{ minWidth: 120 }}>
              <StyledButton
                variant="contained"
                color="primary"
                component={Link}
                to={`/customers/${customer._id}`}
              >
                View Details
              </StyledButton>
            </TableCell>
          </TableRow>
        ))}
    </CustomInfoTable>
  );
};

export default DashboardCustomersTable;
