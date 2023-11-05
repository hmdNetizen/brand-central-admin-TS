import React, { useEffect, useState } from "react";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { salespersonCustomersColumns } from "src/lib/dataset/tableData";
import SalespersonCustomerItem from "./SalespersonCustomerItem";

type SalespersonCustomersProps = {
  salespersonId: string | undefined;
};

const SalespersonCustomers = ({ salespersonId }: SalespersonCustomersProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadingSalespersonCustomers = useTypedSelector(
    (state) => state.salespersonCustomers.loadingSalespersonCustomers
  );
  const totalCustomers = useTypedSelector(
    (state) => state.salespersonCustomers.totalCustomers
  );
  const salespersonCustomers = useTypedSelector(
    (state) => state.salespersonCustomers.salespersonCustomers
  );

  const { getSingleSalespersonCustomers } = useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getSingleSalespersonCustomers({
      page: page + 1,
      limit: rowsPerPage,
      salespersonId: salespersonId!,
    });
  }, []);

  return (
    <Tables
      headerColumns={salespersonCustomersColumns}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      total={totalCustomers}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      loading={loadingSalespersonCustomers}
      notFoundText="No customer found for this salesperson"
      loaderHeight="50vh"
    >
      {!loadingSalespersonCustomers &&
        salespersonCustomers.map((customer) => {
          return (
            <SalespersonCustomerItem
              key={customer.id}
              customer={customer}
              salespersonId={salespersonId}
            />
          );
        })}
    </Tables>
  );
};

export default SalespersonCustomers;
