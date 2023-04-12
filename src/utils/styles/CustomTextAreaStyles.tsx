export const StyledTextArea = styled("textarea")(({ theme }) => ({
  width: "100%",
  border: `1px solid ${theme.palette.common.lightGrey}`,
  display: "block",
  resize: "none",
  borderRadius: 5,
  minHeight: 200,
  padding: "1rem 2rem",
  fontSize: "1.6rem",
  color: theme.palette.primary.light,
  fontFamily: "Open Sans, Roboto, sans-serif",

  "&:focus": {
    outline: "none",
  },
}));

import { styled } from "@mui/material/styles";

export const Label = styled("label")(({ theme }) => ({
  display: "block",
  fontSize: "1.5rem",
  color: theme.palette.secondary.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 500,
  marginBottom: ".75rem",
}));

export const Error = styled("small")(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.error.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 600,
}));
