import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteOrderProps = {
  openDeleteOrder: boolean;
  setOpenDeleteOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteOrder = (props: DeleteOrderProps) => {
  const { openDeleteOrder, setOpenDeleteOrder } = props;
  const singleOrder = useTypedSelector((state) => state.orders.singleOrder);
  const loadingOrderAction = useTypedSelector(
    (state) => state.orders.loadingOrderAction
  );

  const { deleteOrder } = useActions();

  const handleDeleteOrder = () => {
    deleteOrder({
      orderId: singleOrder?.id!,
      setOpenDeleteOrder,
    });
  };
  return (
    <ActionModal
      actionType="Delete"
      loading={loadingOrderAction}
      openAction={openDeleteOrder}
      setOpenAction={setOpenDeleteOrder}
      handleAction={handleDeleteOrder}
      data={singleOrder?.orderId!}
    />
  );
};

export default DeleteOrder;
