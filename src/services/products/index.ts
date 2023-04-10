import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { PaginatedReturnedPayloadType, initStateType } from "./ProductTypes";

type ProductQueryType = {
  page: number;
  limit: number;
};

const initialState: initStateType = {
  loadingProducts: false,
  products: [],
  totalProducts: 0,
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

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
  },
});

export default productsSlice.reducer;
