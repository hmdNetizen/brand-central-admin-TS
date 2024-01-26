import { styled, Theme } from "@mui/material/styles";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { LinkProps } from "react-router-dom";
import React from "react";

interface CustomMenuItemProps extends MenuItemProps {
  notificationId: string;
}

export const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "notificationId",
})<
  CustomMenuItemProps & { component?: React.ElementType; to?: LinkProps["to"] }
>(({ theme, notificationId }) => ({
  "&.MuiMenuItem-root": {
    padding: ".75rem 1.5rem",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "normal",
    textDecoration: "none",
    display: "block",
    "&:hover": {
      background: "#f4f4f4",
    },
    "&:not(:last-of-type)": {
      borderBottom: notificationId === "account" ? "none" : "1px solid #eee",
    },

    "&:before": {
      content: "none",
      borderTop: "none",
    },
    "&:after": {
      content: "none",
      borderTop: "none",
    },
    "& > div": {
      display: "flex",
      alignItems: "center",

      "& > .MuiListItemIcon-root": {
        minWidth: "2.5rem",

        "& > .MuiSvgIcon-root": {
          fontSize: notificationId === "account" ? "2rem" : undefined,
          color:
            notificationId === "account"
              ? theme.palette.secondary.main
              : undefined,
        },
      },

      "& > .MuiListItemText-root": {
        flex: 1,
        "& > .MuiTypography-root": {
          fontSize: notificationId === "account" ? "1.5rem" : "1.2rem",
          color:
            notificationId === "account"
              ? theme.palette.secondary.main
              : undefined,
        },
      },
    },
    // "& .MuiDivider-wrapper": {
    //   padding: 0,

    // },
  },
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  // position: "absolute",
  // top: 2,
  // left: 5,
  fontSize: ".85rem",
  color: "#fff",
  textAlign: "center",
  background: theme.palette.primary.light,
  height: 20,
  maxWidth: 80,
}));
