import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteSalespersonProps = {
  openDeleteSalesperson: boolean;
  setOpenDeleteSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteSalesperson = (props: DeleteSalespersonProps) => {
  const { openDeleteSalesperson, setOpenDeleteSalesperson } = props;
  const loadingRequestAction = useTypedSelector(
    (state) => state.salesPersons.loadingRequestAction
  );
  const singleSalesperson = useTypedSelector(
    (state) => state.salesPersons.singleSalesperson
  );

  const { deleteSalesperson } = useActions();

  const handleDeleteSalesperson = () => {
    deleteSalesperson({
      salespersonId: singleSalesperson?._id!,
      setOpen: setOpenDeleteSalesperson,
    });
  };

  return (
    <ActionModal
      actionType="delete"
      loading={loadingRequestAction}
      openAction={openDeleteSalesperson}
      setOpenAction={setOpenDeleteSalesperson}
      handleAction={handleDeleteSalesperson}
      data={singleSalesperson?.fullName!}
    />
  );
};

export default DeleteSalesperson;
