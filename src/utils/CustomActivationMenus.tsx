import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import CustomIconButton from "./CustomIconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { StyledMenu } from "./styles/CustomActivationMenuStyles";
import { ProductTypes } from "src/services/products/ProductTypes";

type ActivationMenuProps = {
  product: ProductTypes;
};

const CustomActivationMenu = ({ product }: ActivationMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();

  const { toggleProductActivation } = useActions();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeactivateProduct = () => {
    toggleProductActivation({
      productId: product._id,
      productStatus: false,
    });

    handleClose();
  };

  const handleActivateProduct = () => {
    toggleProductActivation({
      productId: product._id,
      productStatus: true,
    });

    handleClose();
  };

  return (
    <div>
      <CustomIconButton
        title={product.productStatus ? "Activated" : "Deactivated"}
        id="basic-activation-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        endIcon={<KeyboardArrowDownIcon />}
        background={
          product.productStatus ? theme.palette.success : theme.palette.error
        }
        disableElevation
        onClick={handleClick}
        minWidth={150}
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
          onClick={handleActivateProduct}
          disableRipple
          selected={product.productStatus}
        >
          Activated
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={handleDeactivateProduct}
          selected={!product.productStatus}
        >
          Deactivated
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default CustomActivationMenu;
