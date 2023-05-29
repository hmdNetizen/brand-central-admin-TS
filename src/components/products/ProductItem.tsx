import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomMenus from "src/utils/CustomActivationMenus";
import CustomOptionsMenu from "src/utils/CustomOptionsMenu";
import { ProductTypes } from "src/services/products/ProductTypes";

type ProductItemProps = {
  product: ProductTypes;
  setOpenDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenHighlight: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductItem = (props: ProductItemProps) => {
  const {
    product,
    setOpenDeleteProduct,
    setOpenEditProduct,
    setOpenHighlight,
    setOpenProductGallery,
  } = props;
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <img
          src={product.featuredImage}
          alt={`${product.productName}`}
          style={{ width: 80 }}
        />
      </TableCell>
      <TableCell>{product.productName}</TableCell>
      <TableCell>{product.productType || "Physical"}</TableCell>
      <TableCell>{product.productStock}</TableCell>
      <TableCell>${product.priceCode1.toFixed(2)}</TableCell>
      <TableCell>
        <CustomMenus product={product} />
      </TableCell>
      <TableCell>
        <CustomOptionsMenu
          product={product}
          setOpenDeleteProduct={setOpenDeleteProduct}
          setOpenEditProduct={setOpenEditProduct}
          setOpenHighlight={setOpenHighlight}
          setOpenProductGallery={setOpenProductGallery}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
