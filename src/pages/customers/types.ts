import React from "react";
import {
  UserProfileReturnedPayload,
  UserAddressType,
} from "src/services/user/UserTypes";

export type InitialStateType = {
  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;
  businessType: string;
  paymentMethod: string;
  priceCode: string;
  taxID: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactRole: string;
  primaryContactPhoneNumber: string;
  customPrimaryContactRole: string;
};

export type ContactInitialStateType = UserAddressType;

export type CustomerProfileExcerpt = Pick<
  UserProfileReturnedPayload,
  | "companyName"
  | "companyEmail"
  | "companyPhoneNumber"
  | "businessType"
  | "paymentMethod"
  | "priceCode"
  | "taxID"
  | "primaryContactName"
  | "primaryContactRole"
  | "primaryContactPhoneNumber"
  | "primaryContactEmail"
  | "businesContact"
>;

export type NewCustomerDataType = Pick<
  UserProfileReturnedPayload,
  | "companyName"
  | "companyEmail"
  | "companyPhoneNumber"
  | "businessType"
  | "paymentMethod"
  | "priceCode"
  | "taxID"
  | "primaryContactName"
  | "primaryContactRole"
  | "primaryContactPhoneNumber"
  | "primaryContactEmail"
>;

export type EditCustomerProps = {
  openEditCustomer: boolean;
  setOpenEditCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  customerProfileData: CustomerProfileExcerpt | UserProfileReturnedPayload;
};

export type EmailCustomerInitialStateType = {
  companyEmail: string;
  subject: string;
  message: string;
};

export type EmailCustomerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CustomerPageLayoutProps = {
  title: "Customers" | "Blocked Customers";
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  filterText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openEditCustomer: boolean;
  setOpenEditCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteCustomer: boolean;
  setOpenDeleteCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  openEmail: boolean;
  setOpenEmail: React.Dispatch<React.SetStateAction<boolean>>;
  customerDataset: UserProfileReturnedPayload[];
};
