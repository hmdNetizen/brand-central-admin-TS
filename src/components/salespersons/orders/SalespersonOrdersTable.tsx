import React, { useState, useEffect } from "react";
import { salespersonOrdersColumns } from "src/lib/dataset/tableData";
import Tables from "src/components/table/Tables";
import SalespersonDetailsOrderItem from "./SalespersonDetailsOrderItem";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";
import { useActions } from "src/hooks/useActions";

type SalespersonOrdersTableProps = {
  loading: boolean;
  salespersonOrders: Array<SalespersonOrderResponsePayload>;
  total: number;
  salespersonId: string | undefined;
};

const SalespersonOrdersTable = (props: SalespersonOrdersTableProps) => {
  const { loading, salespersonOrders, total, salespersonId } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { getSingleSalespersonOrders } = useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getSingleSalespersonOrders({
      page: page + 1,
      limit: rowsPerPage,
      salespersonId: salespersonId!,
    });
  }, [page, rowsPerPage, salespersonId]);

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
        salespersonOrders.map((order) => {
          return <SalespersonDetailsOrderItem key={order.id} order={order} />;
        })}
    </Tables>
  );
};

export default SalespersonOrdersTable;
