import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeletePreOrderProps = {
  openDeletePreOrder: boolean;
  setOpenDeletePreOrder: React.Dispatch<React.SetStateAction<boolean>>;
  actionType: string;
  clickAction?: () => void;
  productName: string;
  isClickAction: boolean;
};

const DeletePreOrder = (props: DeletePreOrderProps) => {
  const {
    openDeletePreOrder,
    setOpenDeletePreOrder,
    actionType,
    clickAction,
    productName,
    isClickAction,
  } = props;

  const singlePreOrder = useTypedSelector(
    (state) => state.preOrders.singlePreOrder
  );
  const loadingPreOrderAction = useTypedSelector(
    (state) => state.preOrders.loadingPreOrderAction
  );

  const { deletePreOrder } = useActions();

  const handleDeletePreOrder = () => {
    deletePreOrder({
      preOrderId: singlePreOrder?._id!,
      setOpenDeletePreOrder,
    });
  };
  return (
    <ActionModal
      actionType={actionType}
      loading={loadingPreOrderAction}
      openAction={openDeletePreOrder}
      setOpenAction={setOpenDeletePreOrder}
      data={productName}
      handleAction={isClickAction ? clickAction! : handleDeletePreOrder}
    />
  );
};

DeletePreOrder.defaultProps = {
  actionType: "Delete",
};

export default DeletePreOrder;
