import React from "react";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MarkEmailUnreadSharpIcon from "@mui/icons-material/MarkEmailUnreadSharp";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import AddCardSharpIcon from "@mui/icons-material/AddCardSharp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import ShoppingBasketSharpIcon from "@mui/icons-material/ShoppingBasketSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import Moment from "react-moment";
import EmptyNotification from "./EmptyNotification";
import { StyledMenuItem } from "./styles/CustomMenuListStyles";

const accountMenus = [
  {
    id: 0,
    title: "Edit Profile",
    icon: ManageAccountsIcon,
    path: "/admin/profile",
  },
  {
    id: 1,
    title: "Change Password",
    icon: LockResetRoundedIcon,
    path: "/admin/reset-password",
  },
];

type MenuListProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  notificationId: string;
};

const CustomMenuList = (props: MenuListProps) => {
  const { open, anchorEl, setAnchorEl, notificationId } = props;
  const theme = useTheme();

  const navigate = useNavigate();

  const {
    orderNotifications,
    lowStockNotifications,
    preOrderNotifications,
    customerNotifications,
    messagesNotifications,
  } = useTypedSelector((state) => state.notifications);

  const { admin } = useTypedSelector((state) => state.user);

  const {
    markOrdersNotificationsAsRead,
    markCustomerNotificationsAsRead,
    markLowStockNotificationsAsRead,
    markPreOrderNotificationsAsRead,
    markMessageNotificationAsRead,
    clearAllOrdersNotifications,
    clearAllCustomersNotifications,
    clearAllLowStockNotifications,
    clearAllPreOrderNotifications,
    logout,
  } = useActions();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearNotifications = () => {
    if (notificationId === "orders") {
      clearAllOrdersNotifications();
    } else if (notificationId === "customers") {
      clearAllCustomersNotifications();
    } else if (notificationId === "low-stock") {
      clearAllLowStockNotifications();
    } else if (notificationId === "pre-orders") {
      clearAllPreOrderNotifications();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuListTitle =
    notificationId === "messages"
      ? "New Message(s)"
      : notificationId === "low-stock"
      ? "Low Quantity Product(s)"
      : notificationId === "customers"
      ? "New Customer(s)"
      : notificationId === "orders"
      ? "New Order(s)"
      : "New Preorder(s)";

  const accountMenuItem = accountMenus.map((menu) => (
    <StyledMenuItem
      notificationId={notificationId}
      key={menu.id}
      component={Link}
      to={menu.path}
      onClick={handleClose}
    >
      <div className="account-wrapper">
        <ListItemIcon>
          {React.createElement(menu.icon, {
            className: "account-menu-icon",
          })}
        </ListItemIcon>
        <ListItemText>{menu.title}</ListItemText>
      </div>
    </StyledMenuItem>
  ));

  const messageMenuItem = messagesNotifications
    .filter((notification) => !notification.isRead)
    .map((message) => (
      <StyledMenuItem
        notificationId={notificationId}
        key={message._id}
        onClick={() => {
          handleClose();
          markMessageNotificationAsRead(message._id);
        }}
        sx={{ background: !message.isRead ? "#f6f6f6" : undefined }}
        component={Link}
        to="/admin/received-emails"
      >
        <div>
          <ListItemIcon>
            <MarkEmailUnreadSharpIcon />
          </ListItemIcon>
          <ListItemText>You have a new message</ListItemText>
        </div>
        <Typography color="primary" variant="subtitle1">
          <Moment fromNow>{message?.createdAt}</Moment>
        </Typography>
      </StyledMenuItem>
    ));

  const lowStockMenuItem = lowStockNotifications.map((notification) => (
    <StyledMenuItem
      notificationId={notificationId}
      key={notification._id}
      onClick={() => {
        handleClose();
        markLowStockNotificationsAsRead(notification._id);
      }}
      sx={{ background: !notification.isRead ? "#f6f6f6" : undefined }}
    >
      <div>
        <ListItemIcon>
          <ProductionQuantityLimitsOutlinedIcon />
        </ListItemIcon>
        <ListItemText sx={{ textTransform: "uppercase" }}>
          {notification.productName}
        </ListItemText>
      </div>
      <Typography
        variant="body2"
        color="secondary.dark"
        sx={{ fontWeight: 400, fontSize: "1.15rem" }}
      >
        Brand: <span style={{ fontWeight: 600 }}>{notification.brandName}</span>
      </Typography>
      <Typography variant="subtitle1" color="error" sx={{ fontWeight: 500 }}>
        Stock: {notification.currentStockQuantity}
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ color: theme.palette.secondary.main }}
      >
        {/* <Moment fromNow>{notification.createdAt}</Moment> */}
      </Typography>
    </StyledMenuItem>
  ));

  const customersMenuItem = customerNotifications.map((notification) => (
    <StyledMenuItem
      notificationId={notificationId}
      key={notification._id}
      onClick={() => {
        handleClose();
        markCustomerNotificationsAsRead(notification._id);
      }}
      component={Link}
      to={`/admin/customers/${notification.customerId}`}
      sx={{ background: !notification.isRead ? "#f6f6f6" : undefined }}
    >
      <div>
        <ListItemIcon>
          <PersonAddAltRoundedIcon />
        </ListItemIcon>
        <ListItemText>A new user has registered</ListItemText>
      </div>
      <Typography
        variant="subtitle1"
        style={{ color: theme.palette.secondary.main }}
      >
        <Moment fromNow>{notification.createdAt}</Moment>
      </Typography>
    </StyledMenuItem>
  ));

  const ordersMenuItem = orderNotifications.map((order) => (
    <StyledMenuItem
      notificationId={notificationId}
      key={order._id}
      onClick={() => {
        handleClose();
        markOrdersNotificationsAsRead(order._id);
      }}
      component={Link}
      to={`/admin/orders/${order.orderId}`}
      color="secondary"
      sx={{ background: !order.isRead ? "#f6f6f6" : undefined }}
    >
      <div>
        <ListItemIcon>
          <AddCardSharpIcon />
        </ListItemIcon>
        <ListItemText>You have received a new order</ListItemText>
      </div>
      <Typography
        variant="subtitle1"
        sx={{ color: theme.palette.secondary.main }}
      >
        <Moment fromNow>{order.createdAt}</Moment>
      </Typography>
    </StyledMenuItem>
  ));

  const preOrderMenuItem = preOrderNotifications.map((notification) => (
    <StyledMenuItem
      notificationId={notificationId}
      key={notification._id}
      onClick={() => {
        handleClose();
        markPreOrderNotificationsAsRead(notification._id);
      }}
      sx={{ background: !notification.isRead ? "#f6f6f6" : undefined }}
    >
      <div>
        <ListItemIcon>
          <ShoppingBasketSharpIcon />
        </ListItemIcon>
        <ListItemText sx={{ textTransform: "uppercase" }}>
          {notification.productName}
        </ListItemText>
      </div>
      <Typography
        variant="body2"
        color="secondary.dark"
        sx={{ fontSize: "1.15rem" }}
      >
        Brand: <span style={{ fontWeight: 600 }}>{notification.brandName}</span>
      </Typography>
      <Typography
        variant="subtitle1"
        // color="secondary"
        sx={{ fontWeight: 500, color: theme.palette.success.dark }}
      >
        {notification.customerName}
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ color: theme.palette.secondary.main }}
      >
        <Moment fromNow>{notification.createdAt}</Moment>
      </Typography>
    </StyledMenuItem>
  ));

  return (
    <Menu
      anchorEl={anchorEl}
      id={notificationId}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflowY: "auto",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          minWidth: 250,
          maxWidth: 300,
          minHeight: 200,
          maxHeight: 400,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
          "&::-webkit-scrollbar": {
            width: ".85rem",
          },

          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 1rem rgba(0, 0, 0, 0.2)",
          },

          "&::-webkit-scrollbar-thumb": {
            borderRadius: ".5rem",
            background: theme.palette.common.lightGrey,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {/* NOTIFICATIONS MENU HEADINGS */}
      {notificationId !== "account" && (
        <Grid container direction="column">
          {notificationId !== "messages" && (
            <Grid
              item
              container
              justifyContent="flex-end"
              pr={2}
              onClick={handleClearNotifications}
            >
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ cursor: "pointer" }}
              >
                Clear All
              </Typography>
            </Grid>
          )}
          <Grid item container direction="column">
            <Grid item pl={2}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontWeight: 600, color: theme.palette.secondary.dark }}
              >
                {menuListTitle}
              </Typography>
            </Grid>
            <Divider />
          </Grid>
        </Grid>
      )}
      {/* ACCOUNT MENU HEADER TEXT */}
      {notificationId === "account" && (
        <Grid container direction="column" pl={2} pr={1} pb={1.5}>
          <Grid item>
            <Typography
              variant="h4"
              sx={{ fontSize: "1.5rem", fontWeight: 700 }}
              color="secondary"
            >
              Welcome, {admin?.companyName}
            </Typography>
          </Grid>
        </Grid>
      )}
      {orderNotifications.length === 0 && notificationId === "orders" && (
        <EmptyNotification message="There are no new orders" />
      )}
      {customerNotifications.length === 0 && notificationId === "customers" && (
        <EmptyNotification message="There are no new customers" />
      )}
      {lowStockNotifications.length === 0 && notificationId === "low-stock" && (
        <EmptyNotification message="There are no low stock quantities" />
      )}
      {messagesNotifications.filter((message) => !message.isRead).length ===
        0 &&
        notificationId === "messages" && (
          <EmptyNotification message="There are no new incoming messages" />
        )}
      {preOrderNotifications.length === 0 &&
        notificationId === "pre-orders" && (
          <EmptyNotification message="There are no new pre-orders" />
        )}

      {notificationId === "messages"
        ? messageMenuItem
        : notificationId === "low-stock"
        ? lowStockMenuItem
        : notificationId === "customers"
        ? customersMenuItem
        : notificationId === "orders"
        ? ordersMenuItem
        : notificationId === "pre-orders"
        ? preOrderMenuItem
        : accountMenuItem}

      {notificationId === "account" && (
        <StyledMenuItem onClick={handleLogout} notificationId={notificationId}>
          <div>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </div>
        </StyledMenuItem>
      )}
    </Menu>
  );
};

export default CustomMenuList;
