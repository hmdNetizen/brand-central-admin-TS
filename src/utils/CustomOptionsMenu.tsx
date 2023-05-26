import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarIcon from "@mui/icons-material/Star";
import CustomIconButton from "./CustomIconButton";
import { useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { StyledMenu } from "./styles/StyledMenu";
import { ProductTypes } from "src/services/products/ProductTypes";

type OptionsMenuProps = {
  product: ProductTypes;
  setOpenDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenHighlight: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomOptionsMenu = (props: OptionsMenuProps) => {
  const {
    product,
    setOpenDeleteProduct,
    setOpenEditProduct,
    setOpenHighlight,
    setOpenProductGallery,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();

  const { setCurrentProduct } = useActions();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteProduct = () => {
    setCurrentProduct(product);
    setOpenDeleteProduct(true);
    handleClose();
  };

  const handleEditProduct = () => {
    setOpenEditProduct(true);
    setCurrentProduct(product);
    handleClose();
  };

  const handleProductHighlight = () => {
    setOpenHighlight(true);
    setCurrentProduct(product);
    handleClose();
  };

  const handleOpenGallery = () => {
    setCurrentProduct(product);
    setOpenProductGallery(true);
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
        // loading={loadingAction}
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
        <MenuItem onClick={handleEditProduct} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenGallery} disableRipple>
          <RemoveRedEyeIcon />
          View Gallery
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <AddIcon />
          Add to Catalog
        </MenuItem>
        <MenuItem onClick={handleProductHighlight} disableRipple>
          <StarIcon />
          Highlight
        </MenuItem>
        <MenuItem onClick={handleDeleteProduct} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default CustomOptionsMenu;
