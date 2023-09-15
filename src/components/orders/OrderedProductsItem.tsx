import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import StarsIcon from "@mui/icons-material/Stars";

import { OrdersProductsType } from "src/services/orders/OrderTypes";

const ProductImage = styled("img")({
  width: 50,
  height: 50,
  maxWidth: 100,
  maxHeight: 100,
});

const StyledChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 2,
  left: 5,
  fontSize: "1rem",
  color: "#fff",
  textAlign: "center",
  background: theme.palette.primary.light,
  height: 20,
}));

type OrderProductsItemProps = {
  order: OrdersProductsType;
};

const OrderedProductsItem = (props: OrderProductsItemProps) => {
  const {
    order: { product, productQuantity, productTotalCost, isSpecial },
  } = props;
  const { id, image, itemCode, brandName, name, price, productUPC } = product;

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
      <TableCell style={{ position: "relative" }}>
        {isSpecial && (
          <StyledChip
            label="Special"
            icon={<StarsIcon style={{ color: "#e2cc4a", fontSize: 16 }} />}
          />
        )}
        <ProductImage src={image} alt={`${name} icon`} />
      </TableCell>
      <TableCell>{brandName}</TableCell>
      <TableCell style={{ minWidth: 200 }}>{name}</TableCell>
      <TableCell>
        <p>
          <span style={{ fontWeight: 700, fontSize: "1.3rem" }}>
            Item Code:
          </span>{" "}
          {itemCode}
        </p>
        <p>
          <span style={{ fontWeight: 700, fontSize: "1.3rem" }}>UPC:</span>{" "}
          {productUPC}
        </p>
      </TableCell>
      <TableCell style={{ minWidth: 100 }}>
        <Typography variant="body1" style={{ fontWeight: 600 }}>
          <span>Price: </span>${price}
        </Typography>
        <Typography variant="body2">
          <span>Qty: </span> {productQuantity}
        </Typography>
      </TableCell>
      <TableCell align="center">${productTotalCost?.toFixed(2)}</TableCell>
    </TableRow>
  );
};

export default OrderedProductsItem;
