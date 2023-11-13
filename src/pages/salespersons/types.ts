import React from "react";
import { SalespersonReturnedPayload } from "src/services/salespersons/SalesPersonTypes";

export type SalesPersonsPageLayoutProps = {
  title: "Salespeople" | "Deactivated Salespeople";
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  filterText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openAddSalesperson: boolean;
  setOpenAddSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  openEditSalesperson: boolean;
  setOpenEditSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteSalesperson: boolean;
  setOpenDeleteSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  salesPersonsDataset: SalespersonReturnedPayload[];
};

export type SalespersonInfoProps = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
  initials: string;
};

export type salespersonInfoErrorProps = {
  fullNameError?: string;
  initialsError?: string;
  emailError?: string;
  phoneNumberError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
};

export type CreateSalespersonProps = {
  openAddSalesperson: boolean;
  setOpenAddSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SalespersonCustomerInfoProps = {
  companyName: string;
  customerCode: string;
  companyEmail: string;
  address: string;
  phoneNumber: string;
  contactName: string;
  priceCode: string;
  initials: string;
};
