import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CustomSwitch from "src/utils/CustomSwitch";
import plcaceholderIcon from "src/assets/images/placeholder-icon.png";
import { BrandReturnedPayload } from "src/services/brands/BrandTypes";
import CustomIconButton from "src/utils/CustomIconButton";

type BrandItemProps = {
  brand: BrandReturnedPayload;
};

const BrandItem = (props: BrandItemProps) => {
  const {
    brand: { icon, isActivated, name, slug },
  } = props;
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <img
          src={!icon || icon === "-" ? plcaceholderIcon : icon}
          alt={`${name}'s Icon`}
          className={classes.icon}
        />
      </TableCell>
      <TableCell style={{ minWidth: 250 }}>{name.toUpperCase()}</TableCell>
      <TableCell style={{ minWidth: 150 }}>{slug.toLowerCase()}</TableCell>
      <TableCell align="center">
        <CustomSwitch
          color={isActivated ? "success" : "error"}
          onChange={(event) => handleSwitchChange(event, category)}
          checked={isActivated}
          isActive={isActivated}
        />
      </TableCell>
      <TableCell>
        <div className={classes.optionsTableData}>
          <CustomIconButton
            startIcon={<EditSharpIcon />}
            background={theme.palette.secondary}
            title="Edit"
            className={classes.actionButton}
            onClick={() => handleEditBrand(brand)}
          />

          <IconButton
            className={classes.iconButton}
            onClick={() => handleDeleteBrand(brand)}
          >
            <DeleteSharpIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BrandItem;
