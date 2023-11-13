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

// error response for creating new sales rep customer
// "errors": [
//   {
//     "value": "Tech for Africa",
//     "msg": "Company name already exists.",
//     "param": "companyName",
//     "location": "body"
//   },
//   {
//     "value": "34567",
//     "msg": "Customer code already exists.",
//     "param": "customerCode",
//     "location": "body"
//   }
// ]

export type InitStateTypes = {
  loadingSalespersonCustomers: boolean;
  loadingSingleSalespersonCustomer: boolean;
  loadingCustomerOrders: boolean;
  loadingSalespersonCustomerAction: boolean;
  totalCustomers: number;
  totalCustomerOrders: number;
  salespersonCustomers: Array<SalespersonCustomerResponsePayload>;
  salespersonCustomerOrders: Array<SalespersonOrderResponsePayload>;
  singleSalespersonCustomer: SalespersonCustomerResponsePayload | null;
  error: string | null;
  errors: Array<ErrorResponseTypes>;
};
