import {
  MdOutlineSpaceDashboard as DashboardIcon,
  MdOutlineCategory as CategoryIcon,
  MdOutlineEmail as MessagesIcon,
  MdOutlineSettingsSuggest as GeneralSettingsIcon,
  MdOutlineLocalShipping as ShippingIcon,
  MdOutlineShoppingBag as PreOrderIcon,
} from "react-icons/md";
import { BiPurchaseTagAlt as OrderIcon } from "react-icons/bi";
import { BsCart4 as ProductIcon } from "react-icons/bs";
import {
  IoPersonOutline as CustomersIcon,
  IoDiamondOutline as BrandsIcon,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { RiCoupon2Line as CouponIcon } from "react-icons/ri";

export const menus = [
  { id: 0, title: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  {
    id: 1,
    title: "Orders",
    icon: OrderIcon,
    path: "/dashboard/orders",
    subMenus: [
      { subId: 0, title: "All Orders", path: "/dashboard/orders" },
      { subId: 1, title: "Pending Orders", path: "/dashboard/orders/pending" },
      {
        subId: 2,
        title: "Processing Orders",
        path: "/dashboard/orders/processing",
      },
      {
        subId: 3,
        title: "Completed Orders",
        path: "/dashboard/orders/completed",
      },
      {
        subId: 4,
        title: "Declined Orders",
        path: "/dashboard/orders/declined",
      },
    ],
  },
  {
    id: 2,
    title: "Pre-orders",
    icon: PreOrderIcon,
    path: "/pre-orders",
    subMenus: [
      { subId: 0, title: "All Pre-orders", path: "/dashboard/pre-orders" },
      {
        subId: 1,
        title: "Available Pre-orders",
        path: "/dashboard/pre-orders/available",
      },
    ],
  },
  {
    id: 3,
    title: "Products",
    icon: ProductIcon,
    path: "/products",
    subMenus: [
      {
        subId: 0,
        title: "All Products",
        path: "/products",
      },
      {
        subId: 1,
        title: "Add New Product",
        path: "/products/create",
      },
      {
        subId: 2,
        title: "Featured Products",
        path: "/products/featured",
      },
      {
        subId: 3,
        title: "Best Sellers Products",
        path: "/products/best-sellers",
      },
      {
        subId: 4,
        title: "Deactivated Products",
        path: "/products/deactivated",
      },
      {
        subId: 5,
        title: "Popular Products",
        path: "/products/popular",
      },
      {
        subId: 6,
        title: "Weekly Offers",
        path: "/products/weekly-offers",
      },
      {
        subId: 7,
        title: "Non-Image Products",
        path: "/products/missing-images",
      },
    ],
  },
  {
    id: 4,
    title: "Customers",
    icon: CustomersIcon,
    path: "/dashboard/customers",
    subMenus: [
      { subId: 0, title: "Customers List", path: "/dashboard/customers" },
      {
        subId: 1,
        title: "Blocked Customers",
        path: "/dashboard/customers/blocked",
      },
    ],
  },
  {
    id: 5,
    title: "Manage Categories",
    icon: CategoryIcon,
    path: "/categories",
    subMenus: [
      { subId: 0, title: "Main Category", path: "/dashboard/categories" },
      { subId: 1, title: "Sub Category", path: "/dashboard/subcategories" },
      {
        subId: 2,
        title: "Brands Category",
        path: "/dashboard/brands-categories",
      },
    ],
  },
  {
    id: 6,
    title: "Brands",
    icon: BrandsIcon,
    path: "/brands",
    subMenus: [
      { subId: 0, title: "All Brands", path: "/dashboard/brands" },
      {
        subId: 1,
        title: "Deactivated Brands",
        path: "/dashboard/brands/deactivated",
      },
    ],
  },
  {
    id: 7,
    title: "Set Coupons",
    icon: CouponIcon,
    path: "/dashboard/coupons",
  },
  {
    id: 8,
    title: "Messages",
    icon: MessagesIcon,
    path: "/messages",
    subMenus: [
      { subId: 0, title: "Sent", path: "/sent-emails" },
      { subId: 1, title: "Recieved", path: "/received-emails" },
    ],
  },
  {
    id: 9,
    title: "Shipping",
    icon: ShippingIcon,
    path: "/shipping/zip-codes",
    subMenus: [
      {
        subId: 0,
        title: "Zip Codes",
        path: "/shipping/zip-codes",
      },
    ],
  },
  {
    id: 10,
    title: "General Settings",
    icon: GeneralSettingsIcon,
    path: "/general-settings",
    subMenus: [
      {
        subId: 0,
        title: "Logo",
        path: "/general-settings/logo",
      },
      {
        subId: 1,
        title: "Favicon",
        path: "/general-settings/favicon",
      },
      {
        subId: 2,
        title: "Social Media",
        path: "/general-settings/socials",
      },
    ],
  },
  {
    id: 11,
    title: "Update Inventory",
    icon: IoCloudUploadOutline,
    path: "/update-inventory",
  },
];
