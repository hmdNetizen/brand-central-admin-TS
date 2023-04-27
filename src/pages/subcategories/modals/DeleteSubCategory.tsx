import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import PropTypes from "prop-types";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteSubCategoryProps = {
  openDeleteSubCategory: boolean;
  setOpenDeleteSubCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteSubCategory = (props: DeleteSubCategoryProps) => {
  const { openDeleteSubCategory, setOpenDeleteSubCategory } = props;
  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );
  const singleSubCategory = useTypedSelector(
    (state) => state.categories.singleSubCategory
  );

  const { deleteSubCategory } = useActions();

  const handleDeleteCategory = () => {
    deleteSubCategory({
      subCategoryId: singleSubCategory?._id!,
      setOpenDeleteSubCategory,
    });
  };

  return (
    <ActionModal
      actionType="Delete"
      loading={loadingRequestAction}
      openAction={openDeleteSubCategory}
      setOpenAction={setOpenDeleteSubCategory}
      handleAction={handleDeleteCategory}
      data={singleSubCategory?.name!}
    />
  );
};

DeleteSubCategory.propTypes = {
  openDeleteSubCategory: PropTypes.bool.isRequired,
  setOpenDeleteSubCategory: PropTypes.func.isRequired,
};

export default DeleteSubCategory;
