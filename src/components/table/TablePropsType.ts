import {
  RecentOrdersReturnedPayload,
  OrderExcerptDataTypes,
} from "src/services/orders/OrderTypes";
import { CustomerExcerptDataTypes } from "src/services/customers/CustomerTypes";
import { TableHeaderColumnTypes } from "src/lib/dataset/tableDataTypes";
import { DashboardProductType } from "src/services/products/ProductTypes";

export type TablePropsType = {
  heading: string;
  dataset:
    | RecentOrdersReturnedPayload[]
    | OrderExcerptDataTypes[]
    | DashboardProductType[]
    | CustomerExcerptDataTypes[];
  headerColumns: TableHeaderColumnTypes[];
  notFoundText: string;
  children?: React.ReactNode;
  loading: boolean;
  hasPagination?: boolean;
};
