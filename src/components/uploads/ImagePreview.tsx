import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useActions } from "src/hooks/useActions";

import {
  ImageWrapper,
  Image,
  Input,
  StyledCameraIcon,
  StyledProgressBar,
} from "./styles/ImagePreview";
import { useTypedSelector } from "src/hooks/useTypedSelector";

export type SelectedFileType = File | null;

const initialState = null;

async function urlToInputFile(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], "filename.jpg", { type: blob.type });
}

const ImagePreview = (props: { dataValue: { profileImage: string } }) => {
  const { dataValue } = props;
  // IMAGE PREVIEW STATES
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [selectedFile, setSelectedFile] =
    useState<SelectedFileType>(initialState);

  const uploadingFile = useTypedSelector((state) => state.common.uploadingFile);
  const uploadPercentage = useTypedSelector(
    (state) => state.common.uploadPercentage
  );

  const { uploadFile } = useActions();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImagePreview(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    const mapUrlToFileType = async () => {
      let file;
      if (dataValue) {
        if (dataValue.profileImage) {
          file = await urlToInputFile(dataValue.profileImage);
        }
      }

      if (file) {
        setSelectedFile(file);
      }
    };

    mapUrlToFileType();
  }, []);

  //   useEffect(() => {
  //     if (dataValue) {
  //       let newSelectedFile = "";
  //       if (dataValue.profileImage) {
  //         // newSelectedFile = dataValue.profileImage;
  //       }

  //       console.log(dataValue.profileImage);

  //       setSelectedFile(newSelectedFile);
  //     }
  //   }, [dataValue]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile || typeof selectedFile === "string") {
      setImagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleUpload = () => {
    if (!selectedFile) return;

    uploadFile({
      file: selectedFile,
    });
  };

  return (
    <ImageWrapper item selectedFile={selectedFile} imagePreview={imagePreview}>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={onSelectFile}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <StyledCameraIcon imagePreview={imagePreview} />
        </IconButton>
      </label>
      {(uploadingFile && uploadPercentage) > 0 && (
        <StyledProgressBar value={uploadPercentage} />
      )}
      <Image
        src={typeof selectedFile === "string" ? selectedFile : imagePreview}
        alt="preview"
      />

      <Button
        variant="contained"
        component="span"
        color="secondary"
        onClick={handleUpload}
      >
        Click to upload
      </Button>
    </ImageWrapper>
  );
};

export default ImagePreview;
