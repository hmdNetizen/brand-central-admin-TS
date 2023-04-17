import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import CustomSwitch from "src/utils/CustomSwitch";
import { UserProfileReturnedPayload } from "src/services//user/UserTypes";
import { useActions } from "src/hooks/useActions";
import {
  ActionButton,
  OptionsTableData,
  StyledIconButton,
  UnblockButton,
} from "./styles/CustomerItemStyles";

type CustomerItemProp = {
  customer: UserProfileReturnedPayload;
  setOpenEditCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEmail: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomerItem = (prop: CustomerItemProp) => {
  const theme = useTheme();
  const { customer, setOpenDeleteCustomer, setOpenEditCustomer, setOpenEmail } =
    prop;
  const { _id, companyName, companyEmail, isBlocked } = customer;

  const { setCurrentCustomer } = useActions();

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    customer: UserProfileReturnedPayload
  ): void => {
    handleToggleCustomerBlock({
      customerId: customer._id,
      isBlocked: !customer.isBlocked,
    });
  };

  const handleCustomerUnblock = (
    customer: UserProfileReturnedPayload
  ): void => {
    unblockCustomer(customer._id);
  };

  const handleEditCustomer = (customer: UserProfileReturnedPayload): void => {
    setOpenEditCustomer(true);
    setCurrentCustomer(customer);
  };

  const handleDeleteCustomer = (customer: UserProfileReturnedPayload): void => {
    setOpenDeleteCustomer(true);
    setCurrentCustomer(customer);
  };

  const handleSendEmail = (customer: UserProfileReturnedPayload) => {
    setOpenEmail(true);
    setCurrentCustomer(customer);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={_id}>
      <TableCell style={{ minWidth: 250 }}>{companyName}</TableCell>
      <TableCell style={{ minWidth: 200 }}>{companyEmail}</TableCell>
      <TableCell align="center">
        {!isBlocked ? (
          <CustomSwitch
            color="error"
            onChange={(event) => handleSwitchChange(event, customer)}
            checked={isBlocked}
            isActive={isBlocked}
          />
        ) : (
          <UnblockButton
            variant="contained"
            color="success"
            disableRipple
            onClick={() => handleCustomerUnblock(customer)}
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
            to={`customers/${_id}`}
          />
          <ActionButton
            startIcon={<EditSharpIcon />}
            background={theme.palette.secondary}
            title="Edit"
            onClick={() => handleEditCustomer(customer)}
          />
          <ActionButton
            startIcon={<MailSharpIcon />}
            background={theme.palette.secondary}
            title="Send"
            onClick={() => handleSendEmail(customer)}
          />
          <StyledIconButton onClick={() => handleDeleteCustomer(customer)}>
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default CustomerItem;
