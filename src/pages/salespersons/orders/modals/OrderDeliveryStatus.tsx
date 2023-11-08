import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomSelect from "src/utils/CustomSelect";
import CustomTextArea from "src/utils/CustomTextArea";
import { useActions } from "src/hooks/useActions";
import { SelectChangeEvent } from "@mui/material";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  FormContainer,
  SubmitButton,
  StyledCircularProgress,
  CancelButton,
} from "../../../orders/modals/styles/DeliverStatusStyles";
import {
  OrderPaymentStatusTypes,
  OrderStatusTypes,
} from "src/services/orders/OrderTypes";

const initialState: InitialStateType = {
  orderPaymentStatus: "",
  orderStatus: "",
  orderNote: "",
};

type InitialStateType = {
  orderPaymentStatus: OrderPaymentStatusTypes;
  orderStatus: OrderStatusTypes;
  orderNote: string;
};

type SalespersonOrderDeliveryStatusType = {
  openDeliveryStatus: boolean;
  setOpenDeliveryStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const SalespersonOrderDeliveryStatus = (
  props: SalespersonOrderDeliveryStatusType
) => {
  const { openDeliveryStatus, setOpenDeliveryStatus } = props;
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [orderData, setOrderData] = useState<InitialStateType>(initialState);

  const [orderPaymentStatusError, setOrderPaymentStatusError] = useState("");
  const [orderStatusError, setOrderStatusError] = useState("");

  const { orderPaymentStatus, orderStatus, orderNote } = orderData;

  const singleOrder = useTypedSelector(
    (state) => state.salespersonOrders.singleOrder
  );
  const loadingOrderAction = useTypedSelector(
    (state) => state.salespersonOrders.loadingOrderAction
  );

  const { updateSalespersonOrderStatus } = useActions();

  const handleChange = (
    event: SelectChangeEvent<unknown> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setOrderData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "orderPaymentStatus":
        if (!value) {
          setOrderPaymentStatusError("Select order payment status");
        } else {
          setOrderPaymentStatusError("");
        }
        break;
      case "orderStatus":
        if (!value) {
          setOrderStatusError("Select order delivery status");
        } else {
          setOrderStatusError("");
        }
        break;
      default:
        setOrderPaymentStatusError("");
        setOrderStatusError("");
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!orderPaymentStatus && !orderStatus) {
      setOrderPaymentStatusError("Select order payment status");
      setOrderStatusError("Select order delivery status");
      return;
    }

    if (!orderPaymentStatus) {
      setOrderPaymentStatusError("Select order payment status");
      return;
    }

    if (!orderStatus) {
      setOrderStatusError("Select order delivery status");
      return;
    }

    if (orderPaymentStatusError || orderStatusError) return;

    updateSalespersonOrderStatus({
      orderId: singleOrder?.id!,
      setOpen: setOpenDeliveryStatus,
      orderStatus,
      paymentStatus: orderPaymentStatus,
    });
  };

  useEffect(() => {
    if (singleOrder) {
      const newOrderData = { ...initialState };
      for (const key in singleOrder) {
        if (key in newOrderData) {
          // @ts-expect-error
          newOrderData[key as keyof InitialStateType] =
            singleOrder[key as keyof InitialStateType];
        }

        setOrderData(newOrderData);
      }
    }
  }, [singleOrder]);

  return (
    <ShowDialog
      openModal={openDeliveryStatus}
      width={matchesXS ? "95%" : matchesSM ? 500 : 600}
      handleClose={() => setOpenDeliveryStatus(false)}
    >
      <Grid container direction="column">
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            p: "1rem 2rem",
            background: "#f7f7f7",
          }}
        >
          <Grid item alignSelf="center">
            <Typography variant="h4" style={{ marginBottom: 0 }}>
              Delivery Status
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setOpenDeliveryStatus(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <FormContainer
          item
          container
          direction="column"
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item container pb={2}>
            <CustomSelect
              options={["paid", "unpaid", "processing"]}
              name="orderPaymentStatus"
              value={orderPaymentStatus}
              onChange={handleChange}
              label="Payment Status"
              placeholder="Select Payment Status"
              errorMessage={orderPaymentStatusError}
            />
          </Grid>
          <Grid item container pb={2}>
            <CustomSelect
              options={["pending", "processing", "completed", "declined"]}
              name="orderStatus"
              value={orderStatus}
              onChange={handleChange}
              label="Delivery Status"
              placeholder="Select Payment Status"
              errorMessage={orderStatusError}
            />
          </Grid>

          <Grid item container>
            <CustomTextArea
              name="orderNote"
              label="Track Note"
              id="orderNote"
              value={orderNote}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={1}
            style={{ marginTop: "5rem" }}
          >
            <Grid item>
              <CancelButton onClick={() => setOpenDeliveryStatus(false)}>
                Cancel
              </CancelButton>
            </Grid>
            <Grid item>
              <SubmitButton
                type="submit"
                variant="contained"
                disableRipple
                color="secondary"
                disabled={loadingOrderAction}
              >
                {loadingOrderAction && (
                  <StyledCircularProgress style={{ height: 25, width: 25 }} />
                )}{" "}
                Save
              </SubmitButton>
            </Grid>
          </Grid>
        </FormContainer>
      </Grid>
    </ShowDialog>
  );
};

export default SalespersonOrderDeliveryStatus;
