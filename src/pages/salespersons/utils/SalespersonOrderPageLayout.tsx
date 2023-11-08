import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { salespersonOrdersCategoryColumns } from "src/lib/dataset/tableData";
import SalespersonOrderDeliveryStatus from "../orders/modals/OrderDeliveryStatus";
// import DeleteOrder from "./modals/DeleteOrder";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SelectChangeEvent } from "@mui/material";
import SalespersonOrderItem from "src/components/salespersons/orders/SalespersonOrderItem";
import PageHeadingActions from "src/components/common/PageHeadingActions";
import ErrorDialog from "src/utils/ErrorDialog";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";

type OrdersTitle =
  | "Sales Rep's Orders"
  | "Sales Rep's Pending Orders"
  | "Sales Rep's Processing Orders"
  | "Sales Rep's Completed Orders"
  | "Sales Rep's Declined Orders";

type SalespersonOrderPageLayoutProps = {
  title: OrdersTitle;
  filterText: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: string;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  openDeliveryStatus: boolean;
  setOpenDeliveryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  openEmailCustomer: boolean;
  setOpenEmailCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  orderDataset: Array<SalespersonOrderResponsePayload>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

const SalespersonOrderPageLayout = (props: SalespersonOrderPageLayoutProps) => {
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
  const error = useTypedSelector((state) => state.orders.error);
  const totalOrders = useTypedSelector(
    (state) => state.salespersonOrders.totalOrders
  );

  const [openDeleteOrder, setOpenDeleteOrder] = useState(false);

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
            headerColumns={salespersonOrdersCategoryColumns}
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
                  <SalespersonOrderItem
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
      <SalespersonOrderDeliveryStatus
        openDeliveryStatus={openDeliveryStatus}
        setOpenDeliveryStatus={setOpenDeliveryStatus}
      />
      <CustomLoadingDialog
        loading={loadingOrderAction}
        handleLoading={handleLoadingOrders}
      />
      {/* <DeleteOrder
        openDeleteOrder={openDeleteOrder}
        setOpenDeleteOrder={setOpenDeleteOrder}
      /> */}
      <ErrorDialog error={error} />
    </Container>
  );
};

export default SalespersonOrderPageLayout;
