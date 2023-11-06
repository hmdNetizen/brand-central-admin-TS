import React from "react";
import { OrderReturnedPayload } from "../orders/OrderTypes";

export type SalespersonReturnedPayload = {
  _id: string;
  fullName: string;
  email: string;
  initials: string;
  phoneNumber: string;
  profileImage: string;
  isActive: boolean;
  createdAt: Date;
};

export type SalespersonsPayloadTypes = {
  data: Array<SalespersonReturnedPayload>;
};

export type SingleSalespersonPayloadTypes = {
  data: SalespersonReturnedPayload;
};

export type SalespersonRequestPayload = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
  initials: string;
  profileImage: File | string;
  setOpenAddSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UpdateSalespersonRequestPayload = Pick<
  SalespersonRequestPayload,
  "email" | "fullName" | "phoneNumber" | "profileImage" | "initials"
> & {
  setOpenEditSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

export type InitStateType = {
  loadingSalespersons: boolean;
  loadingSingleSalesperson: boolean;
  loadingRequestAction: boolean;
  salespersons: SalespersonReturnedPayload[];
  singleSalesperson: SalespersonReturnedPayload | null;
  error: null | string;
};
