import { styled } from "@mui/material/styles";

type FormLabelProps = {
  labelColor?: string;
};

export const FormLabel = styled("label", {
  shouldForwardProp: (prop) => prop !== "labelColor",
})<FormLabelProps>(({ theme, labelColor }) => ({
  display: "block",
  fontSize: "1.5rem",
  color: labelColor ? labelColor : theme.palette.secondary.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 500,
  marginBottom: ".75rem",
}));

export const FormInput = styled("input")(({ theme }) => ({
  display: "block",
  width: "100%",
  fontSize: "1.6rem",
  fontWeight: 500,
  padding: "1rem 2rem",
  border: `1px solid ${theme.palette.common.lightGrey}`,
  borderRadius: 5,
  color: theme.palette.primary.light,
  height: 43,

  "&:focus": {
    outline: "none",
  },

  "&::placeholder": {
    fontWeight: 500,
    fontSize: "1.4rem",
    color: "#ccc",
  },
}));

export const Error = styled("small")(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.error.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 500,
}));
