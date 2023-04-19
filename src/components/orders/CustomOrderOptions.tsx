import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomIconButton from "src/utils/CustomIconButton";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import { useActions } from "src/hooks/useActions";
import { Link } from "react-router-dom";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import { StyledMenu } from "./styles/CustomOrderOptionsStyles";

type CustomOrderOptionsProps = {
  order: OrderReturnedPayload;
  setOpenDeliveryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEmailCustomer: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomOrderOptions = (props: CustomOrderOptionsProps) => {
  const { order, setOpenDeliveryStatus, setOpenEmailCustomer } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setCurrentOrder } = useActions();

  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeliveryStatus = (order: OrderReturnedPayload) => {
    setOpenDeliveryStatus(true);
    setCurrentOrder(order);
    handleClose();
  };

  const handleEmailOpen = (order: OrderReturnedPayload) => {
    setOpenEmailCustomer(true);
    setCurrentOrder(order);
    handleClose();
  };

  const handleOrderDetails = (order: OrderReturnedPayload) => {
    setCurrentOrder(order);
    handleClose();
  };

  const handleViewInvoice = () => {
    handleClose();
  };

  return (
    <div>
      <CustomIconButton
        title="Actions"
        endIcon={<KeyboardArrowDownIcon />}
        background={theme.palette.secondary}
        disableElevation
        onClick={handleClick}
        id="options-button"
        aria-controls={open ? "options-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          disableRipple
          onClick={() => handleOrderDetails(order)}
          component={Link}
          to={`/dashboard/orders/${order.id}`}
        >
          <VisibilitySharpIcon />
          View Details
        </MenuItem>
        <MenuItem disableRipple onClick={() => handleDeliveryStatus(order)}>
          <LocalShippingOutlinedIcon />
          Delivery Status
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={handleViewInvoice}
          component={Link}
          to={`/dashboard/orders/${order.id}/invoice`}
        >
          <ReceiptSharpIcon />
          View Invoice
        </MenuItem>
        <MenuItem disableRipple onClick={() => handleEmailOpen(order)}>
          <MailSharpIcon />
          Send
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default CustomOrderOptions;
