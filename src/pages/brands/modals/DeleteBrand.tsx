import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import PropTypes from "prop-types";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteBrandProps = {
  openDeleteBrand: boolean;
  setOpenDeleteBrand: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteBrand = (props: DeleteBrandProps) => {
  const { openDeleteBrand, setOpenDeleteBrand } = props;
  const loadingBrandAction = useTypedSelector(
    (state) => state.brands.loadingBrandAction
  );
  const singleBrand = useTypedSelector((state) => state.brands.singleBrand);

  const { deleteBrand } = useActions();

  const handleDeleteBrand = () => {
    deleteBrand({
      brandId: singleBrand?._id!,
      setOpenDeleteBrand,
    });
  };

  return (
    <ActionModal
      actionType="Delete"
      loading={loadingBrandAction}
      openAction={openDeleteBrand}
      setOpenAction={setOpenDeleteBrand}
      handleAction={handleDeleteBrand}
      data={singleBrand?.name!}
    />
  );
};

DeleteBrand.propTypes = {
  openDeleteBrand: PropTypes.bool.isRequired,
  setOpenDeleteBrand: PropTypes.func.isRequired,
};

export default DeleteBrand;
