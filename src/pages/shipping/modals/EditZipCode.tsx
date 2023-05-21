import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import ZipCodeFormLayout from "../utils/ZipCodeFormLayout";

type EditZipCodeProps = {
  openEditZipCode: boolean;
  setOpenEditZipCode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditZipCode = (props: EditZipCodeProps) => {
  const { openEditZipCode, setOpenEditZipCode } = props;
  const [zipCode, setZipCode] = useState("");

  const singleZipCode = useTypedSelector(
    (state) => state.shipping.singleZipCode
  );

  useEffect(() => {
    if (singleZipCode) {
      setZipCode(singleZipCode.zipCode);
    }
  }, [singleZipCode]);

  return (
    <ZipCodeFormLayout
      zipCode={zipCode}
      setZipCode={setZipCode}
      openZipCode={openEditZipCode}
      setOpenZipCode={setOpenEditZipCode}
      isEdit={true}
    />
  );
};

export default EditZipCode;
