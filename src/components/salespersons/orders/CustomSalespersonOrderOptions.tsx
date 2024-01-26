import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomIconButton from "src/utils/CustomIconButton";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import { useActions } from "src/hooks/useActions";
import { Link } from "react-router-dom";
import { StyledMenu } from "../../orders/styles/CustomOrderOptionsStyles";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";

type CustomSalespersonOrderOptionsProps = {
  order: SalespersonOrderResponsePayload;
  setOpenDeliveryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEmailCustomer: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomSalespersonOrderOptions = (
  props: CustomSalespersonOrderOptionsProps
) => {
  const { order, setOpenDeliveryStatus, setOpenEmailCustomer } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setCurrentSalespersonOrder } = useActions();

  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeliveryStatus = (order: SalespersonOrderResponsePayload) => {
    setOpenDeliveryStatus(true);
    setCurrentSalespersonOrder(order);
    handleClose();
  };

  const handleOrderDetails = (order: SalespersonOrderResponsePayload) => {
    setCurrentSalespersonOrder(order);
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
          to={`/dashboard/salespeople/orders/${order.id}`}
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
          to={`/dashboard/salespeople/orders/${order.id}/invoice`}
        >
          <ReceiptSharpIcon />
          View Invoice
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default CustomSalespersonOrderOptions;
