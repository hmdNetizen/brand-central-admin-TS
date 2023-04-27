import React from "react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";

type DeleteCategoryProps = {
  openDeleteCategory: boolean;
  setOpenDeleteCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteCategory = (props: DeleteCategoryProps) => {
  const { openDeleteCategory, setOpenDeleteCategory } = props;
  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );
  const singleCategory = useTypedSelector(
    (state) => state.categories.singleCategory
  );

  const { deleteCategory } = useActions();

  const handleDeleteCategory = () => {
    deleteCategory({
      categoryId: singleCategory?._id!,
      setOpenDeleteCategory,
    });
  };

  return (
    <ActionModal
      actionType="delete"
      loading={loadingRequestAction}
      openAction={openDeleteCategory}
      setOpenAction={setOpenDeleteCategory}
      handleAction={handleDeleteCategory}
      data={singleCategory?.categoryName!}
    />
  );
};

export default DeleteCategory;
