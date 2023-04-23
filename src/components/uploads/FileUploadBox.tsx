import React from "react";
import Grid from "@mui/material/Grid";
import FileUpload from "./FileUpload";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import CustomCircularProgress from "src/utils/CustomCircularProgress";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const UploadWrapper = styled(Grid)(({ theme }) => ({
  background: "#f4f4f4",
  height: 200,

  [theme.breakpoints.down("md")]: {
    maxWidth: 200,
  },
}));

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

type FileUploadBoxProps = {
  setImageError: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  iconSize: string | number;
};

const FileUploadBox = (props: FileUploadBoxProps) => {
  const { setImageError, iconSize, errorMessage } = props;
  const uploadedFile = useTypedSelector((state) => state.common.uploadedFile);
  const uploadPercentage = useTypedSelector(
    (state) => state.common.uploadPercentage
  );
  const uploadingFile = useTypedSelector((state) => state.common.uploadingFile);

  return (
    <UploadWrapper item container justifyContent="center" alignItems="center">
      {uploadingFile || (uploadPercentage > 0 && uploadPercentage < 100) ? (
        <CustomCircularProgress value={uploadPercentage} />
      ) : uploadedFile && uploadedFile.url ? (
        <StyledImage src={uploadedFile.url} alt="" />
      ) : (
        <FileUpload
          setImageError={setImageError}
          iconSize={iconSize}
          errorMessage={errorMessage}
        />
      )}
    </UploadWrapper>
  );
};

export default FileUploadBox;
