import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const Heading = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.85rem",
  marginBottom: "1rem",
});

const Title = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.5rem",

  "& span": {
    fontWeight: 400,
  },
});

type InvoicePersonalDetailsProps = {
  heading: string;
  customerDetails: {
    customerName: string;
    address: string;
    city: string;
  };
};

const CustomerInvoicePersonalDetails = (props: InvoicePersonalDetailsProps) => {
  const { customerDetails, heading } = props;
  const { customerName, address, city } = customerDetails;
  return (
    <Grid item>
      <Grid item container direction="column">
        <Heading variant="h3">{heading}</Heading>
        <Title variant="body1">
          Customer Name: <span>{customerName}</span>
        </Title>
        <Title variant="body1">
          Address: <span> {address}</span>
        </Title>
        <Title variant="body1">
          City/State: <span> {city}</span>
        </Title>
        <Title variant="body1">
          Country: <span> United States</span>
        </Title>
      </Grid>
    </Grid>
  );
};

export default CustomerInvoicePersonalDetails;
