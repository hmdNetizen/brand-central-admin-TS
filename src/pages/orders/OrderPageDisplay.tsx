import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { allOrdersCategoryColumns } from "src/lib/dataset/tableData";
import EmailCustomerOrder from "./modals/EmailCustomerOrder";
import DeliveryStatus from "./modals/DeliveryStatus";
import { useActions } from "src/hooks/useActions";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import DeleteOrder from "./modals/DeleteOrder";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import { SelectChangeEvent } from "@mui/material";
import { Container, ContainerWrapper } from "./styles/OrderPageDisplayStyles";
import OrderItem from "src/components/orders/OrderItem";
import PageHeadingActions from "src/components/common/PageHeadingActions";

type OrderPageDisplayProps = {
  title: string;
  filterText: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: string;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  openDeliveryStatus: boolean;
  setOpenDeliveryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  openEmailCustomer: boolean;
  setOpenEmailCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  orderDataset: OrderReturnedPayload[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

const OrderPageDisplay = (props: OrderPageDisplayProps) => {
  const {
    title,
    filterText,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    openDeliveryStatus,
    setOpenDeliveryStatus,
    openEmailCustomer,
    setOpenEmailCustomer,
    orderDataset,
    onChange,
    loading,
  } = props;
  const theme = useTheme();

  const loadingOrderAction = useTypedSelector(
    (state) => state.orders.loadingOrderAction
  );
  const totalOrders = useTypedSelector((state) => state.orders.totalOrders);

  const [openDeleteOrder, setOpenDeleteOrder] = useState(false);

  const { markOrderStatusAsCompleted, setCurrentOrder } = useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectRowsPerPage = (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ): void => {
    const selectEvent = event as SelectChangeEvent<HTMLInputElement>;
    setRowsPerPage(+selectEvent.target.value);
    setPage(0);
  };

  const handleLoadingOrders = () => {
    return !loadingOrderAction;
  };

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          {title}
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingActions
          filterText={filterText}
          onChange={onChange}
          rowsPerPage={rowsPerPage}
          handleSelectRowsPerPage={handleSelectRowsPerPage}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={allOrdersCategoryColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={+rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={totalOrders}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
            notFoundText="No Order found"
          >
            {!loading &&
              orderDataset.map((order) => {
                return (
                  <OrderItem
                    key={order.id}
                    order={order}
                    setOpenDeleteOrder={setOpenDeleteOrder}
                    setOpenDeliveryStatus={setOpenDeliveryStatus}
                    setOpenEmailCustomer={setOpenEmailCustomer}
                  />
                );
              })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      <DeliveryStatus
        openDeliveryStatus={openDeliveryStatus}
        setOpenDeliveryStatus={setOpenDeliveryStatus}
      />
      <EmailCustomerOrder
        open={openEmailCustomer}
        setOpen={setOpenEmailCustomer}
      />
      <CustomLoadingDialog
        loading={loadingOrderAction}
        handleLoading={handleLoadingOrders}
      />
      <DeleteOrder
        openDeleteOrder={openDeleteOrder}
        setOpenDeleteOrder={setOpenDeleteOrder}
      />
    </Container>
  );
};

export default OrderPageDisplay;
