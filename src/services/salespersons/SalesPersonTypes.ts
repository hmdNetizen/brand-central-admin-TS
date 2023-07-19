export type SalesPersonReturnedPayload = {
  _id: string;
  fullName: string;
  email: string;
  initials: string;
  phoneNumber: string;
  profileImage: string;
  isActive: boolean;
  customers: [];
};

export type InitStateType = {
  loadingSalespersons: boolean;
  salespersons: SalesPersonReturnedPayload[];
  singleSalesperson: SalesPersonReturnedPayload | null;
  error: null | string;
};
