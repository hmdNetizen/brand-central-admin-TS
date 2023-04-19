import {
  UserProfilePayloadType,
  UserProfileReturnedPayload,
} from "../user/UserTypes";
import { OrderReturnedPayload } from "../orders/OrderTypes";

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

export type PaginatedCustomerOrderType = {
  data: {
    orders: OrderReturnedPayload[];
    total: number;
  };
};

export type UpdateCustomerType = {
  customerId: string;
  setOpenEditCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;
  priceCode: string;
  city: string;
  state: string;
  address: string;
  country: string;
  postalCode: string;
  paymentMethod: string;
  businessType: string;
  taxID: string;
  primaryContactName: string;
  primaryContactRole: string;
  primaryContactPhoneNumber: string;
  primaryContactEmail: string;
  profileImage: string;
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
  updatingCustomer: boolean;
  deletingCustomer: boolean;
  loadingCustomerOrders: boolean;
  customerOrders: OrderReturnedPayload[];
  totalCustomerOrders: number;
  singleCustomer: UserProfileReturnedPayload | null;
};
