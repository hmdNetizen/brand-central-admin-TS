import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
import { AxiosError, AxiosProgressEvent } from "axios";
import React from "react";
import { toast } from "react-toastify";
import axios from "../axios";
import { setUploadPercentage } from "../common";
import {
  PaginatedReturnedPayloadType,
  ProductsReturnedPayloadType,
  DashboardProductPayloadType,
  initStateType,
  ProductUpdatePayloadTypes,
  ProductTypes,
  PhotoGalleryTypes,
} from "./ProductTypes";

type ProductQueryType = {
  page: number;
  limit: number;
};

const initialState: initStateType = {
  loadingProducts: false,
  loadingPopularProducts: false,
  loadingRecentProducts: false,
  loadingProductAction: false,
  loadingProductActivation: false,
  loadingSingleProduct: false,
  uploadingImage: false,
  products: [],
  recentProducts: [],
  popularProducts: [],
  singleProduct: null,
  totalProducts: 0,
  uploadedFiles: "",
  updatedInventory: "",
  error: null,
};

export const getPaginatedProducts = createAsyncThunk(
  "get-products",
  async (query: ProductQueryType, thunkAPI) => {
    const { page, limit } = query;
    try {
      const { data } = await axios.get(
        `/api/products/paginated?page=${page + 1}&limit=${limit}`
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
  async (details: { products: ProductUpdatePayloadTypes[] }, thunkAPI) => {
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
    setCurrentProduct: (state, action: PayloadAction<ProductTypes>) => {
      state.singleProduct = action.payload;
    },
  },
  extraReducers(builder) {
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
      .addCase(addPhotosToGallery.fulfilled, (state, action) => {
        state.uploadingImage = false;
        // state.singleProduct?.productGalleryImages.push(action.payload);
        // state.singleProduct = state.singleProduct;
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
  },
});

export const { setUpdatingInventory, setUploadingFileText, setCurrentProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
