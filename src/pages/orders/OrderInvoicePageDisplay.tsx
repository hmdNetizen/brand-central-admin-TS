import React, { useState, useEffect, useMemo, Fragment } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import PreviousButton from "src/utils/PreviousButton";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import { Link, useParams, useLocation } from "react-router-dom";
import logo from "src/assets/images/logo-black.png";
import CustomIconButton from "src/utils/CustomIconButton";
import LocalPrintshopSharpIcon from "@mui/icons-material/LocalPrintshopSharp";
import Tables from "src/components/table/Tables";
import Divider from "@mui/material/Divider";
import { useActions } from "src/hooks/useActions";
import Spinner from "src/utils/Spinner";
import CustomerInvoicePersonalDetails from "src/components/orders/CustomerInvoicePersonalDetails";
import useTitle from "src/hooks/useTitle";
import { invoiceColumns } from "src/lib/dataset/tableData";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import OrderedProductsItem from "src/components/orders/OrderedProductsItem";
import OrderInvoiceDetails from "src/components/orders/OrderInvoiceDetails";
import { Container, ContentContainer, Logo } from "./styles/OrderInvoiceStyles";

const OrderInvoicePageDisplay = () => {
  useTitle("Admin : Orders | Order Invoice");
  const theme = useTheme();
  const { pathname } = useLocation();

  const { orderId } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(200);

  const loadingSingleOrder = useTypedSelector(
    (state) => state.orders.loadingSingleOrder
  );
  const singleOrder = useTypedSelector((state) => state.orders.singleOrder);

  const calculateTotal = useMemo(() => {
    return singleOrder?.ordersProducts.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.productTotalCost;
    }, 0);
  }, [singleOrder]);

  const { getSingleOrder } = useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getSingleOrder(orderId!);

    // eslint-disable-next-line
  }, [orderId]);

  useEffect(() => {
    if (singleOrder) {
      setRowsPerPage(singleOrder.ordersProducts.length);
    }
  }, [singleOrder]);

  return (
    <Container container direction="column" pathname={pathname}>
      {!pathname.includes("/invoice/print") && (
        <Fragment>
          <Grid item container alignItems="center" columnSpacing={1}>
            <Grid item>
              <PreviousButton path={`orders/${orderId}`} />
            </Grid>
            <Grid item>
              <Typography variant="h2">Order Invoice</Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            columnGap={0.5}
            style={{ paddingBottom: "2rem" }}
          >
            <Grid
              item
              component={Link}
              to={`/dashboard/orders`}
              style={{
                textDecoration: "none",
                color: theme.palette.secondary.dark,
              }}
            >
              <Typography variant="body2">Orders</Typography>
            </Grid>
            <KeyboardDoubleArrowRightSharpIcon color="secondary" />
            <Grid
              item
              component={Link}
              to={`/dashboard/orders/${orderId}`}
              style={{
                textDecoration: "none",
                color: theme.palette.secondary.dark,
              }}
            >
              <Typography variant="body2">Order Details</Typography>
            </Grid>
            <KeyboardDoubleArrowRightSharpIcon color="secondary" />
            <Grid
              item
              component={Link}
              to={`/dashboard/orders/${orderId}/invoice`}
              style={{
                textDecoration: "none",
                color: theme.palette.secondary.dark,
              }}
            >
              <Typography variant="body2">Invoice</Typography>
            </Grid>
          </Grid>
        </Fragment>
      )}

      {loadingSingleOrder ? (
        <Grid item container style={{ height: "100vh" }}>
          <Spinner loaderHeight="100%" />
        </Grid>
      ) : (
        !loadingSingleOrder &&
        singleOrder && (
          <ContentContainer item container direction="column">
            <Grid
              item
              container
              justifyContent="space-between"
              justifySelf="center"
              rowSpacing={3}
            >
              <Grid item alignSelf="center">
                <Logo src={logo} alt="Brand Logo" />
              </Grid>
              <Grid
                item
                style={{
                  display: pathname.includes("/invoice/print")
                    ? "none"
                    : "flex",
                }}
              >
                <CustomIconButton
                  startIcon={<LocalPrintshopSharpIcon />}
                  background={theme.palette.secondary}
                  title="Print Invoice"
                  component={Link}
                  to={`/dashboard/orders/${orderId}/invoice/print`}
                  target="_blank"
                  style={{ maxHeight: 40 }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              style={{ marginBottom: "2rem" }}
              rowSpacing={3}
              pt={5}
            >
              <OrderInvoiceDetails singleOrder={singleOrder} />
              <CustomerInvoicePersonalDetails
                heading="Shipping Details"
                customerDetails={singleOrder.shippingAddress}
              />
            </Grid>
            {singleOrder?.orderNote && (
              <Grid item style={{ maxWidth: 400 }} sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <span style={{ fontWeight: 700 }}>Note: </span>
                  {singleOrder?.orderNote}
                </Typography>
              </Grid>
            )}
            <Grid item container direction="column">
              <Tables
                headerColumns={invoiceColumns}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                total={singleOrder?.ordersProducts?.length}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                loading={loadingSingleOrder}
                hasPagination={false}
                hasShadow={false}
                notFoundText="No Ordered Product(s) found"
              >
                {singleOrder?.ordersProducts.length > 0 &&
                  singleOrder.ordersProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => {
                      if (typeof order.product !== "string") {
                        return (
                          <OrderedProductsItem
                            key={order.product.id}
                            order={order}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
              </Tables>
              <Grid item container direction="column">
                <Grid
                  item
                  container
                  columnSpacing={8}
                  justifyContent="flex-end"
                  py={2}
                  pr={4}
                >
                  <Grid item>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      SubTotal
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      ${calculateTotal?.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Divider style={{ width: "100%" }} />
                </Grid>
                <Grid
                  item
                  container
                  columnSpacing={8}
                  justifyContent="flex-end"
                  py={1}
                  pr={4}
                >
                  <Grid item>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      $
                      {calculateTotal &&
                        (
                          calculateTotal +
                          singleOrder.orderShippingAmount -
                          singleOrder.orderDiscount
                        ).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ContentContainer>
        )
      )}
    </Container>
  );
};

export default OrderInvoicePageDisplay;
