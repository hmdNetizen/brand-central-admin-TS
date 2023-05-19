import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { ZipCodeReturnedPayload } from "src/services/shipping/ShoppingTypes";
import {
  ActionButton,
  StyledIconButton,
} from "src/components/common/styles/CommonPageStyles";
import { useActions } from "src/hooks/useActions";

const OptionsTableData = styled("div")({
  minWidth: 150,
  display: "flex",
  gap: "2rem",
});

type ShippingItemProps = {
  zipCode: ZipCodeReturnedPayload;
  index: number;
  setOpenEditZipCode: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteZipCode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShippingItem = (props: ShippingItemProps) => {
  const theme = useTheme();
  const { zipCode, index, setOpenDeleteZipCode, setOpenEditZipCode } = props;

  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));
  const { setCurrentZipCode } = useActions();

  const handleEditZipCode = () => {
    setOpenEditZipCode(true);
    setCurrentZipCode(zipCode);
  };

  const handleDeleteZipCode = () => {
    setOpenDeleteZipCode(true);
    setCurrentZipCode(zipCode);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{`#0${index + 1}`}</TableCell>
      <TableCell style={{ width: !matchesXS ? 200 : "auto" }}>
        {zipCode.zipCode}
      </TableCell>
      <TableCell>
        <OptionsTableData>
          <ActionButton
            startIcon={<EditSharpIcon />}
            background={theme.palette.secondary}
            title="Edit"
            onClick={handleEditZipCode}
          />
          <StyledIconButton
            onClick={handleDeleteZipCode}
            style={{ width: 40, height: 40 }}
          >
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default ShippingItem;
