import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import DeleteSharpIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Moment from "react-moment";
import { useActions } from "src/hooks/useActions";
import { useTheme } from "@mui/material/styles";
import { ProductTypes } from "src/services/products/ProductTypes";
import {
  ActionButton,
  OptionsTableData,
  StyledIconButton,
} from "./styles/PreOrderItemStyles";

type PreOrderItemProps = {
  preOrder: ProductTypes;
  setOpenSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeletePreOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreOrderItem = (props: PreOrderItemProps) => {
  const theme = useTheme();
  const { preOrder, setOpenDeletePreOrder, setOpenSendEmail } = props;

  const { productName, userWishList, updatedAt } = preOrder;

  const { setCurrentPreOrder } = useActions();

  const handleSendEmail = (preorder: ProductTypes) => {
    setOpenSendEmail(true);
    setCurrentPreOrder(preorder);
  };

  const handleDeletePreorder = (preorder: ProductTypes) => {
    setCurrentPreOrder(preorder);
    setOpenDeletePreOrder(true);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell style={{ minWidth: 200 }}>
        <Moment format="YYYY-MM-DD hh:mm:ss">{updatedAt}</Moment>
      </TableCell>
      <TableCell style={{ minWidth: 250 }}>{productName}</TableCell>
      <TableCell style={{ minWidth: 150 }}>
        {userWishList.map((user, index) => (
          <Typography variant="body2" key={index} style={{ minWidth: 150 }}>
            {user.userId.companyName}
          </Typography>
        ))}
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>
        {userWishList.map((user, index) => (
          <Typography variant="body2" key={index}>
            {user.userId.companyEmail}
          </Typography>
        ))}
      </TableCell>
      <TableCell>
        <OptionsTableData>
          <ActionButton
            startIcon={<MailSharpIcon />}
            background={theme.palette.secondary}
            title="Send"
            onClick={() => handleSendEmail(preOrder)}
          />
          <StyledIconButton onClick={() => handleDeletePreorder(preOrder)}>
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default PreOrderItem;
