import React, { useEffect, useState, useCallback } from "react";
import SalespersonOrderPageDisplay from "../utils/SalespersonOrderPageLayout";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";
import debounce from "lodash.debounce";

const SalespeopleOrders = () => {
  useTitle("Admin : Find all sales rep's orders");

  const loadingOrders = useTypedSelector(
    (state) => state.salespersonOrders.loadingOrders
  );
  const salespersonOrders = useTypedSelector(
    (state) => state.salespersonOrders.salespersonOrders
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openDeliveryStatus, setOpenDeliveryStatus] = useState(false);
  const [openEmailCustomer, setOpenEmailCustomer] = useState(false);

  const { getAllSalespersonsOrders, getAllSearchedSalespersonsOrders } =
    useActions();

  const debounceSearchedOrders = useCallback(
    debounce(getAllSearchedSalespersonsOrders, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setPage(0);
    debounceSearchedOrders({
      limit: rowsPerPage,
      page: page + 1,
      searchTerm: event.target.value,
    });
  };

  useEffect(() => {
    if (!filterText) {
      getAllSalespersonsOrders({
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      debounceSearchedOrders({
        limit: rowsPerPage,
        page: page + 1,
        searchTerm: filterText,
      });
    }
  }, [page, rowsPerPage, filterText]);

  return (
    <SalespersonOrderPageDisplay
      title="Sales Rep's Orders"
      onChange={handleSearch}
      openDeliveryStatus={openDeliveryStatus}
      openEmailCustomer={openEmailCustomer}
      orderDataset={salespersonOrders}
      filterText={filterText}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage.toString()}
      setOpenDeliveryStatus={setOpenDeliveryStatus}
      setOpenEmailCustomer={setOpenEmailCustomer}
      setRowsPerPage={setRowsPerPage}
      loading={loadingOrders}
    />
  );
};

export default SalespeopleOrders;
