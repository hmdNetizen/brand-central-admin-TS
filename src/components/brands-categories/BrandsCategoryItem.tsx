import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CustomSwitch from "src/utils/CustomSwitch";
import { useTheme } from "@mui/material/styles";
import {
  OptionsTableData,
  ActionButton,
  StyledIconButton,
} from "src/components/common/styles/CommonPageStyles";
import { capitalizeFirstLetters } from "src/lib/helpers";
import { useActions } from "src/hooks/useActions";
import { BrandsCategoryReturnedPayload } from "src/services/categories/CategoryTypes";

type BrandsCategoryProps = {
  brandCategory: BrandsCategoryReturnedPayload;
  setOpenEditBrandCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteBrandCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const BrandsCategoryItem = (props: BrandsCategoryProps) => {
  const theme = useTheme();
  const {
    brandCategory,
    setOpenDeleteBrandCategory,
    setOpenEditBrandCategory,
  } = props;
  const { category, categorySlug, isActivate, name, subCategory } =
    brandCategory;
  const { setCurrentBrandCategory, toggleBrandCategoryActivation } =
    useActions();

  const handleSwitchChange = () => {
    toggleBrandCategoryActivation({
      brandCategoryId: brandCategory._id,
      isActivate: !brandCategory.isActivate,
    });
  };

  const handleEditBrandCategory = () => {
    setOpenEditBrandCategory(true);
    setCurrentBrandCategory(brandCategory);
  };

  const handleDeleteSubCategory = () => {
    setOpenDeleteBrandCategory(true);
    setCurrentBrandCategory(brandCategory);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell sx={{ minWidth: 200 }}>{category.toUpperCase()}</TableCell>
      <TableCell sx={{ minWidth: 150 }}>{subCategory.toUpperCase()}</TableCell>
      <TableCell sx={{ minWidth: 150 }}>
        {capitalizeFirstLetters(name)}
      </TableCell>
      <TableCell sx={{ minWidth: 150 }} align="center">
        {categorySlug.toLowerCase()}
      </TableCell>
      <TableCell align="center">
        <CustomSwitch
          color={isActivate ? "success" : "error"}
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
            onClick={handleEditBrandCategory}
          />

          <StyledIconButton onClick={handleDeleteSubCategory}>
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default BrandsCategoryItem;
