import { TableHeaderColumnTypes } from "./tableDataTypes";

export const productColumns = [
  { id: 0, label: "Photo", minWidth: 100 },
  { id: 1, label: "Name", minWidth: 250 },
  { id: 2, label: "Type", minWidth: 100 },
  {
    id: 3,
    label: "Stock",
    // minWidth: 170,
    align: "left",
  },
  {
    id: 4,
    label: "Price",
    // minWidth: 170,
    align: "left",
  },
  {
    id: 5,
    label: "Status",
    minWidth: 100,
    align: "left",
  },
  {
    id: 6,
    label: "Options",
    minWidth: 100,
    align: "left",
  },
];

// ORDERS HEADING TEXTS
export const ordersColumns: TableHeaderColumnTypes[] = [
  {
    id: 0,
    label: "Order Numbers",
    align: "left",
  },
  {
    id: 1,
    label: "Order Date",
    align: "left",
  },
  {
    id: 2,
    label: "",
    align: "left",
  },
];

export const customerColumns: TableHeaderColumnTypes[] = [
  {
    id: 0,
    label: "Customer Email",
    align: "left",
  },
  {
    id: 1,
    label: "Joined",
    align: "left",
  },
  {
    id: 2,
    label: "",
    align: "left",
  },
];

export const dashboardProductColumns: TableHeaderColumnTypes[] = [
  {
    id: 0,
    label: "Featured Image",
    align: "left",
  },
  {
    id: 1,
    label: "Name",
    align: "left",
  },
  {
    id: 2,
    label: "category",
    align: "left",
  },
  {
    id: 3,
    label: "Type",
    align: "left",
  },
  {
    id: 4,
    label: "Price",
    align: "left",
  },
  {
    id: 5,
    label: "",
    align: "left",
  },
];

export const customersListColumns: TableHeaderColumnTypes[] = [
  {
    id: 0,
    label: "Name",
    align: "left",
  },
  {
    id: 1,
    label: "Email",
    align: "left",
  },
  {
    id: 2,
    label: "Block/Unblock",
    align: "left",
  },
  {
    id: 3,
    label: "Options",
    align: "left",
  },
];

export const customerOrderColumns: TableHeaderColumnTypes[] = [
  { id: 0, label: "Order ID", align: "left" },
  { id: 1, label: "Purchase Date", align: "left" },
  { id: 2, label: "Amount", align: "left" },
  { id: 3, label: "Status", align: "center" },
  { id: 4, label: "", align: "center" },
  { id: 5, label: "", align: "center" },
];

export const orderedProductsColumn = [
  {
    id: 0,
    label: "Product Image",
    align: "left",
  },
  {
    id: 1,
    label: "Product Code",
    align: "left",
  },
  {
    id: 2,
    label: "Brand",
    align: "left",
  },
  {
    id: 3,
    label: "Product Name",
    align: "left",
  },
  {
    id: 4,
    label: "Details",
    align: "left",
  },
  {
    id: 5,
    label: "Total Price",
    align: "center",
  },
];

export const categoryColumns = [
  {
    id: 0,
    label: "Icon",
    align: "left",
  },
  {
    id: 1,
    label: "Name",
    align: "left",
  },
  {
    id: 2,
    label: "Slug",
    align: "left",
  },
  {
    id: 3,
    label: "Activate/Deactivate",
    align: "center",
  },
  {
    id: 4,
    label: "Options",
    align: "left",
  },
];

export const subCategoryColumns = [
  {
    id: 0,
    label: "Category",
    align: "left",
  },
  {
    id: 1,
    label: "Name",
    align: "left",
  },
  {
    id: 2,
    label: "Slug",
    align: "left",
  },
  {
    id: 3,
    label: "Activate/Deactivate",
    align: "center",
  },
  {
    id: 4,
    label: "Options",
    align: "center",
  },
];

export const brandCategoryColumns = [
  {
    id: 0,
    label: "Category",
    align: "left",
  },
  {
    id: 1,
    label: "Sub Category",
    align: "left",
  },
  {
    id: 2,
    label: "Brand Name",
    align: "left",
  },
  {
    id: 3,
    label: "Slug",
    align: "center",
  },
  {
    id: 4,
    label: "Status",
    align: "center",
  },
  {
    id: 5,
    label: "Options",
    align: "center",
  },
];

export const allOrdersCategoryColumns: TableHeaderColumnTypes[] = [
  {
    id: 0,
    label: "Order Date",
    align: "left",
  },
  {
    id: 1,
    label: "Order Number",
    align: "left",
  },
  {
    id: 2,
    label: "Customer Email",
    align: "left",
  },
  {
    id: 3,
    label: "Total Qty",
    align: "center",
  },
  {
    id: 4,
    label: "Total Cost",
    align: "center",
  },
  {
    id: 5,
    label: "Status",
    align: "center",
  },
  {
    id: 6,
    label: "Options",
    align: "left",
  },
];

export const brandsColumn = [
  {
    id: 0,
    label: "Brand Icon",
    align: "left",
  },
  {
    id: 1,
    label: "Brand Name",
    align: "left",
  },
  {
    id: 2,
    label: "Slug",
    align: "left",
  },
  {
    id: 3,
    label: "Status",
    align: "center",
  },
  {
    id: 4,
    label: "Options",
    align: "left",
  },
];

export const couponColumn = [
  {
    id: 0,
    label: "ID",
    align: "left",
  },
  {
    id: 1,
    label: "Description",
    align: "left",
  },
  {
    id: 2,
    label: "Coupon Code",
    align: "center",
  },
  {
    id: 3,
    label: "Start",
    align: "left",
  },
  {
    id: 4,
    label: "End",
    align: "left",
  },
  {
    id: 5,
    label: "Price Off",
    align: "center",
    minWidth: 100,
  },
  {
    id: 6,
    label: "Usage Count",
    align: "center",
    minWidth: 100,
  },
  {
    id: 7,
    label: "Status",
    align: "center",
  },
  {
    id: 8,
    label: "Options",
    align: "center",
  },
];

export const messagesColumns = [
  {
    id: 0,
    label: "Email",
    align: "left",
  },
  {
    id: 1,
    label: "Subject",
    align: "left",
  },
  {
    id: 2,
    label: "Message",
    align: "left",
  },
  {
    id: 3,
    label: "Date",
    align: "center",
  },
  {
    id: 4,
    label: "Options",
    align: "center",
  },
];

export const preOrdersColumns: TableHeaderColumnTypes[] = [
  {
    id: 0,
    label: "Date",
    align: "left",
  },
  {
    id: 1,
    label: "Product",
    align: "center",
  },
  {
    id: 2,
    label: "CompanyName",
    align: "left",
  },
  {
    id: 3,
    label: "Company Email",
    align: "left",
  },
  {
    id: 4,
    label: "Options",
    align: "left",
  },
];
