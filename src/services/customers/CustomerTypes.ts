import {
  UserProfilePayloadType,
  UserProfileReturnedPayload,
} from "../user/UserTypes";

export type CustomerExcerptDataTypes = Pick<
  UserProfileReturnedPayload,
  "_id" | "companyEmail" | "createdAt"
>;

export type CustomersPayloadType = {
  data: {
    data: UserProfilePayloadType[];
    lastThirtyDays: number;
    total: number;
  };
};

export type AllCustomersPayloadType = {
  data: {
    customers: UserProfileReturnedPayload[];
    total: number;
  };
};

export type SingleCustomerPayloadType = {
  data: UserProfileReturnedPayload;
};

export type CustomerExcerptPayloadType = {
  data: {
    data: CustomerExcerptDataTypes[];
    lastThirtyDays: number;
    totalCustomers: number;
  };
};

export type PaginatedCustomersQueryType = {
  isBlocked?: boolean;
  page: number;
  limit: number;
  searchTerm?: string;
};

export type DeleteCustomerType = {
  customerId: string;
  setOpenDeleteCustomer: React.Dispatch<React.SetStateAction<boolean>>;
};

export type initStateTypes = {
  loadingCustomers: boolean;
  customers: UserProfileReturnedPayload[];
  recentCustomers: CustomerExcerptDataTypes[];
  error: string | null;
  numberOfCustomersInThirtyDays: number;
  totalCustomers: number;
  loadingSingleCustomer: boolean;
  loadingCustomerAction: boolean;
  deletingCustomer: boolean;
  singleCustomer: UserProfileReturnedPayload | null;
};
