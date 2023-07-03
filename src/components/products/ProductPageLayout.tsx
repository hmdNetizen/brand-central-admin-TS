import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { productColumns } from "src/lib/dataset/tableData";
import ProductHighlights from "src/pages/products/modals/ProductHighlights";
import EditProduct from "src/pages/products/modals/EditProduct";
import DeleteProduct from "src/pages/products/modals/DeleteProduct";
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
import { PhotoGalleryTypes } from "src/services/products/ProductTypes";

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

  const [previews, setPreviews] = useState<PhotoGalleryTypes[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [galleryItemId, setGalleryItemId] = useState("");

  const loadingProducts = useTypedSelector(
    (state) => state.products.loadingProducts
  );
  const totalProducts = useTypedSelector(
    (state) => state.products.totalProducts
  );
  const singleProduct = useTypedSelector(
    (state) => state.products.singleProduct
  );
  const loadingProductActivation = useTypedSelector(
    (state) => state.products.loadingProductActivation
  );
  const subCategories = useTypedSelector(
    (state) => state.categories.subCategories
  );

  const [filteredSubCategory, setFilteredSubCategory] = useState(subCategories);

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
    // setPreviews([]);
  };

  useEffect(() => {
    getAllCategories();
    getAllSubcategories();
    fetchAllBrands();
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
      <ProductHighlights
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
      />

      <PhotoGallery
        openProductGallery={openProductGallery}
        setOpenProductGallery={setOpenProductGallery}
        previews={previews}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setPreviews={setPreviews}
        setGalleryItemId={setGalleryItemId}
        galleryItemId={galleryItemId}
        onClose={handleClose}
        singleProduct={singleProduct!}
      />
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
