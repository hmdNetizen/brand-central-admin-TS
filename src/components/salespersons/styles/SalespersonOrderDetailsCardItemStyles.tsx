import Grid from "@mui/material/Grid";
import CustomIconButton from "src/utils/CustomIconButton";
import { styled } from "@mui/material/styles";
import { LinkProps } from "react-router-dom";

export const CardContainer = styled(Grid)({
  background: "#fff",
  paddingBottom: "1rem",
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
});

export const CardHeadingContainer = styled(Grid)({
  padding: "1rem 2rem",
  background: "#e2dbfc",
});

export const CardTableWrapper = styled(Grid)({
  padding: "1rem",
});

export const Table = styled("table")(({ theme }) => ({
  width: "100%",
  borderRadius: 5,
  "&, td": {
    borderCollapse: "collapse",
    border: `1px solid ${theme.palette.common.lighterGrey}`,
  },

  "& td": {
    padding: "1rem 2rem",
    fontSize: "1.5rem",
    fontFamily: "Open Sans, Roboto",

    [theme.breakpoints.only("xs")]: {
      padding: ".5rem",
    },
  },

  "& td:nth-of-type(1)": {
    background: "rgba(249, 249, 249, 0.5)",
    maxWidth: 150,
  },

  "& td:nth-of-type(2)": {
    [theme.breakpoints.only("xs")]: {
      minWidth: 0,
    },
  },
}));

export const ActionButton = styled(CustomIconButton)<{
  component: React.ElementType;
  to: LinkProps["to"];
}>({
  minWidth: 64,
  padding: "1rem 1.5rem",
  borderRadius: "2rem",
});
