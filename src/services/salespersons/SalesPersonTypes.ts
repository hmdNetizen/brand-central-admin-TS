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
  profileImage?: string;
};

export type InitStateType = {
  loadingSalespersons: boolean;
  loadingSingleSalesperson: boolean;
  loadingRequestAction: boolean;
  salespersons: SalespersonReturnedPayload[];
  singleSalesperson: SalespersonReturnedPayload | null;
  error: null | string;
};
