import React, { useState } from "react";
import ZipCodeFormLayout from "../utils/ZipCodeFormLayout";

type AddZipCodeProps = {
  openAddZipCode: boolean;
  setOpenAddZipCode: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddZipCode = (props: AddZipCodeProps) => {
  const { openAddZipCode, setOpenAddZipCode } = props;
  const [zipCode, setZipCode] = useState("");
  return (
    <ZipCodeFormLayout
      zipCode={zipCode}
      setZipCode={setZipCode}
      openZipCode={openAddZipCode}
      setOpenZipCode={setOpenAddZipCode}
      isEdit={false}
    />
  );
};

export default AddZipCode;
