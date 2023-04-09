import { UserProfilePayloadType } from "../user/UserTypes";

export type initStateTypes = {
  loadingCustomers: boolean;
  customers: UserProfilePayloadType[];
  error: string | null;
  numberOfCustomersInThirtyDays: number;
  totalCustomers: number;
};

export type CustomerPayloadType = {
  data: {
    data: UserProfilePayloadType[];
    lastThirtyDays: number;
    total: number;
  };
};
