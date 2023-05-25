import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { DropzoneRootProps } from "react-dropzone";

export const Input = styled("input")({
  display: "none",
});

const getColor = (props: DropzoneRootProps) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#6a77b3";
};

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fcfcfc;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const ProgressTextWrapper = muiStyled("div")({
  display: "flex",
  justifyContent: "center",
  paddingTop: "1rem",
});
