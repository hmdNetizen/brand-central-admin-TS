import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useLocation, Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MailIcon from "@mui/icons-material/Mail";
import LoyaltySharpIcon from "@mui/icons-material/LoyaltySharp";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import logo from "src/assets/images/logo-black.png";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { StyledAppBar, StyledLogo } from "./styles/HeaderStyles";

import NotificationBadge from "./NotificationBadge";
import CustomMenuList from "./CustomMenuList";

type HeaderProps = {
  menuSlideIn: boolean;
  setMenuSlideIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = (props: HeaderProps) => {
  const { menuSlideIn, setMenuSlideIn } = props;

  const { pathname } = useLocation();
  const splitPath = pathname.split("/");
  const lastElement = splitPath[splitPath.length - 1];

  const matchesXXS = useMediaQuery("(max-width: 390px)");
  const matchesXXXS = useMediaQuery("(max-width: 350px)");

  const [notificationId, setNotificationId] = useState<string>("");
  const [openNotificationBadge, setOpenNotificationBadge] =
    useState<HTMLElement | null>(null);
  const open = Boolean(openNotificationBadge);

  const {
    messagesNotifications,
    lowStockNotifications,
    customerNotifications,
    orderNotifications,
    preOrderNotifications,
  } = useTypedSelector((state) => state.notifications);
  const { admin } = useTypedSelector((state) => state.user);

  const handleNotificationOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpenNotificationBadge(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed" lastElement={lastElement}>
        <Toolbar
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
          }}
        >
          <Box sx={{ mr: { xs: 0, sm: "auto" } }}>
            <Link to="/">
              <StyledLogo src={logo} alt="Brand Logo" />
            </Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              {menuSlideIn ? (
                <IconButton onClick={() => setMenuSlideIn(false)}>
                  <MenuIcon color="primary" sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              ) : (
                <IconButton onClick={() => setMenuSlideIn(true)}>
                  <CloseIcon color="primary" sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              )}
            </Box>
            <Box>
              <NotificationBadge
                notificationCount={
                  messagesNotifications.filter((message) => !message.isRead)
                    .length
                }
                label={`show ${
                  messagesNotifications.filter((message) => !message.isRead)
                    .length
                } new mails`}
                style={{
                  marginRight: matchesXXXS ? 0 : matchesXXS ? "0.5rem" : "1rem",
                }}
                title="Incoming Messages"
                open={open}
                // setAnchorEl={setOpenNotificationBadge}
                notificationId={notificationId}
                onClick={(event) => {
                  handleNotificationOpen(event);
                  setNotificationId("messages");
                }}
              >
                <MailIcon color="secondary" />
              </NotificationBadge>

              <NotificationBadge
                notificationCount={
                  lowStockNotifications.filter(
                    (notification) => !notification.isRead
                  ).length
                }
                label={`show ${
                  lowStockNotifications.filter(
                    (notification) => !notification.isRead
                  ).length
                } new items in cart`}
                style={{
                  marginRight: matchesXXXS ? 0 : matchesXXS ? "0.5rem" : "1rem",
                }}
                title="Low stock quantity"
                open={open}
                // setAnchorEl={setOpenNotificationBadge}
                notificationId={notificationId}
                onClick={(event) => {
                  handleNotificationOpen(event);
                  setNotificationId("low-stock");
                }}
              >
                <ShoppingCartIcon color="secondary" />
              </NotificationBadge>

              <NotificationBadge
                notificationCount={
                  customerNotifications.filter(
                    (notification) => !notification.isRead
                  ).length
                }
                label={`show ${
                  customerNotifications.filter(
                    (notification) => !notification.isRead
                  ).length
                } newly registered users`}
                style={{
                  marginRight: matchesXXXS ? 0 : matchesXXS ? "0.5rem" : "1rem",
                }}
                title="New Customers"
                open={open}
                // setAnchorEl={setOpenNotificationBadge}
                notificationId={notificationId}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  handleNotificationOpen(event);
                  setNotificationId("customers");
                }}
              >
                <GroupAddIcon color="secondary" />
              </NotificationBadge>

              <NotificationBadge
                notificationCount={
                  orderNotifications.filter((order) => !order.isRead).length
                }
                label={`show ${
                  orderNotifications.filter((order) => !order.isRead).length
                } new order`}
                style={{
                  marginRight: matchesXXXS ? 0 : matchesXXS ? "0.5rem" : "1rem",
                }}
                title="New Orders"
                open={open}
                // setAnchorEl={setOpenNotificationBadge}
                notificationId={notificationId}
                onClick={(event) => {
                  handleNotificationOpen(event);
                  setNotificationId("orders");
                }}
              >
                <CreditScoreIcon color="secondary" />
              </NotificationBadge>

              <NotificationBadge
                notificationCount={
                  preOrderNotifications.filter(
                    (notification) => !notification.isRead
                  ).length
                }
                label={`show 1 new pre-order`}
                style={{
                  marginRight: matchesXXXS
                    ? "1rem"
                    : matchesXXS
                    ? "2rem"
                    : "1rem",
                }}
                title="New Pre-orders"
                open={open}
                // setAnchorEl={setOpenNotificationBadge}
                notificationId={notificationId}
                onClick={(event) => {
                  handleNotificationOpen(event);
                  setNotificationId("pre-orders");
                }}
              >
                <LoyaltySharpIcon color="secondary" />
              </NotificationBadge>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={(event) => {
                  setNotificationId("account");
                  handleNotificationOpen(event);
                }}
                color="inherit"
              >
                <img
                  src={admin?.profileImage}
                  alt="Account"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
        <CustomMenuList
          anchorEl={openNotificationBadge}
          setAnchorEl={setOpenNotificationBadge}
          open={open}
          notificationId={notificationId}
        />
      </StyledAppBar>
      {/* This only displays if the page url doesn't end with /print */}
      {lastElement !== "print" && <Toolbar style={{ marginTop: "2rem" }} />}
    </Box>
  );
};

export default Header;
