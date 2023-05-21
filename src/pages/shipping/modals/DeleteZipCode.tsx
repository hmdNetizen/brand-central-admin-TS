import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteZipCodeProps = {
  openDeleteZipCode: boolean;
  setOpenDeleteZipCode: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteZipCode = (props: DeleteZipCodeProps) => {
  const { openDeleteZipCode, setOpenDeleteZipCode } = props;

  const loadingZipCodeAction = useTypedSelector(
    (state) => state.shipping.loadingZipCodeAction
  );
  const singleZipCode = useTypedSelector(
    (state) => state.shipping.singleZipCode
  );

  const { deleteShippingZipCodes } = useActions();

  const handleDeleteCategory = () => {
    deleteShippingZipCodes({
      zipCodeId: singleZipCode?._id!,
      setOpenDeleteZipCode,
    });
  };

  return (
    <ActionModal
      actionType="Delete"
      loading={loadingZipCodeAction}
      openAction={openDeleteZipCode}
      setOpenAction={setOpenDeleteZipCode}
      handleAction={handleDeleteCategory}
      data={singleZipCode?.zipCode!}
    />
  );
};

export default DeleteZipCode;
