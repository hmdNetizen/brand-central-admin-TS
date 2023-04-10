import { styled } from "@mui/material/styles";
import DashboardRectangularCardItem from "./RectangularCardItem";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import AssignmentTurnedInSharpIcon from "@mui/icons-material/AssignmentTurnedInSharp";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import GroupsSharpIcon from "@mui/icons-material/GroupsSharp";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Container } from "./styles/DashRectangularCardsStyles";
import { CardPropTypes } from "./types";
import { useTypedSelector } from "src/hooks/useTypedSelector";

// const cardData: RectangularCardItemProps[] = [
//   {
//     heading: "Orders Pending",
//     numberCount: pendingOrders.length,
//     primaryColor: "#f85108",
//     secondaryColor: "#f4ad3c",
//     cardIcon: <PendingActionsSharpIcon style={{transform: "rotate(-20deg)",
//     path: "/orders/pending",
//   },
//   {
//     heading: "Orders Processing",
//     numberCount: processingOrders.length,
//     primaryColor: "#047edf",
//     secondaryColor: "#0bb9fa",
//     cardIcon: <LocalShippingSharpIcon style={{transform: "rotate(-20deg)",
//     path: "/orders/processing",
//   },
//   {
//     heading: "Orders Completed",
//     numberCount: completedOrders.length,
//     primaryColor: "#0fa49b",
//     secondaryColor: "#03dbce",
//     cardIcon: <AssignmentTurnedInSharpIcon style={{transform: "rotate(-20deg)",
//     path: "/orders/completed",
//   },
//   {
//     heading: "Total Products",
//     numberCount: total,
//     primaryColor: "#5a49e9",
//     secondaryColor: "#7a6cf0",
//     cardIcon: <ShoppingCartCheckoutSharpIcon style={{transform: "rotate(-20deg)",
//     path: "/orders/completed",
//   },
//   {
//     heading: "Total Customers",
//     numberCount: customers.length,
//     primaryColor: "#129021",
//     secondaryColor: "#1ed41e",
//     cardIcon: <GroupsSharpIcon style={{transform: "rotate(-20deg)",
//     path: "/orders/customers",
//   },
//   {
//     heading: "Total Preorders",
//     numberCount: preOrders.length,
//     primaryColor: "#cf0633",
//     secondaryColor: "#f96079",
//     cardIcon: <ShoppingBagOutlinedIcon style={{transform: "rotate(-20deg)", />,
//     path: "/orders/pre-orders",
//   },
// ];

const DashboardRectangularCards = ({ menuSlideIn }: CardPropTypes) => {
  // Orders states
  const completedOrdersCount = useTypedSelector(
    (state) => state.orders.completedOrdersCount
  );
  const pendingOrdersCount = useTypedSelector(
    (state) => state.orders.pendingOrdersCount
  );
  const processingOrdersCount = useTypedSelector(
    (state) => state.orders.processingOrdersCount
  );

  const totalCustomers = useTypedSelector(
    (state) => state.customers.totalCustomers
  );

  const totalProducts = useTypedSelector(
    (state) => state.products.totalProducts
  );

  const preOrders = useTypedSelector((state) => state.preOrders.preOrders);

  return (
    <Container menuSlideIn={menuSlideIn}>
      <DashboardRectangularCardItem
        heading="Orders Pending"
        numberCount={pendingOrdersCount}
        primaryColor="#f85108"
        secondaryColor="#f4ad3c"
        cardIcon={
          <PendingActionsSharpIcon
            style={{ transform: "rotate(-20deg)", fontSize: "5rem" }}
          />
        }
        path="/orders/pending"
      />
      <DashboardRectangularCardItem
        heading="Orders Processing"
        numberCount={processingOrdersCount}
        primaryColor="#047edf"
        secondaryColor="#0bb9fa"
        cardIcon={
          <LocalShippingSharpIcon
            style={{ transform: "rotate(-20deg)", fontSize: "5rem" }}
          />
        }
        path="/orders/processing"
      />
      <DashboardRectangularCardItem
        heading="Orders Completed"
        numberCount={completedOrdersCount}
        primaryColor="#0fa49b"
        secondaryColor="#03dbce"
        cardIcon={
          <AssignmentTurnedInSharpIcon
            style={{ transform: "rotate(-20deg)", fontSize: "5rem" }}
          />
        }
        path="/orders/completed"
      />
      <DashboardRectangularCardItem
        heading="Total Products"
        numberCount={totalProducts}
        primaryColor="#5a49e9"
        secondaryColor="#7a6cf0"
        cardIcon={
          <ShoppingCartCheckoutSharpIcon
            style={{ transform: "rotate(-20deg)", fontSize: "5rem" }}
          />
        }
        path="/products"
      />
      <DashboardRectangularCardItem
        heading="Total Customers"
        numberCount={totalCustomers}
        primaryColor="#129021"
        secondaryColor="#1ed41e"
        cardIcon={
          <GroupsSharpIcon
            style={{ transform: "rotate(-20deg)", fontSize: "5rem" }}
          />
        }
        path="/customers"
      />
      <DashboardRectangularCardItem
        heading="Total Preorders"
        numberCount={preOrders.length}
        primaryColor="#cf0633"
        secondaryColor="#f96079"
        cardIcon={
          <ShoppingBagOutlinedIcon
            style={{ transform: "rotate(-20deg)", fontSize: "5rem" }}
          />
        }
        path="/pre-orders"
      />
    </Container>
  );
};

export default DashboardRectangularCards;
