import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { OrdersProductsType } from "src/services/orders/OrderTypes";

const ProductImage = styled("img")({
  width: 50,
  height: 50,
  maxWidth: 100,
  maxHeight: 100,
});

type OrderProductsItemProps = {
  order: OrdersProductsType;
};

const OrderedProductsItem = (props: OrderProductsItemProps) => {
  const {
    order: { product, productQuantity, productTotalCost },
  } = props;
  const { id, image, itemCode, brandName, name, price } = product;

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
      <TableCell>
        <ProductImage src={image} alt={`${name} icon`} />
      </TableCell>
      <TableCell>{itemCode}</TableCell>
      <TableCell>{brandName}</TableCell>
      <TableCell style={{ minWidth: 250 }}>{name}</TableCell>
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
