import {
  UserProfilePayloadType,
  UserProfileReturnedPayload,
} from "../user/UserTypes";

export type CustomerExcerptDataTypes = Pick<
  UserProfileReturnedPayload,
  "_id" | "companyEmail" | "createdAt"
>;

export type CustomerPayloadType = {
  data: {
    data: UserProfilePayloadType[];
    lastThirtyDays: number;
    total: number;
  };
};

export type CustomerExcerptPayloadType = {
  data: {
    data: CustomerExcerptDataTypes[];
    lastThirtyDays: number;
    totalCustomers: number;
  };
};

export type initStateTypes = {
  loadingCustomers: boolean;
  customers: UserProfilePayloadType[];
  recentCustomers: CustomerExcerptDataTypes[];
  error: string | null;
  numberOfCustomersInThirtyDays: number;
  totalCustomers: number;
};
