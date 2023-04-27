import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

type DeleteSubCategoryProps = {
  openDeleteSubCategory: boolean;
  setOpenDeleteSubCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteSubCategory = ({}) => {
  const { loadingAction, singleSubCategory } = useSelector(
    (state) => state.common
  );

  const { deleteSubCategory } = useActions();

  const handleDeleteCategory = () => {
    deleteSubCategory({
      subCategoryId: singleSubCategory._id,
      setOpenDeleteSubCategory,
    });
  };

  return (
    <ActionModal
      actionType="Delete"
      loading={loadingAction}
      openAction={openDeleteSubCategory}
      setOpenAction={setOpenDeleteSubCategory}
      handleAction={handleDeleteCategory}
      data={singleSubCategory && singleSubCategory.name}
    />
  );
};

DeleteSubCategory.propTypes = {
  openDeleteSubCategory: PropTypes.bool.isRequired,
  setOpenDeleteSubCategory: PropTypes.func.isRequired,
};

export default DeleteSubCategory;
