import React from "react";
import { SalespersonInfoProps } from "src/pages/salespersons/types";
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
  data: {
    results: Array<SalespersonReturnedPayload>;
    total: number;
  };
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
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSalespersonInformation: React.Dispatch<
    React.SetStateAction<SalespersonInfoProps>
  >;
};

export type UpdateSalespersonRequestPayload = Pick<
  SalespersonRequestPayload,
  "email" | "fullName" | "phoneNumber" | "profileImage" | "initials"
> & {
  setOpenEditSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
};

export type InitStateType = {
  loadingSalespersons: boolean;
  loadingSingleSalesperson: boolean;
  loadingRequestAction: boolean;
  loadingActivation: boolean;
  salespersons: SalespersonReturnedPayload[];
  totalSalespersons: number;
  singleSalesperson: SalespersonReturnedPayload | null;
  error: null | string;
};
