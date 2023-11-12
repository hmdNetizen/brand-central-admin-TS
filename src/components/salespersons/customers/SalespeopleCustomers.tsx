import React, { useEffect, useState } from "react";
import Tables from "src/components/table/Tables";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { salespeopleCustomersColumns } from "src/lib/dataset/tableData";
import SalespeopleCustomerItem from "./SalespeopleCustomerItem";

type SalespeopleCustomersProps = {
  setOpenEditSalespersonCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteSalespersonCustomer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const SalespeopleCustomers = (props: SalespeopleCustomersProps) => {
  const { setOpenEditSalespersonCustomer, setOpenDeleteSalespersonCustomer } =
    props;

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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Tables
      headerColumns={salespeopleCustomersColumns}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      total={totalCustomers}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      loading={loadingSalespersonCustomers}
      notFoundText="No salespeople's customers found"
      loaderHeight="50vh"
    >
      {!loadingSalespersonCustomers &&
        salespersonCustomers.map((customer) => {
          return (
            <SalespeopleCustomerItem
              key={customer.id}
              customer={customer}
              setOpenEditSalespersonCustomer={setOpenEditSalespersonCustomer}
              setOpenDeleteSalespersonCustomer={
                setOpenDeleteSalespersonCustomer
              }
            />
          );
        })}
    </Tables>
  );
};

export default SalespeopleCustomers;
