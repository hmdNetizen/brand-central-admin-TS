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

export type InitStateType = {
  loadingSalespersons: boolean;
  loadingSingleSalesperson: boolean;
  salespersons: SalespersonReturnedPayload[];
  singleSalesperson: SalespersonReturnedPayload | null;
  error: null | string;
};
