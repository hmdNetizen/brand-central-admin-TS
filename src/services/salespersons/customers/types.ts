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

export type SalespersonCustomerPayloadTypes = {
  data: {
    results: Array<SalespersonCustomerResponsePayload>;
    total: number;
  };
};

export type InitStateTypes = {
  loadingSalespersonCustomers: boolean;
  totalCustomers: number;
  salespersonCustomers: Array<SalespersonCustomerResponsePayload>;
  error: string | null;
};
