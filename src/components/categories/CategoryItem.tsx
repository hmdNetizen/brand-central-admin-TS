import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CustomSwitch from "src/utils/CustomSwitch";
import CustomIconButton from "src/utils/CustomIconButton";
import { styled, useTheme } from "@mui/material/styles";
import { CategoryReturnedPayload } from "src/services/categories/CategoryTypes";

const CategoryIcon = styled("img")({
  width: 40,
  maxHeight: 60,
});

const OptionsTableData = styled("div")({
  minWidth: 150,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridColumnGap: "1rem",
});

const ActionButton = styled(CustomIconButton)({
  minWidth: 150,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridColumnGap: "1rem",
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.error.main,
  maxWidth: 42,

  "&:hover": {
    background: theme.palette.error.light,
  },

  "&:active": {
    background: theme.palette.error.dark,
  },

  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
}));

type CategoryItemProps = {
  category: CategoryReturnedPayload;
  setOpenEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoryItem = (props: CategoryItemProps) => {
  const theme = useTheme();
  const { category, setOpenEditCategory, setOpenDeleteCategory } = props;
  const { categoryName, categorySlug, isActivate, setIcon } = category;

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
          color={!isActivate ? "success" : "error"}
          onChange={(event) => handleSwitchChange(event, category)}
          checked={!isActivate}
          isActive={!isActivate}
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
