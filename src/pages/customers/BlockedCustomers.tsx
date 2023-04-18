import React, { useState, useCallback, useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import debounce from "lodash.debounce";
import CustomerPageLayout from "./CustomersPageLayout";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const BlockedCustomers = () => {
  useTitle("Admin : List of all blocked customers");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  const loadingCustomers = useTypedSelector(
    (state) => state.customers.loadingCustomers
  );
  const customers = useTypedSelector((state) => state.customers.customers);

  const { getAllCustomers, getSearchedCustomers } = useActions();

  const debounceFilteredCustomers = useCallback(
    debounce(getSearchedCustomers, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceFilteredCustomers({
      page: page + 1,
      limit: rowsPerPage,
      isBlocked: true,
      searchTerm: event.target.value,
    });
  };

  useEffect(() => {
    getAllCustomers({
      page: page + 1,
      limit: rowsPerPage,
      isBlocked: true,
    });

    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <CustomerPageLayout
      title="Blocked Customers"
      filterText={filterText}
      // setFilterText={setFilterText}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      openDeleteCustomer={openDeleteCustomer}
      setOpenDeleteCustomer={setOpenDeleteCustomer}
      openEditCustomer={openEditCustomer}
      setOpenEditCustomer={setOpenEditCustomer}
      onChange={handleSearch}
      openEmail={openEmail}
      setOpenEmail={setOpenEmail}
      customerDataset={customers}
    />
  );
};

export default BlockedCustomers;
