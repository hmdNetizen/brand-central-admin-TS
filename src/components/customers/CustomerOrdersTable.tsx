import React, { useState } from "react";
import { customerOrderColumns } from "src/lib/dataset/tableData";
import Tables from "src/components/table/Tables";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import CustomerOrderItem from "./CustomerOrderItem";

type CustomerOrdersTableProps = {
  loading: boolean;
  customerOrders: OrderReturnedPayload[];
};

const CustomerOrdersTable = (props: CustomerOrdersTableProps) => {
  const { loading, customerOrders } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      loading={loading}
      notFoundText="No Order found for this customer"
      loaderHeight="50vh"
    >
      {!loading &&
        customerOrders
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((order) => {
            return <CustomerOrderItem key={order.id} order={order} />;
          })}
    </Tables>
  );
};

export default CustomerOrdersTable;
