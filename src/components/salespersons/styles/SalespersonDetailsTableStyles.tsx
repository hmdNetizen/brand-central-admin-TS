import { styled } from "@mui/material/styles";
import { SalespersonDetailsTableProps } from "../SalespersonDetailsTable";

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
  },

  "& td:nth-of-type(1)": {
    background: "rgba(249, 249, 249, 0.5)",
  },

  "& td:nth-of-type(2)": {
    [theme.breakpoints.only("xs")]: {
      minWidth: 0,
    },
  },
}));

export const Status = styled("p")<SalespersonDetailsTableProps>(
  ({ theme, singleSalesperson: { isActive } }) => ({
    display: "inline-block",
    padding: ".5rem 2rem",
    borderRadius: 20,
    fontWeight: 500,
    background: isActive
      ? theme.palette.common.lightGreen
      : theme.palette.common.lightRed,
    color: isActive ? theme.palette.success.main : theme.palette.error.main,
  })
);
