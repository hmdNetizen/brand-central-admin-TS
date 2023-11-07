import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import { useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import {
  CardContainer,
  CardHeadingContainer,
  ActionButton,
  CardTableWrapper,
  Table,
} from "../styles/SalespersonOrderDetailsCardItemStyles";

type OrderCardItemProps = {
  heading: string;
  children: React.ReactNode;
  hasButton: boolean;
};

const SalespersonOrderDetailsCardItem = (props: OrderCardItemProps) => {
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
              to={`/dashboard/salespeople/orders/${orderId}/invoice`}
            />
          </Grid>
        )}
      </CardTableWrapper>
    </CardContainer>
  );
};

SalespersonOrderDetailsCardItem.defaultProps = {
  hasButton: false,
};

export default SalespersonOrderDetailsCardItem;
