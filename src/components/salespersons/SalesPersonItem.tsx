import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useTheme, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import CustomSwitch from "src/utils/CustomSwitch";
import { SalespersonReturnedPayload } from "src/services/salespersons/SalesPersonTypes";
import placeholderAvatar from "src/assets/images/placeholder-avatar.png";
import { useActions } from "src/hooks/useActions";
import {
  ActionButton,
  StyledIconButton,
  UnblockButton,
} from "../customers/styles/CustomerItemStyles";

export const OptionsTableData = styled("div")({
  minWidth: 250,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridColumnGap: "1rem",
});

type SalesPersonItemProps = {
  salesperson: SalespersonReturnedPayload;
  setOpenEditSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
};

const SalesPersonItem = (prop: SalesPersonItemProps) => {
  const theme = useTheme();
  const { salesperson, setOpenDeleteSalesperson, setOpenEditSalesperson } =
    prop;
  const {
    _id,
    email,
    fullName,
    initials,
    phoneNumber,
    profileImage,
    isActive,
  } = salesperson;

  const { setCurrentSalesperson, toggleSalespersonActivation } = useActions();

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    toggleSalespersonActivation({
      id: _id,
      status: !salesperson.isActive,
    });
  };

  const handleSalespersonActivation = (
    salesperson: SalespersonReturnedPayload
  ): void => {
    toggleSalespersonActivation({
      id: _id,
      status: true,
    });
  };

  const handleEditSalesperson = (
    salesperson: SalespersonReturnedPayload
  ): void => {
    setOpenEditSalesperson(true);
    setCurrentSalesperson(salesperson);
  };

  const handleDeleteSalesperson = (
    salesperson: SalespersonReturnedPayload
  ): void => {
    setOpenDeleteSalesperson(true);
    setCurrentSalesperson(salesperson);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell style={{ maxWidth: 50 }}>
        <img
          src={profileImage ? profileImage : placeholderAvatar}
          alt={`${fullName}'s photo`}
          style={{ width: 40 }}
        />
      </TableCell>
      <TableCell style={{ minWidth: 220 }}>
        {fullName} ({initials})
      </TableCell>
      <TableCell style={{ minWidth: 200 }}>{email}</TableCell>
      <TableCell style={{ minWidth: 150 }}>{phoneNumber}</TableCell>
      <TableCell align="center">
        {isActive ? (
          <CustomSwitch
            color={isActive ? "success" : "error"}
            onChange={(event) => handleSwitchChange(event)}
            checked={isActive}
            isActive={isActive}
          />
        ) : (
          <UnblockButton
            variant="contained"
            color="success"
            disableRipple
            onClick={() => handleSalespersonActivation(salesperson)}
          >
            Unblock
          </UnblockButton>
        )}
      </TableCell>
      <TableCell>
        <OptionsTableData>
          <ActionButton
            startIcon={<VisibilitySharpIcon />}
            background={theme.palette.secondary}
            title="Details"
            component={Link}
            to={`/dashboard/salespeople/${_id}`}
          />
          <ActionButton
            startIcon={<EditSharpIcon />}
            background={theme.palette.secondary}
            title="Edit"
            onClick={() => handleEditSalesperson(salesperson)}
          />
          <StyledIconButton
            onClick={() => handleDeleteSalesperson(salesperson)}
          >
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default SalesPersonItem;
