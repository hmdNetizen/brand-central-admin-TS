import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CustomSwitch from "src/utils/CustomSwitch";
import {
  OptionsTableData,
  ActionButton,
  StyledIconButton,
} from "src/components/common/styles/CommonPageStyles";
import { SubCategoryReturnedPayload } from "src/services/categories/CategoryTypes";
import { useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";

type SubCategoryItemProps = {
  subCategory: SubCategoryReturnedPayload;
  setOpenEditSubCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteSubCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubCategoryItem = (props: SubCategoryItemProps) => {
  const theme = useTheme();
  const { subCategory, setOpenDeleteSubCategory, setOpenEditSubCategory } =
    props;
  const { _id, category, name, categorySlug, isActivate } = subCategory;

  const { setCurrentSubCategory, toggleSubCategoryActivation } = useActions();

  const handleSwitchChange = () => {
    toggleSubCategoryActivation({
      subCategoryId: _id,
      isActivate: !isActivate,
    });
  };

  const handleEditSubCategory = () => {
    setOpenEditSubCategory(true);
    setCurrentSubCategory(subCategory);
  };

  const handleDeleteSubCategory = () => {
    setOpenDeleteSubCategory(true);
    setCurrentSubCategory(subCategory);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell sx={{ minWidth: 200 }}>{category.toUpperCase()}</TableCell>
      <TableCell sx={{ minWidth: 150 }}>{name}</TableCell>
      <TableCell sx={{ minWidth: 200 }}>{categorySlug.toLowerCase()}</TableCell>
      <TableCell align="center">
        <CustomSwitch
          color="success"
          onChange={handleSwitchChange}
          checked={isActivate}
          isActive={isActivate}
        />
      </TableCell>
      <TableCell>
        <OptionsTableData>
          <ActionButton
            startIcon={<EditSharpIcon />}
            background={theme.palette.secondary}
            title="Edit"
            onClick={handleEditSubCategory}
          />

          <StyledIconButton onClick={handleDeleteSubCategory}>
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default SubCategoryItem;
