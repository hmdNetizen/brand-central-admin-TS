import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosProgressEvent } from "axios";
import axios from "../axios";
import { setUploadPercentage } from "../common";
import {
  PaginatedReturnedPayloadType,
  ProductsReturnedPayloadType,
  DashboardProductPayloadType,
  initStateType,
  ProductUpdatePayloadTypes,
} from "./ProductTypes";

type ProductQueryType = {
  page: number;
  limit: number;
};

const initialState: initStateType = {
  loadingProducts: false,
  loadingPopularProducts: false,
  loadingRecentProducts: false,
  products: [],
  recentProducts: [],
  popularProducts: [],
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
  },
});

export const { setUpdatingInventory, setUploadingFileText } =
  productsSlice.actions;
export default productsSlice.reducer;
