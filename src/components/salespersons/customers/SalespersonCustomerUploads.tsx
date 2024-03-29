import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import IconButton from "@mui/material/IconButton";
import { IoIosCloudUpload } from "react-icons/io";
import Typography from "@mui/material/Typography";
import { read, utils } from "xlsx";
import {
  capitalizeFirstLetters,
  getCustomerId,
  // getProductId,
  getSalespersonId,
  // transformCustomerInvoiceDataset,
} from "src/lib/helpers";
import { useTheme } from "@mui/material/styles";
import CustomLinearProgressBar from "src/utils/CustomLinearProgress";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  Container,
  Input,
  ProgressTextWrapper,
} from "../../inventory/styles.inventory";
import {
  SalespersonCustomerBulkUpdatePayload,
  // SalespersonCustomerResponsePayload,
  SalespersonCustomersInvoicesBulkUpdatePayload,
} from "src/services/salespersons/customers/types";
// import { SalespersonCustomerOrdersBulkUpdatePayload } from "src/services/orders/OrderTypes";
import { ProductTypes } from "src/services/products/ProductTypes";
// import { nanoid } from "@reduxjs/toolkit";

type OrderProduct = {
  product: string;
  productQuantity: number;
  productTotalCost: number;
};

type InvoiceTypes = {
  invoiceNumber: string;
  invoiceDate: string;
  invoiceTotal: number;
  isOpen?: boolean;
};

type SalespersonCustomerInvoiceTypes = {
  customerCode: string;
  salesRepInitials: string;
  salesperson: string;
  customer: string;
  balance: number;
  invoices: Array<InvoiceTypes>;
};

const calculateProductsTotalCost = (
  quantity: number,
  itemCode: string,
  products: Array<ProductTypes>
) => {
  const currentProduct = products.find(
    (product) => product.itemCode.toLowerCase() === itemCode.toLowerCase()
  );

  if (currentProduct) {
    const total = (Number(currentProduct.priceCode1) * quantity).toFixed(2);
    return Number(total);
  }

  return 0;
};

const getProductPrice = (itemCode: string, products: Array<ProductTypes>) => {
  const currentProduct = products.find(
    (product) => product.itemCode.toLowerCase() === itemCode.toLowerCase()
  );

  if (currentProduct) {
    return Number(currentProduct.priceCode1);
  }

  return 0;
};

const calculateOrderTotal = (ordersProducts: OrderProduct[]) => {
  const totalAmount = ordersProducts.reduce(
    (total, currItem) => total + currItem.productTotalCost,
    0
  );
};

function SalespersonCustomerUploads() {
  const theme = useTheme();
  const [fileName, setFileName] = useState<File | string>("");

  const uploadingCustomerStatus = useTypedSelector(
    (state) => state.salespersonCustomers.uploadingCustomerStatus
  );
  const uploadedCustomerStatus = useTypedSelector(
    (state) => state.salespersonCustomers.uploadedCustomerStatus
  );
  const salespeople = useTypedSelector(
    (state) => state.salesPersons.salespersons
  );
  const salespersonCustomers = useTypedSelector(
    (state) => state.salespersonCustomers.salespersonCustomers
  );
  const products = useTypedSelector((state) => state.products.allProducts);

  const {
    uploadSalespersonCustomers,
    // uploadStaleOrders,
    uploadSalespersonCustomersInvoices,
  } = useActions();

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      },
      noClick: true,
      onDrop: async (files) => {
        setFileName(files[0]?.name);
        const data = await files[0].arrayBuffer();
        //     /* data is an ArrayBuffer */
        const workbook = await read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData = utils.sheet_to_json(worksheet);
        const customerData = jsonData as SalespersonCustomerBulkUpdatePayload[];
        const invoiceData =
          jsonData as SalespersonCustomersInvoicesBulkUpdatePayload[];

        if (customerData[0].Slsprn && customerData[0]["Customer:"]) {
          const newSalespersonCustomers = [...customerData]
            .filter((data) => data["Slsprn"])
            .map((customer) => ({
              companyName: capitalizeFirstLetters(customer["Company Name"]),
              customerCode: customer["Customer:"],
              address: `${customer["Address:"]}, ${customer["City, State, Zip"]}`,
              phoneNumber: customer["Phone"].includes("blank")
                ? ""
                : `1${customer["Phone"].replace(/[\/-]/g, "")}`,
              referrer: getSalespersonId(salespeople, customer["Slsprn"])!,
              priceCode: customer["Price Code"]
                ? customer["Price Code"].split(" ").join("").toLowerCase()
                : "pricecode3",
            }));

          uploadSalespersonCustomers(newSalespersonCustomers);
          // console.log(newSalespersonCustomers);
        } else {
          const newCustomerInvoices = [...invoiceData]
            .filter(
              (data) =>
                data["Customer Code"] &&
                getCustomerId(data["Customer Code"], salespersonCustomers)!
            )
            .map((invoice) => ({
              customer: getCustomerId(
                invoice["Customer Code"],
                salespersonCustomers
              )!,
              salesperson: getSalespersonId(
                salespeople,
                invoice["Salesperson"]
              )!,
              invoiceNumber: invoice["Invoice #"],
              invoiceTotal: invoice["Total"],
              balance: invoice.Balance,
              isOpen: true,
              invoiceDate: new Date(invoice["Invoice Date"]).toISOString(),
            }));
          uploadSalespersonCustomersInvoices(newCustomerInvoices);
          // console.log(JSON.stringify(newCustomerInvoices));
        }
      },
    });

  // const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
  //   useDropzone({
  //     accept: {
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
  //     },
  //     noClick: true,
  //     onDrop: async (files) => {
  //       setFileName(files[0]?.name);
  //       const data = await files[0].arrayBuffer();
  //       //     /* data is an ArrayBuffer */
  //       const workbook = await read(data);
  //       const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  //       const jsonData = utils.sheet_to_json(worksheet);
  //       // const resultData = jsonData as SalespersonCustomerBulkUpdatePayload[];
  //       const newResultData =
  //         jsonData as SalespersonCustomerOrdersBulkUpdatePayload[];

  //       const result = newResultData.reduce((acc, order) => {
  //         const existingCustomer = acc.find(
  //           (item) =>
  //             item["Cust.Code"] === order["Cust.Code"] &&
  //             item["Slsprs"] === order["Slsprs"]
  //         );

  //         const orderProduct = {
  //           Item: order.Item,
  //           product: getProductId(order.Item, products),
  //           productQuantity: order["Qty Ship - Trn"],
  //           productTotalCost: calculateProductsTotalCost(
  //             order["Qty Ship - Trn"],
  //             order.Item,
  //             products
  //           ),
  //           productPrice: getProductPrice(order.Item, products),
  //         };

  //         if (existingCustomer) {
  //           const existingProduct = existingCustomer.ordersProducts.find(
  //             (product) => product.Item === order.Item
  //           );

  //           if (existingProduct) {
  //             existingProduct["productQuantity"] += order["Qty Ship - Trn"];
  //           } else {
  //             existingCustomer.ordersProducts.push(orderProduct);
  //           }

  //           existingCustomer.orderTotalQuantity =
  //             existingCustomer.ordersProducts.reduce(
  //               (total, product) => total + product["productQuantity"],
  //               0
  //             );

  //           existingCustomer.orderPaymentAmount =
  //             existingCustomer.ordersProducts
  //               .reduce((total, item) => total + item["productTotalCost"], 0)
  //               .toFixed(2);
  //         } else {
  //           // @ts-expect-error
  //           acc.push({
  //             "Cust.Code": order["Cust.Code"],
  //             orderedFor: getCustomerId(
  //               order["Cust.Code"],
  //               salespersonCustomers
  //             ),
  //             placedBy: getSalespersonId(salespeople, order["Slsprs"]),
  //             Slsprs: order.Slsprs,
  //             Company: order.Company,
  //             orderInVoiceNumber: "",
  //             ordersProducts: [orderProduct],
  //             orderId: `${order["Slsprs"]}-${
  //               order["Cust.Code"]
  //             }-${nanoid().slice(0, 12)}`,
  //             OrderDate: new Date().toISOString(),
  //             // OrderDate: new Date(order["Inv. Date"]).toISOString(),
  //             orderPaymentAmount: 0,
  //             orderPaymentDate: new Date().toISOString(),
  //             orderNote: "",
  //             orderShippingAmount: 0,
  //             orderStatus: "completed",
  //             orderTax: 0,
  //             orderPaymentStatus: "paid",
  //             orderDiscount: 0,
  //             orderPaymentMethod: "Cash/Check",
  //             isStale: true,
  //           });
  //         }

  //         return acc;
  //       }, []);

  //       // const newOrders = result.filter(
  //       //   (item) => item.Company.trim() === "CITY ACRESS"
  //       // );

  //       const newResults = result.map(({ ordersProducts, ...rest }) => ({
  //         ...rest,
  //         ordersProducts: ordersProducts.filter(
  //           (product) => product.product !== undefined
  //         ),
  //       }));

  //       uploadStaleOrders({ orders: newResults });
  //     },
  //   });

  return (
    <div className="container" style={{ width: "100%", minHeight: 300 }}>
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <Typography variant="body1" align="center" color="secondary">
          Drag 'n' drop some files here, or click the button below to select
          files
        </Typography>
        <label htmlFor="icon-button-file">
          <Input
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            id="icon-button-file"
            type="file"
            {...getInputProps()}
          />
          <IconButton
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <IoIosCloudUpload size="3.5rem" />
          </IconButton>
        </label>
      </Container>
      {(uploadingCustomerStatus || uploadedCustomerStatus) && (
        <ProgressTextWrapper>
          <Typography
            variant="body1"
            sx={{
              textTransform: "uppercase",
              color:
                uploadedCustomerStatus ===
                "Sales Reps' customers have been updated"
                  ? theme.palette.success.main
                  : "#1a90ff",
            }}
          >
            {uploadingCustomerStatus
              ? uploadingCustomerStatus
              : uploadedCustomerStatus}
          </Typography>
        </ProgressTextWrapper>
      )}
      <CustomLinearProgressBar />
    </div>
  );
}

export default SalespersonCustomerUploads;
