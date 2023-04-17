import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
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

  const loadingCustomers = useTypedSelector(
    (state) => state.customers.loadingCustomers
  );
  const customers = useTypedSelector((state) => state.customers.customers);

  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  const { getAllCustomers } = useActions();

  //   eslint-disable-next-line
  // const debounceFilteredCustomers = useCallback(
  //   debounce(getAllFilteredCustomers, 500),
  //   []
  // );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);

    //   debounceFilteredCustomers({
    //     text: event.target.value.trim(),
    //     customerData: customers,
    //   });

    setPage(0);
  };

  useEffect(() => {
    getAllCustomers({
      limit: rowsPerPage,
      page,
      isBlocked: false,
    });

    // eslint-disable-next-line
  }, []);

  return (
    <CustomerPageLayout
      title="Customers"
      filterText={filterText}
      //   setFilterText={setFilterText}
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
      customerDataset={customers}
    />
  );
};

export default Customers;
