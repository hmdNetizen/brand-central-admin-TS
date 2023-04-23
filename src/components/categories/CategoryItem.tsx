import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CustomSwitch from "src/utils/CustomSwitch";
import { useTheme } from "@mui/material/styles";
import { CategoryReturnedPayload } from "src/services/categories/CategoryTypes";
import {
  ActionButton,
  CategoryIcon,
  OptionsTableData,
  StyledIconButton,
} from "./styles/CategoryItemStyles";
import { useActions } from "src/hooks/useActions";

type CategoryItemProps = {
  category: CategoryReturnedPayload;
  setOpenEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoryItem = (props: CategoryItemProps) => {
  const theme = useTheme();
  const { category, setOpenEditCategory, setOpenDeleteCategory } = props;
  const { categoryName, categorySlug, isActivate, setIcon } = category;

  const { setCurrentCategory, toggleCategoryActivation } = useActions();

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: CategoryReturnedPayload
  ): void => {
    toggleCategoryActivation({
      categoryId: category._id,
      isActivate: !category.isActivate,
    });
  };

  const handleEditCategory = (category: CategoryReturnedPayload) => {
    setOpenEditCategory(true);
    setCurrentCategory(category);
  };

  const handleDeleteCategory = (category: CategoryReturnedPayload) => {
    setOpenDeleteCategory(true);
    setCurrentCategory(category);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <CategoryIcon src={setIcon} alt={`${categoryName}'s Icon`} />
      </TableCell>
      <TableCell style={{ minWidth: 250 }}>
        {categoryName.toUpperCase()}
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>
        {categorySlug.toLowerCase()}
      </TableCell>
      <TableCell align="center">
        <CustomSwitch
          color={isActivate ? "success" : "error"}
          onChange={(event) => handleSwitchChange(event, category)}
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
            onClick={() => handleEditCategory(category)}
          />

          <StyledIconButton onClick={() => handleDeleteCategory(category)}>
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default CategoryItem;
