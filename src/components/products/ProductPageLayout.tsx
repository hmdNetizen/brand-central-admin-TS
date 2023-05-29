import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import CustomIconButton from "src/utils/CustomIconButton";
import AddIcon from "@mui/icons-material/Add";
import CustomSelect from "src/utils/CustomSelect";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { productColumns } from "src/lib/dataset/tableData";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useSelector } from "react-redux";
import CustomMenus from "src/utils/CustomActivationMenus";
import CustomOptionsMenu from "src/utils/CustomOptionsMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
// import ProductHighlights from "./modals/ProductHighlights";
// import EditProduct from "./modals/EditProduct";
// import DeleteProduct from "./modals/DeleteProduct";
import ShowDialog from "src/utils/ShowDialog";
import PhotoGallery from "src/components/products/PhotoGallery";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";
import ProductHeadingLayout from "./ProductHeadingLayout";

const useStyles = makeStyles((theme) => ({
  container: {
    "&.MuiGrid-root": {
      padding: "1rem 2rem 5rem 2rem",

      [theme.breakpoints.only("xs")]: {
        padding: "5rem 1rem 5rem 1rem",
      },
    },
  },
  containerWrapper: {
    background: "#fff",
    padding: "2rem 3rem",
    borderRadius: 5,

    [theme.breakpoints.only("xs")]: {
      padding: "2rem 1rem",
    },
  },
}));

const ProductPageLayout = (props) => {
  const {
    title,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    filterText,
    onChange,
    openDeleteProduct,
    setOpenDeleteProduct,
    openEditProduct,
    setOpenEditProduct,
    openHighlight,
    setOpenHighlight,
    openProductGallery,
    setOpenProductGallery,
    hasAddProductButton,
    productDataset,
  } = props;

  const classes = useStyles();
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const { loadingActivation, total, loadingProducts } = useSelector(
    (state) => state.products
  );

  const {
    setCurrentProduct,
    getAllCategories,
    getAllSubcategories,
    fetchAllBrands,
  } = useActions();

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLoadingActivation = () => {
    return !loadingActivation;
  };

  const handleClose = () => {
    setOpenProductGallery(false);
  };

  useEffect(() => {
    setCurrentProduct({});
    getAllCategories();
    getAllSubcategories();
    fetchAllBrands();

    // eslint-disable-next-line
  }, []);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          {title}
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <ProductHeadingLayout
          filterText={filterText}
          onChange={onChange}
          rowsPerPage={rowsPerPage}
          hasAddProductButton={true}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={productColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            total={total}
            setRowsPerPage={setRowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loadingProducts}
            notFoundText="No Product found"
          >
            {!loadingProducts &&
              productDataset.map((product) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product._id}
                  >
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
              })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      {/* <ProductHighlights
        openHighlight={openHighlight}
        setOpenHighlight={setOpenHighlight}
      />
      <EditProduct
        openEditProduct={openEditProduct}
        setOpenEditProduct={setOpenEditProduct}
      />
      <DeleteProduct
        openDeleteProduct={openDeleteProduct}
        setOpenDeleteProduct={setOpenDeleteProduct}
      /> */}
      <ShowDialog
        openModal={openProductGallery}
        handleClose={handleClose}
        width={matchesXS ? "95%" : matchesSM ? "80%" : 700}
      >
        <PhotoGallery setOpenProductGallery={setOpenProductGallery} />
      </ShowDialog>
      <CustomLoadingDialog
        loading={loadingActivation}
        handleLoading={handleLoadingActivation}
      />
    </Container>
  );
};

ProductPageLayout.defaultProps = {
  hasAddProductButton: true,
};

export default ProductPageLayout;
