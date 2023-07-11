import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
import { AxiosError, AxiosProgressEvent } from "axios";
import React from "react";
import { toast } from "react-toastify";
import { fileUploadConfig } from "src/config/fileUpload";
import axios from "../axios";
import { setUploadPercentage } from "../common";
import { UploadedFilePayload } from "../common/commonTypes";
import {
  PaginatedReturnedPayloadType,
  DashboardProductPayloadType,
  initStateType,
  ProductBulkUpdateRequestPayload,
  ProductTypes,
  PhotoGalleryTypes,
  ProductRequestPayloadTypes,
  ProductEditRequestPayload,
  ProductHighlightRequestPayload,
  CreateProductRequestPayload,
  ProductQueryType,
} from "./ProductTypes";

const initialState: initStateType = {
  loadingProducts: false,
  loadingPopularProducts: false,
  loadingRecentProducts: false,
  loadingProductAction: false,
  loadingProductActivation: false,
  loadingSingleProduct: false,
  uploadingImage: false,
  allProducts: [],
  products: [],
  paginatedProducts: [],
  recentProducts: [],
  popularProducts: [],
  singleProduct: null,
  totalProducts: 0,
  uploadedFiles: "",
  updatedInventory: "",
  productSuccessMsg: "",
  error: null,
  errors: null,
};

export const fetchAllProducts = createAsyncThunk(
  "fetch-all-products",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/products`);
      const result = data as { data: ProductTypes[] };

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const getPaginatedProducts = createAsyncThunk(
  "get-products",
  async (query: ProductQueryType, thunkAPI) => {
    const { page, limit } = query;

    try {
      const { data } = await axios.get(
        `/api/products/paginated?page=${page}&limit=${limit}`
      );

      const result = data as PaginatedReturnedPayloadType;

      return {
        paginatedProduct: result.data.paginatedProducts,
        totalProducts: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching products");
    }
  }
);

export const getProductVariants = createAsyncThunk(
  "product-variant",
  async (details: ProductQueryType, thunkAPI) => {
    const { page, limit, variant } = details;
    const pageVariant = variant ? `&variant=${variant}` : "";
    try {
      const { data } = await axios.get(
        `/api/products/v1/variants?page=${page}&limit=${limit}${pageVariant}`
      );

      const result = data as {
        data: {
          paginatedProducts: ProductTypes[];
          total: number;
        };
      };

      return {
        products: result.data.paginatedProducts,
        total: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const getSearchedProducts = createAsyncThunk(
  "searched-product",
  async (details: ProductQueryType, thunkAPI) => {
    const { limit, page, searchTerm, variant } = details;
    const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";
    const pageVariant = variant ? `&variant=${variant}` : "";

    try {
      const { data } = await axios.get(
        `/api/products/v1/variants/searched?page=${page}&limit=${limit}&${searchQuery}${pageVariant}`
      );

      const result = data as {
        data: { products: ProductTypes[]; total: number };
      };

      return {
        products: result.data.products,
        total: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching products");
    }
  }
);

export const getRecentlyAddedProducts = createAsyncThunk(
  "recently-added",
  async (page: number, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/products/v1/recently-added?page=${page}`
      );
      const result = data as DashboardProductPayloadType;

      return result.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching products");
    }
  }
);

export const getDashboardPopularProducts = createAsyncThunk(
  "get-popular-products",
  async (page: number, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/products/v1/popular?limit=${5}&page=${page}`
      );
      const result = data as DashboardProductPayloadType;

      return result.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching products");
    }
  }
);

export const updateInventoryProducts = createAsyncThunk(
  "update-inventory-products",
  async (
    details: { products: ProductBulkUpdateRequestPayload[] },
    thunkAPI
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        thunkAPI.dispatch(setUploadingFileText());
        thunkAPI.dispatch(
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total!)
          )
        );
      },
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        thunkAPI.dispatch(setUpdatingInventory("Updating Inventory"));
        thunkAPI.dispatch(
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total!)
          )
        );
      },
    };
    try {
      const { data, status } = await axios.patch(
        `/api/products/product-update`,
        details,
        config
      );

      if (status === 200) {
        thunkAPI.dispatch(setUpdatingInventory("Update Completed"));
      }

      return data;
    } catch (error) {
      thunkAPI.dispatch(setUploadPercentage(0));
      thunkAPI.dispatch(setUpdatingInventory(""));
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const toggleProductActivation = createAsyncThunk(
  "activate-or-deactivate",
  async (details: { productId: string; productStatus: boolean }, thunkAPI) => {
    const { productId, productStatus } = details;
    try {
      await axios.patch(`/api/products/status/${productId}`, { productStatus });

      return details;
    } catch (error: AxiosError | any) {
      return thunkAPI.rejectWithValue("Product activation failed");
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/admin/single-product",
  async (productId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      const result = data as { data: ProductTypes };
      result.data.productGalleryImages.map((url) => ({
        id: nanoid(),
        url,
      }));
      return result.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

export const addPhotosToGallery = createAsyncThunk(
  "galleryPhoto",
  async (
    data: {
      file: File;
      previews: PhotoGalleryTypes[];
      setPreviews: React.Dispatch<React.SetStateAction<PhotoGalleryTypes[]>>;
    },
    thunkAPI
  ) => {
    const { file, previews, setPreviews } = data;

    const formData = new FormData();
    formData.append("document", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data, status } = await axios.post(
        `/api/uploads/file`,
        formData,
        config
      );
      const result = data as { id: string; url: string; fileName: string };

      if (status === 200) {
        const currentIndex = previews.findIndex(
          (preview) => preview.file?.name === result.fileName
        );
        const currentPreview = previews[currentIndex];

        const newPreview = {
          ...currentPreview,
          url: result.url,
          isUploaded: true,
        };

        const filteredPreviews = previews.filter(
          (previewItem) => previewItem.id !== newPreview.id
        );
        setPreviews([...filteredPreviews, newPreview]);
      }

      return {
        id: nanoid(),
        url: result.url,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong. Try again");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "update-product",
  async (
    details: ProductRequestPayloadTypes<ProductEditRequestPayload>,
    thunkAPI
  ) => {
    const { setOpen, dataset, productId, file } = details;
    const { config, formData } = fileUploadConfig(file);

    try {
      // Checks whether the image being uploaded is a new or or existing one
      // NB: The new one has an object type while the existing one is a string.

      if (typeof file === "object") {
        const { data: uploadedFile } = await axios.post(
          `/api/uploads/file`,
          formData,
          config
        );
        const uploadedResult = uploadedFile as UploadedFilePayload;

        const { data, status } = await axios.put(`/api/products/${productId}`, {
          ...dataset,
          featuredImage: uploadedResult.url,
          hasImage: true,
        });

        if (status === 200) setOpen(false);
        const result = data as { data: ProductTypes };

        return result.data;
      } else {
        const { data, status } = await axios.put(
          `/api/products/${productId}`,
          dataset
        );

        if (status === 200) setOpen(false);
        const result = data as { data: ProductTypes };

        return result.data;
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

export const updateProductGallery = createAsyncThunk(
  "update-gallery",
  async (
    details: {
      productId: string;
      setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
      fields: string[];
    },
    thunkAPI
  ) => {
    const { productId, setOpenProductGallery, fields } = details;
    try {
      const { data, status } = await axios.patch(
        `/api/products/${productId}/product-gallery`,
        {
          productGalleryImages: fields,
        }
      );
      const result = data as {
        data: { productGalleryImages: string[]; productId: string };
      };

      if (status === 200) {
        setOpenProductGallery(false);
      }

      return {
        productGalleryImages: result.data.productGalleryImages,
        productId: result.data.productId,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (
    details: {
      productId: string;
      setOpenDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { productId, setOpenDeleteProduct } = details;
    try {
      const { status } = await axios.delete(
        `/api/products/${productId}/remove`
      );

      if (status === 200) {
        setOpenDeleteProduct(false);
      }

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Product could not be deleted");
    }
  }
);

export const toggleProductHighlight = createAsyncThunk(
  "toggle-highlights",
  async (details: ProductHighlightRequestPayload, thunkAPI) => {
    const { setOpenHighlight, productId, fields } = details;
    try {
      const { status, data } = await axios.put(
        `/api/products/highlight/${productId}`,
        fields
      );

      const result = data as { data: { data: ProductTypes } };

      if (status === 200) {
        setOpenHighlight(false);
        // thunkAPI.dispatch(getSingleProduct(productId));
      }

      return result.data.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong. Try again");
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "add-product",
  async (details: CreateProductRequestPayload, thunkAPI) => {
    const {
      setProductDetails,
      setOptionChecked,
      setProductSizeForm,
      setWholesaleForm,
      setPreview,
      setSelectedFile,
      file,
      dataset,
    } = details;
    const { config, formData } = fileUploadConfig(file);
    try {
      if (typeof file === "object") {
        const { data: uploadedFile } = await axios.post(
          `/api/uploads/file`,
          formData,
          config
        );
        const uploadedResult = uploadedFile as UploadedFilePayload;

        const { data, status } = await axios.post(`/api/products/add`, {
          ...dataset,
          featuredImage: uploadedResult.url,
          hasImage: true,
        });

        const result = data as { data: ProductTypes };

        if (status === 200) {
          // This resets the form
          setProductDetails({
            productName: "",
            category: "",
            customBrandName: "",
            customMeasurement: "",
            itemCode: "",
            maximumQuantity: 0,
            priceCode1: 0,
            priceCode2: 0,
            priceCode3: 0,
            priceCode4: 0,
            productBrand: "",
            productDescription: "",
            productMeasurement: "",
            productStock: 0,
            productUPC: "",
            shippingCategory: "",
            shippingTime: "",
            srpPrice: 0,
            subCategory: "",
            units: "",
          });

          setOptionChecked({
            isThresholdActive: false,
            measurementChecked: false,
            shippingTimeChecked: false,
            sizesChecked: false,
            wholesaleChecked: false,
          });

          setProductSizeForm({
            productSize: [
              {
                _id: nanoid(),
                name: "",
                price: 0,
                quantity: 0,
              },
            ],
          });

          setWholesaleForm({
            productWholesale: [
              {
                _id: nanoid(),
                percentage: 0,
                quantity: 0,
              },
            ],
          });

          setPreview(undefined);
          setSelectedFile("");
        }

        setTimeout(() => {
          thunkAPI.dispatch(clearProductSuccessMsg());
        }, 5000);
        window.scrollTo(0, 0);

        return result.data;
      } else {
        const { data, status } = await axios.post(`/api/products/add`, dataset);

        const result = data as { data: ProductTypes };

        if (status === 200) {
          // This resets the form
          setProductDetails({
            productName: "",
            category: "",
            customBrandName: "",
            customMeasurement: "",
            itemCode: "",
            maximumQuantity: 0,
            priceCode1: 0,
            priceCode2: 0,
            priceCode3: 0,
            priceCode4: 0,
            productBrand: "",
            productDescription: "",
            productMeasurement: "",
            productStock: 0,
            productUPC: "",
            shippingCategory: "",
            shippingTime: "",
            srpPrice: 0,
            subCategory: "",
            units: "",
          });

          setOptionChecked({
            isThresholdActive: false,
            measurementChecked: false,
            shippingTimeChecked: false,
            sizesChecked: false,
            wholesaleChecked: false,
          });

          setProductSizeForm({
            productSize: [
              {
                _id: nanoid(),
                name: "",
                price: 0,
                quantity: 0,
              },
            ],
          });

          setWholesaleForm({
            productWholesale: [
              {
                _id: nanoid(),
                percentage: 0,
                quantity: 0,
              },
            ],
          });

          setPreview(undefined);
          setSelectedFile("");

          window.scrollTo(0, 0);
        }

        return result.data;
      }
    } catch (error: AxiosError | any) {
      window.scrollTo(0, 0);
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setUploadingFileText: (state) => {
      state.uploadedFiles = "Uploading Files";
      state.updatedInventory = "";
    },
    setUpdatingInventory: (state, action) => {
      state.updatedInventory = action.payload;
      state.uploadedFiles = "";
    },
    setCurrentProduct: (state, action: PayloadAction<ProductTypes | null>) => {
      state.singleProduct = action.payload;
    },
    clearProductSuccessMsg: (state) => {
      state.productSuccessMsg = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
    });
    builder
      .addCase(getPaginatedProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(getPaginatedProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = action.payload.paginatedProduct;
        state.totalProducts = action.payload.totalProducts;
        state.error = null;
      })
      .addCase(getPaginatedProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(getSearchedProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.paginatedProducts = action.payload.products;
      state.totalProducts = action.payload.total;
      state.error = null;
      state.errors = null;
    });
    builder
      .addCase(getRecentlyAddedProducts.pending, (state) => {
        state.loadingRecentProducts = true;
      })
      .addCase(getRecentlyAddedProducts.fulfilled, (state, action) => {
        state.loadingRecentProducts = false;
        state.recentProducts = action.payload;
        state.error = null;
      })
      .addCase(getRecentlyAddedProducts.rejected, (state, action) => {
        state.loadingRecentProducts = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getDashboardPopularProducts.pending, (state) => {
        state.loadingPopularProducts = true;
      })
      .addCase(getDashboardPopularProducts.fulfilled, (state, action) => {
        state.loadingPopularProducts = false;
        state.popularProducts = action.payload;
        state.error = null;
      })
      .addCase(getDashboardPopularProducts.rejected, (state, action) => {
        state.loadingPopularProducts = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getProductVariants.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(getProductVariants.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.paginatedProducts = action.payload.products;
        state.totalProducts = action.payload.total;
        state.error = null;
        state.errors = null;
      })
      .addCase(getProductVariants.rejected, (state, action) => {
        state.loadingProducts = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateInventoryProducts.pending, (state) => {
        state.loadingProductAction = true;
      })
      .addCase(updateInventoryProducts.fulfilled, (state, action) => {
        state.loadingProductAction = false;
      })
      .addCase(updateInventoryProducts.rejected, (state, action) => {
        state.loadingProductAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(toggleProductActivation.pending, (state) => {
        state.loadingProductActivation = true;
      })
      .addCase(toggleProductActivation.fulfilled, (state, action) => {
        state.loadingProductActivation = false;
        state.products = state.products.map((product) =>
          product._id === action.payload.productId
            ? {
                ...product,
                productStatus: action.payload.productStatus,
              }
            : product
        );
        if (action.payload.productStatus) {
          toast.success("Product activated successfully", {
            position: "top-center",
            hideProgressBar: true,
          });
        } else {
          toast.error("Product has been Deactivated", {
            position: "top-center",
            hideProgressBar: true,
          });
        }

        state.error = null;
      })
      .addCase(toggleProductActivation.rejected, (state, action) => {
        state.loadingProductActivation = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(getSingleProduct.pending, (state) => {
      state.loadingSingleProduct = true;
    });
    builder
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loadingSingleProduct = false;
        state.singleProduct = action.payload;
        state.error = null;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loadingSingleProduct = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(addPhotosToGallery.pending, (state) => {
        state.uploadingImage = true;
      })
      .addCase(addPhotosToGallery.fulfilled, (state) => {
        state.uploadingImage = false;
        state.error = null;

        toast.success("Image uploaded successfully", {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(addPhotosToGallery.rejected, (state, action) => {
        state.uploadingImage = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.loadingProductAction = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loadingProductAction = false;
        state.products = [action.payload, ...state.products];
        state.error = null;
        state.errors = null;
        state.productSuccessMsg = `${action.payload.itemCode.toUpperCase()} has been created successfully`;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loadingProductAction = false;

        if (Array.isArray(action.payload) || action.payload === null) {
          state.errors = action.payload;
        }
      });
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loadingProductAction = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loadingProductAction = false;
        state.products = state.products.map((product) =>
          product._id === action.payload._id
            ? { ...product, ...action.payload }
            : product
        );

        toast.success("Product successfully updated", {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loadingProductAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateProductGallery.pending, (state) => {
        state.uploadingImage = true;
      })
      .addCase(updateProductGallery.fulfilled, (state, action) => {
        state.uploadingImage = false;
        state.products = state.products.map((product) =>
          product._id === action.payload.productId
            ? {
                ...product,
                productGalleryImages: action.payload.productGalleryImages,
              }
            : product
        );

        state.error = null;

        toast.success("Product gallery updated successfully", {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateProductGallery.rejected, (state, action) => {
        state.uploadingImage = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loadingProductAction = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loadingProductAction = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.error = null;

        toast.success("Product deleted successfully", {
          position: "top-center",
        });
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loadingProductAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });

    builder
      .addCase(toggleProductHighlight.pending, (state) => {
        state.loadingProductAction = true;
      })
      .addCase(toggleProductHighlight.fulfilled, (state, action) => {
        state.loadingProductAction = false;
        state.products = state.products.map((product) =>
          product._id === action.payload?._id
            ? {
                ...product,
                highlight: action.payload.highlight,
              }
            : product
        );
        state.error = null;

        toast.success("Product successfully highlighted", {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(toggleProductHighlight.rejected, (state, action) => {
        state.loadingProductAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const {
  setUpdatingInventory,
  setUploadingFileText,
  setCurrentProduct,
  clearProductSuccessMsg,
} = productsSlice.actions;
export default productsSlice.reducer;
