import React from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

interface BadgeProps extends IconButtonProps {
  title: string;
  label: string;
  onClick: () => void;
  notificationId: string;
  open: boolean;
  notificationCount: number;
  children: React.ReactNode;
}

const NotificationBadge = (props: BadgeProps): JSX.Element => {
  const {
    title,
    label,
    notificationId,
    notificationCount,
    open,
    onClick,
    children,
    ...rest
  } = props;
  return (
    <Tooltip
      title={
        <Typography style={{ fontSize: "1rem" }} variant="body2">
          {title}
        </Typography>
      }
    >
      <IconButton
        size="large"
        aria-label={label}
        color="inherit"
        onClick={onClick}
        aria-controls={open ? notificationId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...rest}
      >
        <Badge badgeContent={notificationCount} color="error">
          {children}
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default NotificationBadge;
