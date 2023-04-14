import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";

type LabelProps = {
  hasLabel: boolean;
};

export const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiList-root &.MuiMenu-list": {
    paddingTop: 0,
    width: "100%",
  },
  "& .MuiOutlinedInput-input": {
    padding: "1rem 1rem",
    fontSize: "1.4rem",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.common.lightGrey,
  },

  "&.MuiOutlinedInput-root": {
    minWidth: 48,
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme.palette.common.lightGrey}`,
        borderWidth: 1,
      },
    },
  },
}));

export const Label = styled("label", {
  shouldForwardProp: (prop) => prop !== "hasLabel",
})<LabelProps>(({ theme, hasLabel }) => ({
  display: "block",
  fontSize: "1.5rem",
  color: theme.palette.secondary.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 500,
  marginBottom: hasLabel ? ".75rem" : 0,
}));

export const StyledMenuItem = styled(MenuItem)({
  fontSize: "1.4rem",
});

export const Error = styled("small")(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.error.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 600,
}));
