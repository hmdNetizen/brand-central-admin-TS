import React from "react";
import Box from "@mui/material/Box";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import { styled, Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { useLocation } from "react-router-dom";

type CustomAppBarProps = {
  lastElement: string;
};

const StyledAppBar = styled((props: AppBarProps & SxProps<Theme>) => (
  <AppBar {...props} />
))<CustomAppBarProps>(({ lastElement, theme, ...props }) => ({
  background: "#fff",
  padding: "1rem 2rem 1rem 0",

  [theme.breakpoints.only("xs")]: {
    padding: "1rem 1rem 1rem 0",
  },
}));

const Header = () => {
  const { pathname } = useLocation();
  const splitPath = pathname.split("/");
  const lastElement = splitPath[splitPath.length - 1];

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
            <Link to="/admin">
              <img src={logo} alt="Brand Logo" className={classes.logo} />
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
                setAnchorEl={setOpenNotificationBadge}
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
                setAnchorEl={setOpenNotificationBadge}
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
                setAnchorEl={setOpenNotificationBadge}
                notificationId={notificationId}
                onClick={(event) => {
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
                setAnchorEl={setOpenNotificationBadge}
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
                setAnchorEl={setOpenNotificationBadge}
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
                className={classes.profileIconButton}
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
