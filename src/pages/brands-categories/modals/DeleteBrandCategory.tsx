import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteBrandCategoryProps = {
  openDeleteBrandCategory: boolean;
  setOpenDeleteBrandCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteBrandCategory = (props: DeleteBrandCategoryProps) => {
  const { openDeleteBrandCategory, setOpenDeleteBrandCategory } = props;

  const loadingRequestAction = useTypedSelector(
    (state) => state.categories.loadingRequestAction
  );
  const singleBrandCategory = useTypedSelector(
    (state) => state.categories.singleBrandCategory
  );

  const { deleteBrandCategory } = useActions();

  const handleDeleteBrandCategory = () => {
    deleteBrandCategory({
      brandCategoryId: singleBrandCategory?._id!,
      setOpenDeleteBrandCategory,
    });
  };

  return (
    <ActionModal
      actionType="Delete"
      loading={loadingRequestAction}
      openAction={openDeleteBrandCategory}
      setOpenAction={setOpenDeleteBrandCategory}
      handleAction={handleDeleteBrandCategory}
      data={singleBrandCategory?.name!}
    />
  );
};

export default DeleteBrandCategory;
