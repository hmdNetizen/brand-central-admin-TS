import React, { useState, useCallback, useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import debounce from "lodash.debounce";
import CustomerPageLayout from "./CustomersPageLayout";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Customers = () => {
  useTitle("Admin : List of all customers");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");

  const customers = useTypedSelector((state) => state.customers.customers);

  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  const { getAllCustomers, getSearchedCustomers } = useActions();

  const debounceFilteredCustomers = useCallback(
    debounce(getSearchedCustomers, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceFilteredCustomers({
      searchTerm: event.target.value.trim(),
      page: page + 1,
      limit: rowsPerPage,
    });
  };

  useEffect(() => {
    if (!filterText) {
      getAllCustomers({
        limit: rowsPerPage,
        page: page + 1,
      });
    }

    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <CustomerPageLayout
      title="Customers"
      filterText={filterText}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      openDeleteCustomer={openDeleteCustomer}
      setOpenDeleteCustomer={setOpenDeleteCustomer}
      openEditCustomer={openEditCustomer}
      setOpenEditCustomer={setOpenEditCustomer}
      openEmail={openEmail}
      setOpenEmail={setOpenEmail}
      onChange={handleSearch}
      customerDataset={customers.filter((customer) => !customer.isBlocked)}
    />
  );
};

export default Customers;
