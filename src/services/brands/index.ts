import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  initStateType,
  ResponsePayloadType,
  BrandReturnedPayload,
} from "./BrandTypes";

const initialState: initStateType = {
  loadingBrands: false,
  brands: [],
  singleBrand: null,
  error: null,
};

export const getAllBrands = createAsyncThunk(
  "get-all-brands",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/brand/v1`);
      const result = data as ResponsePayloadType<BrandReturnedPayload>;

      return {
        brands: result.data.data,
        total: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching brands");
    }
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.loadingBrands = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loadingBrands = false;
        state.brands = action.payload.brands;
        state.error = null;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loadingBrands = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default brandsSlice.reducer;
