import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteCustomerProps = {
  openDeleteCustomer: boolean;
  setOpenDeleteCustomer: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteCustomer = (props: DeleteCustomerProps) => {
  const { openDeleteCustomer, setOpenDeleteCustomer } = props;
  const deletingCustomer = useTypedSelector(
    (state) => state.customers.deletingCustomer
  );
  const singleCustomer = useTypedSelector(
    (state) => state.customers.singleCustomer
  );

  const { deleteCustomer } = useActions();

  const handleDeleteCustomer = () => {
    deleteCustomer({
      customerId: singleCustomer?._id!,
      setOpenDeleteCustomer,
    });
  };

  return (
    <ActionModal
      actionType="delete"
      loading={deletingCustomer}
      openAction={openDeleteCustomer}
      setOpenAction={setOpenDeleteCustomer}
      handleAction={handleDeleteCustomer}
      data={singleCustomer?.companyName!}
    />
  );
};

export default DeleteCustomer;
