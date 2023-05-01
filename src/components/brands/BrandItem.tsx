import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CustomSwitch from "src/utils/CustomSwitch";
import plcaceholderIcon from "src/assets/images/placeholder-icon.png";
import { BrandReturnedPayload } from "src/services/brands/BrandTypes";
import { styled, useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import {
  OptionsTableData,
  ActionButton,
  StyledIconButton,
} from "src/components/common/styles/CommonPageStyles";

type BrandItemProps = {
  brand: BrandReturnedPayload;
  setOpenEditBrand: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteBrand: React.Dispatch<React.SetStateAction<boolean>>;
  isDeactivatedPage: boolean;
};

const ActivateButton = styled(Button)({
  fontSize: "1.2rem",
  color: "#fff",
  fontWeight: 600,
});

const BrandItem = (props: BrandItemProps) => {
  const theme = useTheme();
  const { brand, setOpenDeleteBrand, setOpenEditBrand, isDeactivatedPage } =
    props;

  const { icon, isActivated, name, slug } = brand;

  const { setCurrentBrand, toggleBrandActivation } = useActions();

  const handleSwitchChange = () => {
    toggleBrandActivation({
      brandId: brand._id,
      isActivated: !brand.isActivated,
    });
  };

  const handleEditBrand = () => {
    setOpenEditBrand(true);
    setCurrentBrand(brand);
  };

  const handleDeleteBrand = () => {
    setOpenDeleteBrand(true);
    setCurrentBrand(brand);
  };

  const handleBrandActivation = () => {
    toggleBrandActivation({
      brandId: brand._id,
      isActivated: true,
    });
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <img
          src={!icon || icon === "-" ? plcaceholderIcon : icon}
          alt={`${name}'s Icon`}
          style={{ width: 70 }}
        />
      </TableCell>
      <TableCell style={{ minWidth: 250 }}>{name.toUpperCase()}</TableCell>
      <TableCell style={{ minWidth: 150 }}>{slug.toLowerCase()}</TableCell>
      <TableCell align="center">
        {!isDeactivatedPage ? (
          <CustomSwitch
            color={isActivated ? "success" : "error"}
            onChange={handleSwitchChange}
            checked={isActivated}
            isActive={isActivated}
          />
        ) : (
          <ActivateButton
            variant="contained"
            color="success"
            disableRipple
            onClick={handleBrandActivation}
          >
            Activate
          </ActivateButton>
        )}
      </TableCell>
      <TableCell>
        <OptionsTableData>
          <ActionButton
            startIcon={<EditSharpIcon />}
            background={theme.palette.secondary}
            title="Edit"
            onClick={handleEditBrand}
          />

          <StyledIconButton onClick={handleDeleteBrand}>
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default BrandItem;
