import React, { useEffect, useState, useCallback } from "react";
import OrderPageDisplay from "./OrderPageDisplay";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";
import debounce from "lodash.debounce";

const PendingOrders = () => {
  useTitle("Admin : Find all orders");

  const loadingOrders = useTypedSelector((state) => state.orders.loadingOrders);
  const orders = useTypedSelector((state) => state.orders.orders);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openDeliveryStatus, setOpenDeliveryStatus] = useState(false);
  const [openEmailCustomer, setOpenEmailCustomer] = useState(false);

  const { fetchAllOrders, getAllSearchedOrders } = useActions();

  //   eslint-disable-next-line
  const debounceSearchedOrders = useCallback(
    debounce(getAllSearchedOrders, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setPage(0);
    debounceSearchedOrders({
      limit: rowsPerPage,
      page: page + 1,
      status: "pending",
      searchTerm: event.target.value,
    });
  };

  useEffect(() => {
    fetchAllOrders({
      page: page + 1,
      limit: rowsPerPage,
      status: "pending",
    });
  }, [page, rowsPerPage]);

  return (
    <OrderPageDisplay
      title="Pending Orders"
      onChange={handleSearch}
      openDeliveryStatus={openDeliveryStatus}
      openEmailCustomer={openEmailCustomer}
      orderDataset={orders}
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

export default PendingOrders;
