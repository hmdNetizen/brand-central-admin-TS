import React, { useState, useEffect } from "react";
import { salespersonOrdersColumns } from "src/lib/dataset/tableData";
import Tables from "src/components/table/Tables";
import SalespersonDetailsOrderItem from "../../orders/SalespersonDetailsOrderItem";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";
import { useActions } from "src/hooks/useActions";

type SaleespersonCustomerOrderDetailsTableProps = {
  loading: boolean;
  salespersonCustomerOrders: Array<SalespersonOrderResponsePayload>;
  total: number;
  customerId: string | undefined;
};

const SaleespersonCustomerOrderDetailsTable = (
  props: SaleespersonCustomerOrderDetailsTableProps
) => {
  const { loading, salespersonCustomerOrders, total, customerId } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { getSalespersonCustomerOrders } = useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (customerId) {
      getSalespersonCustomerOrders({
        customerId,
        limit: rowsPerPage,
        page: page + 1,
      });
    }
  }, [page, rowsPerPage, customerId]);

  return (
    <Tables
      headerColumns={salespersonOrdersColumns}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      total={total}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      loading={loading}
      notFoundText="No Order found for this salesperson"
      loaderHeight="50vh"
    >
      {!loading &&
        salespersonCustomerOrders.map((order) => {
          return <SalespersonDetailsOrderItem key={order.id} order={order} />;
        })}
    </Tables>
  );
};

export default SaleespersonCustomerOrderDetailsTable;
