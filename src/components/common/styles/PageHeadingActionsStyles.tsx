import { styled } from "@mui/material/styles";

export const Input = styled("input")(({ theme }) => ({
  fontSize: "1.6rem",
  borderRadius: 5,
  border: `1px solid ${theme.palette.common.lighterGrey}`,
  padding: "1rem 1rem",
  width: "100%",

  "&:focus": {
    outline: "none",
  },
}));
