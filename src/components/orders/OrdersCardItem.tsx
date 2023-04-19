import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomIconButton from "src/utils/CustomIconButton";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useParams, LinkProps } from "react-router-dom";

const CardContainer = styled(Grid)({
  background: "#fff",
  paddingBottom: "1rem",
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
});

const CardHeadingContainer = styled(Grid)({
  padding: "1rem 2rem",
  background: "#e2dbfc",
});

const CardTableWrapper = styled(Grid)({
  padding: "1rem",
});

const Table = styled("table")(({ theme }) => ({
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
    maxWidth: 100,
  },

  "& td:nth-of-type(2)": {
    [theme.breakpoints.only("xs")]: {
      minWidth: 0,
    },
  },
}));

const ActionButton = styled(CustomIconButton)<{
  component: React.ElementType;
  to: LinkProps["to"];
}>({
  minWidth: 64,
  padding: "1rem 1.5rem",
  borderRadius: "2rem",
});

type OrderCardItemProps = {
  heading: string;
  children: React.ReactNode;
  hasButton: boolean;
};

const OrdersCardItem = (props: OrderCardItemProps) => {
  const { heading, children, hasButton } = props;
  const theme = useTheme();
  const { orderId } = useParams();
  return (
    <CardContainer container direction="column">
      <CardHeadingContainer item>
        <Typography variant="h3" color="secondary">
          {heading}
        </Typography>
      </CardHeadingContainer>
      <CardTableWrapper
        item
        container
        direction="column"
        style={{ background: "#fff" }}
      >
        <Table>
          <tbody>{children}</tbody>
        </Table>
        {hasButton && (
          <Grid item sx={{ mt: 2 }}>
            <ActionButton
              startIcon={<VisibilitySharpIcon />}
              background={theme.palette.secondary}
              title="View Invoice"
              component={Link}
              to={`/dashboard/orders/${orderId}/invoice`}
            />
          </Grid>
        )}
      </CardTableWrapper>
    </CardContainer>
  );
};

OrdersCardItem.defaultProps = {
  hasButton: false,
};

export default OrdersCardItem;
