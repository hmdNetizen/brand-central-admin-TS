import React from "react";
import { useSelector } from "react-redux";
import { useActions } from "src/hooks/useActions";
import ActionModal from "src/utils/ActionModal";

type DeleteProductProps = {
  openDeleteProduct: boolean;
  setOpenDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteProduct = (props: DeleteProductProps) => {
  const { openDeleteProduct, setOpenDeleteProduct } = props;

  const { singleProduct, loadingAction } = useSelector(
    (state) => state.products
  );
  const { deleteProduct } = useActions();

  const handleDeleteProduct = () => {
    deleteProduct({
      productId: singleProduct._id,
      setOpenDeleteProduct,
    });
  };

  return (
    <ActionModal
      actionType="Delete"
      loading={loadingAction}
      openAction={openDeleteProduct}
      setOpenAction={setOpenDeleteProduct}
      handleAction={handleDeleteProduct}
      data={
        Object.keys(singleProduct).length > 0 ? singleProduct.productName : null
      }
    />
  );
};

export default DeleteProduct;
