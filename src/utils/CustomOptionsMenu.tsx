import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
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

// const StyledMenu = styled((props) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right",
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === "light"
//         ? "rgb(55, 65, 81)"
//         : theme.palette.grey[300],
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//     "& .MuiMenu-list": {
//       padding: "4px 0",
//     },
//     "& .MuiMenuItem-root": {
//       "& .MuiSvgIcon-root": {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       "&:active": {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity
//         ),
//       },
//     },
//   },
// }));

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

  const { getSingleProduct, setCurrentProduct } = useActions();

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
