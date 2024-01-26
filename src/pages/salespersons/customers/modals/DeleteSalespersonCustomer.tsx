import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteSalespersonCustomerProps = {
  openDeleteSalespersonCustomer: boolean;
  setOpenDeleteSalespersonCustomer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const DeleteSalespersonCustomer = (props: DeleteSalespersonCustomerProps) => {
  const { openDeleteSalespersonCustomer, setOpenDeleteSalespersonCustomer } =
    props;
  const loadingSalespersonCustomerAction = useTypedSelector(
    (state) => state.salespersonCustomers.loadingSalespersonCustomerAction
  );
  const singleSalespersonCustomer = useTypedSelector(
    (state) => state.salespersonCustomers.singleSalespersonCustomer
  );

  const { deleteSalespersonCustomer } = useActions();

  const handleDeleteSalespersonCustomer = () => {
    deleteSalespersonCustomer({
      customerId: singleSalespersonCustomer?.id!,
      setOpen: setOpenDeleteSalespersonCustomer,
    });
  };

  return (
    <ActionModal
      actionType="delete"
      loading={loadingSalespersonCustomerAction}
      openAction={openDeleteSalespersonCustomer}
      setOpenAction={setOpenDeleteSalespersonCustomer}
      handleAction={handleDeleteSalespersonCustomer}
      data={singleSalespersonCustomer?.companyName!}
    />
  );
};

export default DeleteSalespersonCustomer;
