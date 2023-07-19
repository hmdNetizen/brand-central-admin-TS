export type SalesPersonReturnedPayload = {
  _id: string;
  fullName: string;
  email: string;
  initials: string;
  phoneNumber: string;
  profileImage: string;
  customers: [];
};

export type InitStateType = {
  loadingSalespersons: boolean;
  salespersons: SalesPersonReturnedPayload[];
  error: null | string;
};
