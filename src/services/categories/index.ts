import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CategoryReturnedPayload,
  ReturnedPayloadType,
  SubCategoryReturnedPayload,
  initStateType,
} from "./CategoryTypes";
import axios from "../axios";

const initialState: initStateType = {
  loading: false,
  categories: [],
  subCategories: [],
  //   brandCategories: [],
  error: null,
};

// CATEGORIES
export const getAllCategories = createAsyncThunk(
  "all-categories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/categories/v1`);
      const result = data as ReturnedPayloadType<CategoryReturnedPayload>;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error occurred while fetching categories"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default categoriesSlice.reducer;
