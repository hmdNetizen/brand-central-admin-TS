import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import CustomSwitch from "src/utils/CustomSwitch";
import { SalesPersonReturnedPayload } from "src/services/salespersons/SalesPersonTypes";
import { useActions } from "src/hooks/useActions";
import {
  ActionButton,
  OptionsTableData,
  StyledIconButton,
  UnblockButton,
} from "../customers/styles/CustomerItemStyles";

type SalesPersonItemProps = {
  salesperson: SalesPersonReturnedPayload;
  setOpenEditSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEmail: React.Dispatch<React.SetStateAction<boolean>>;
};

const SalesPersonItem = (prop: SalesPersonItemProps) => {
  const theme = useTheme();
  const {
    salesperson,
    setOpenDeleteSalesperson,
    setOpenEditSalesperson,
    setOpenEmail,
  } = prop;
  const {
    _id,
    email,
    fullName,
    initials,
    phoneNumber,
    profileImage,
    isActive,
  } = salesperson;

  const { setCurrentSalesperson, handleToggleCustomerBlock, unblockCustomer } =
    useActions();

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    customer: SalesPersonReturnedPayload
  ): void => {
    // handleToggleCustomerBlock({
    //   customerId: customer._id,
    //   isBlocked: !customer.isBlocked,
    // });
  };

  const handleSalespersonActivation = (
    customer: SalesPersonReturnedPayload
  ): void => {
    // unblockCustomer(customer._id);
  };

  const handleEditSalesperson = (
    customer: SalesPersonReturnedPayload
  ): void => {
    setOpenEditSalesperson(true);
    setCurrentSalesperson(customer);
  };

  const handleDeleteSalesperson = (
    customer: SalesPersonReturnedPayload
  ): void => {
    setOpenDeleteSalesperson(true);
    setCurrentSalesperson(customer);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell style={{ maxWidth: 150 }}>
        <img src={profileImage} alt={`${fullName}'s photo`} />
      </TableCell>
      <TableCell style={{ minWidth: 250 }}>
        {fullName} ({initials})
      </TableCell>
      <TableCell style={{ minWidth: 200 }}>{email}</TableCell>
      <TableCell style={{ minWidth: 150 }}>{phoneNumber}</TableCell>
      <TableCell align="center">
        {!isActive ? (
          <CustomSwitch
            color={!isActive ? "success" : "error"}
            onChange={(event) => handleSwitchChange(event, salesperson)}
            checked={!isActive}
            isActive={!isActive}
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
            to={`/dashboard/customers/${_id}`}
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
