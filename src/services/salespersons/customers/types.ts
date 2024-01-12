import { SalespersonCustomerInfoProps } from "src/pages/salespersons/types";
import React from "react";
import { SalespersonOrderResponsePayload } from "../orders/types";
import { SalespersonReturnedPayload } from "../SalesPersonTypes";

export type SalespersonCustomerResponsePayload = {
  id: string;
  customerCode: string;
  companyName: string;
  address: string;
  phoneNumber: string;
  contactName: string;
  companyEmail: string;
  priceCode: string;
  referrer: SalespersonReturnedPayload;
  createdAt: "2023-07-24T11:34:00.907Z";
};

export type SalespersonCustomerRequestPayload = {
  companyName: string;
  companyEmail: string;
  customerCode: string;
  referrer: string;
  phoneNumber: string;
  address: string;
  contactName: string;
  priceCode: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomerInformation?: React.Dispatch<
    React.SetStateAction<SalespersonCustomerInfoProps>
  >;
};

export type UploadSalespersonCustomersRequestTypes = Pick<
  SalespersonCustomerRequestPayload,
  | "companyName"
  | "customerCode"
  | "referrer"
  | "phoneNumber"
  | "address"
  | "priceCode"
>;

export type UploadSalespersonCustomerInvoicesRequestTypes = {
  customer: string;
  salesperson: string;
  invoiceNumber: string;
  invoiceTotal: number;
  balance: number;
  isOpen: boolean;
  invoiceDate: string;
};

export type SingleSalespersonCustomerReturnedPayloadTypes = {
  data: SalespersonCustomerResponsePayload;
};

export type SalespersonCustomerPayloadTypes = {
  data: {
    results: Array<SalespersonCustomerResponsePayload>;
    total: number;
  };
};

export type DeleteSalespersonCustomerRequestPayload = {
  customerId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ErrorResponseTypes = {
  value: "Tech for Africa";
  msg: "Company name already exists.";
  param: "companyName";
};

export type SalespersonCustomerBulkUpdatePayload = {
  "Customer:": string;
  "Company Name": string;
  "Address:": string;
  "City, State, Zip": string;
  Phone: string;
  Slsprn: string;
  "Price Code": string;
};

export type SalespersonCustomersInvoicesBulkUpdatePayload = {
  "Customer Code": string;
  "Customer Name": string;
  Salesperson: string;
  "Invoice Date": string;
  "Invoice #": string;
  Total: number;
  Balance: number;
};

export type InitStateTypes = {
  loadingSalespersonCustomers: boolean;
  loadingSingleSalespersonCustomer: boolean;
  loadingCustomerOrders: boolean;
  loadingSalespersonCustomerAction: boolean;
  totalCustomers: number;
  totalCustomerOrders: number;
  uploadingCustomerStatus: string;
  uploadedCustomerStatus: string;
  salespersonCustomers: Array<SalespersonCustomerResponsePayload>;
  salespersonCustomerOrders: Array<SalespersonOrderResponsePayload>;
  singleSalespersonCustomer: SalespersonCustomerResponsePayload | null;
  error: string | null;
  errors: Array<ErrorResponseTypes>;
};
