import React, { useState, useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import PreviousButton from "src/utils/PreviousButton";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import { Link, useParams } from "react-router-dom";
import logo from "assets/images/logo-black.png";
import CustomIconButton from "src/utils/CustomIconButton";
import LocalPrintshopSharpIcon from "@mui/icons-material/LocalPrintshopSharp";
import Tables from "components/table/Tables";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { useActions } from "src/hooks/useActions";
import Spinner from "src/utils/Spinner";
import Moment from "react-moment";
import CustomerInvoicePersonalDetails from "src/components/orders/CustomerInvoicePersonalDetails";
import useTitle from "src/hooks/useTitle";
import { invoiceColumns } from "src/lib/dataset/tableData";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Container = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem 5rem 2rem",

  [theme.breakpoints.only("xs")]: {
    padding: "5rem 1rem 5rem 1rem",
  },
}));

const Logo = styled("img")({
  width: 200,
});

const ContentContainer = styled(Grid)({
  background: "#fff",
  padding: "3rem 2rem",
  borderRadius: 5,
});

const Heading = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.85rem",
  marginBottom: "1rem",
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",

  "& span": {
    fontWeight: 400,
  },
}));

const OrderInvoice = () => {
  useTitle("Admin : Orders | Order Invoice");
  const theme = useTheme();

  // eslint-disable-next-line
  const { orderId } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

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

  return (
    <Container container direction="column">
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
          to={`orders`}
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
          to={`orders/${orderId}`}
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
          to={`orders/${orderId}/invoice`}
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.dark,
          }}
        >
          <Typography variant="body2">Invoice</Typography>
        </Grid>
      </Grid>
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
              <Grid item>
                <CustomIconButton
                  startIcon={<LocalPrintshopSharpIcon />}
                  background={theme.palette.secondary}
                  title="Print Invoice"
                  component={Link}
                  to={`/admin/orders/${orderId}/invoice/print`}
                  target="_blank"
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
              <Grid item>
                <Heading variant="h3">Order Details</Heading>
                <Title variant="body1">
                  Invoice Number :{" "}
                  <span>
                    {singleOrder.orderInVoiceNumber
                      ? singleOrder.orderInVoiceNumber
                      : "N/A"}
                  </span>
                </Title>
                <Title variant="body1">
                  Order Date :{" "}
                  <span style={{ fontWeight: 400 }}>
                    <Moment format="D MMM YYYY hh:mm:ss" withTitle>
                      {singleOrder.orderDate}
                    </Moment>
                  </span>
                </Title>
                <Title variant="body1">
                  Order ID : <span>${singleOrder.orderId}</span>
                </Title>
                {/* <Title variant="body1">
                  Shipping Method : <span>Ship To Address</span>
                </Title> */}
                <Title variant="body1">
                  Payment Method :{" "}
                  <span>
                    {singleOrder.orderPaymentMethod === "Cash/Check"
                      ? `${singleOrder.orderPaymentMethod} on delivery`
                      : singleOrder.orderPaymentMethod}
                  </span>
                </Title>
                {singleOrder.orderDiscount !== 0 && (
                  <Title variant="body1">
                    Order Discount : <span>${singleOrder.orderDiscount}</span>
                  </Title>
                )}
                {singleOrder.orderShippingAmount !== 0 && (
                  <Title variant="body1">
                    Shipping Fee :{" "}
                    <span>${singleOrder.orderShippingAmount.toFixed(2)}</span>
                  </Title>
                )}
              </Grid>
              <CustomerInvoicePersonalDetails
                heading="Shipping Details"
                customerDetails={singleOrder.shippingAddress}
              />

              {/* <CustomerInvoicePersonalDetails
                heading="Billing Details"
                customerDetails={singleOrder.billingAddress}
              /> */}
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
                {singleOrder.ordersProducts.length > 0 &&
                  singleOrder.ordersProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => {
                      const {
                        product: { id, name, brandName, price, image },
                        productQuantity,
                        productTotalCost,
                      } = order;
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                          <TableCell style={{ width: 150 }}>
                            <img
                              src={image}
                              alt={`${name} display`}
                              style={{ width: 50 }}
                            />
                          </TableCell>

                          <TableCell>{brandName}</TableCell>
                          <TableCell style={{ minWidth: 200 }}>
                            {name}
                          </TableCell>
                          <TableCell style={{ minWidth: 100 }}>
                            <Title variant="body1">
                              Price: <span>${price} </span>
                            </Title>
                            <Title variant="body2">
                              Qty: <span>{productQuantity}</span>
                            </Title>
                          </TableCell>
                          <TableCell align="center">
                            ${productTotalCost.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      );
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

export default OrderInvoice;
