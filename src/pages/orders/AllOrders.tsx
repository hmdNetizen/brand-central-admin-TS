import React, { useEffect, useState } from "react";
import OrderPageDisplay from "./OrderPageDisplay";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

const AllOrders = () => {
  useTitle("Admin : Find all orders");

  const loadingOrders = useTypedSelector((state) => state.orders.loadingOrders);
  const orders = useTypedSelector((state) => state.orders.orders);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openDeliveryStatus, setOpenDeliveryStatus] = useState(false);
  const [openEmailCustomer, setOpenEmailCustomer] = useState(false);

  const { fetchAllOrders } = useActions();

  //   eslint-disable-next-line
  //   const debounceFilteredOrders = useCallback(
  //     debounce(handleFilteredOrdersData, 500),
  //     []
  //   );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    // debounceFilteredOrders({
    //   orderData: orders,
    //   text: event.target.value,
    // });
    setPage(0);
  };

  useEffect(() => {
    fetchAllOrders({
      page: page + 1,
      limit: rowsPerPage,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <OrderPageDisplay
      title="Orders"
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

export default AllOrders;
