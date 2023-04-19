import React from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Link } from "react-router-dom";

type PreviousButtonProps = {
  path: string;
};

const PreviousButton = ({ path, ...rest }: PreviousButtonProps) => {
  return (
    <IconButton component={Link} to={path} {...rest}>
      <KeyboardBackspaceSharpIcon
        color="secondary"
        style={{ fontSize: "3rem" }}
      />
    </IconButton>
  );
};

export default PreviousButton;
