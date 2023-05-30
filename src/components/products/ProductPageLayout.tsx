import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { productColumns } from "src/lib/dataset/tableData";
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
import ProductItem from "./ProductItem";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { ProductPageLayoutProps } from "./types";

const ProductPageLayout = (props: ProductPageLayoutProps) => {
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

  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const loadingProducts = useTypedSelector(
    (state) => state.products.loadingProducts
  );
  const totalProducts = useTypedSelector(
    (state) => state.products.totalProducts
  );
  const loadingProductActivation = useTypedSelector(
    (state) => state.products.loadingProductActivation
  );

  const { getAllCategories, getAllSubcategories, fetchAllBrands } =
    useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLoadingActivation = () => {
    return !loadingProductActivation;
  };

  const handleClose = () => {
    setOpenProductGallery(false);
  };

  useEffect(() => {
    getAllCategories();
    getAllSubcategories();
    fetchAllBrands();
  }, []);

  useEffect(() => {
    if (!selectedFile || typeof selectedFile === "string") {
      // setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

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
          hasAddProductButton={hasAddProductButton}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={productColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            total={totalProducts}
            setRowsPerPage={setRowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loadingProducts}
            notFoundText="No Product found"
          >
            {!loadingProducts &&
              productDataset.map((product) => {
                return (
                  <ProductItem
                    key={product._id}
                    product={product}
                    setOpenDeleteProduct={setOpenDeleteProduct}
                    setOpenEditProduct={setOpenEditProduct}
                    setOpenHighlight={setOpenHighlight}
                    setOpenProductGallery={setOpenProductGallery}
                  />
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
        <PhotoGallery
          setOpenProductGallery={setOpenProductGallery}
          preview={preview}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </ShowDialog>
      <CustomLoadingDialog
        loading={loadingProductActivation}
        handleLoading={handleLoadingActivation}
      />
    </Container>
  );
};

ProductPageLayout.defaultProps = {
  hasAddProductButton: true,
};

export default ProductPageLayout;
