import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import CustomSelect from "src/utils/CustomSelect";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import Tables from "src/components/table/Tables";
import { allOrdersCategoryColumns } from "src/lib/dataset/tableData";
import EmailCustomerOrder from "./modals/EmailCustomerOrder";
import Moment from "react-moment";
import CustomOrderOptions from "src/components/orders/CustomOrderOptions";
import DeliveryStatus from "./modals/DeliveryStatus";
import Chip from "@mui/material/Chip";
import { capitalizeFirstLetters } from "src/lib/helpers";
import { useActions } from "src/hooks/useActions";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import DeleteOrder from "./modals/DeleteOrder";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import { SelectChangeEvent } from "@mui/material";

const Container = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem 5rem 2rem",

  [theme.breakpoints.only("xs")]: {
    padding: "5rem 1rem 5rem 1rem",
  },
}));

const ContainerWrapper = styled(Grid)(({ theme }) => ({
  background: "#fff",
  padding: "2rem 3rem",
  borderRadius: 5,

  [theme.breakpoints.only("xs")]: {
    padding: "2rem 1rem",
  },
}));

const Input = styled("input")(({ theme }) => ({
  fontSize: "1.6rem",
  borderRadius: 5,
  border: `1px solid ${theme.palette.common.lighterGrey}`,
  padding: "1rem 1rem",
  width: "100%",

  "&:focus": {
    outline: "none",
  },
}));

const ActionButton = styled(Button)({
  minWidth: 64,
  padding: "1rem 1.5rem",
  borderRadius: "2rem",
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.error.main,
  width: 35,
  height: 35,

  "&:hover": {
    background: theme.palette.error.light,
  },

  "&:active": {
    background: theme.palette.error.dark,
  },

  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
}));

const OptionsTableData = styled("div")({
  minWidth: 250,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridColumnGap: "1rem",
});

const StyledChip = styled(Chip)({
  padding: ".5rem .5rem",
  textAlign: "center",
  fontWeight: 700,
  fontSize: "1.5rem",
});

const CompletedButton = styled(Button)(({ theme }) => ({
  fontSize: "1.2rem",
  minWidth: 120,
  paddingLeft: ".25rem",
  paddingRight: ".25rem",
  textTransform: "none",
  borderRadius: 20,
  background: theme.palette.success.dark,

  "&:hover": {
    background: theme.palette.success.main,
  },

  "&:active": {
    background: theme.palette.success.dark,
  },
}));

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

  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleMarkAsCompleted = (order: OrderReturnedPayload) => {
    markOrderStatusAsCompleted(order.id);
  };

  const handleLoadingOrders = () => {
    return !loadingOrderAction;
  };

  const handleDeleteOrder = (order: OrderReturnedPayload) => {
    setCurrentOrder(order);
    setOpenDeleteOrder(true);
  };

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          {title}
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <Grid
          container
          direction={matchesSM ? "column" : "row"}
          rowSpacing={matchesSM ? 2 : matchesMD ? 3 : 0}
          alignItems="center"
          justifyContent={matchesMD ? "space-between" : undefined}
        >
          <Grid
            item
            style={{ marginRight: matchesSM ? 0 : matchesMD ? 0 : "20rem" }}
          >
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2">Show</Typography>
              </Grid>
              <Grid item style={{ marginRight: 5, marginLeft: 5 }}>
                <CustomSelect
                  style={{ width: "100%" }}
                  options={[10, 25, 50, 100]}
                  value={rowsPerPage}
                  onChange={handleSelectRowsPerPage}
                  hasLabel={false}
                />
              </Grid>
              <Grid item>
                <Typography variant="body2">entries</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            justifySelf="center"
            style={{ width: matchesSM ? "100%" : 350 }}
          >
            <Input
              placeholder="Search by order number or status..."
              value={filterText}
              onChange={onChange}
            />
          </Grid>
        </Grid>
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
              orderDataset
                .slice(
                  page * +rowsPerPage,
                  page * Number(rowsPerPage) + Number(rowsPerPage)
                )
                .map((order) => {
                  const {
                    id,
                    orderId,
                    orderDate,
                    orderStatus,
                    orderPaymentAmount,
                    ordersCustomer: { email },
                    ordersProducts,
                  } = order;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      <TableCell style={{ minWidth: 200 }}>
                        <Moment format="YYYY-MM-DD hh:mm:ss">
                          {orderDate}
                        </Moment>
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{orderId}</TableCell>
                      <TableCell style={{ minWidth: 250 }}>
                        {order && email}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }} align="center">
                        {ordersProducts.length}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }} align="center">
                        {orderPaymentAmount.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <StyledChip
                          label={capitalizeFirstLetters(orderStatus)}
                          style={{
                            background:
                              orderStatus === "pending"
                                ? theme.palette.warning.light
                                : orderStatus === "declined"
                                ? theme.palette.error.light
                                : orderStatus === "completed"
                                ? theme.palette.success.light
                                : theme.palette.common.lightGreen,
                            color:
                              orderStatus === "processing"
                                ? theme.palette.success.dark
                                : "#fff",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <OptionsTableData>
                          <CustomOrderOptions
                            order={order}
                            setOpenDeliveryStatus={setOpenDeliveryStatus}
                            setOpenEmailCustomer={setOpenEmailCustomer}
                          />
                          <StyledIconButton
                            onClick={() => handleDeleteOrder(order)}
                          >
                            <DeleteSharpIcon />
                          </StyledIconButton>
                          {orderStatus !== "completed" &&
                            orderStatus !== "declined" && (
                              <CompletedButton
                                variant="contained"
                                disableRipple
                                onClick={() => handleMarkAsCompleted(order)}
                              >
                                Mark Completed
                              </CompletedButton>
                            )}
                        </OptionsTableData>
                      </TableCell>
                    </TableRow>
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
