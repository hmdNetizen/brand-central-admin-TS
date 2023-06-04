import React from "react";
import { useSelector } from "react-redux";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import ActionModal from "src/utils/ActionModal";

type DeleteProductProps = {
  openDeleteProduct: boolean;
  setOpenDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteProduct = (props: DeleteProductProps) => {
  const { openDeleteProduct, setOpenDeleteProduct } = props;

  const singleProduct = useTypedSelector(
    (state) => state.products.singleProduct
  );
  const loadingProductAction = useTypedSelector(
    (state) => state.products.loadingProductAction
  );

  const { deleteProduct } = useActions();

  const handleDeleteProduct = () => {
    deleteProduct({
      productId: singleProduct?._id!,
      setOpenDeleteProduct,
    });
  };

  return (
    <ActionModal
      actionType="Delete"
      loading={loadingProductAction}
      openAction={openDeleteProduct}
      setOpenAction={setOpenDeleteProduct}
      handleAction={handleDeleteProduct}
      data={singleProduct?.productName!}
    />
  );
};

export default DeleteProduct;
