import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../axios";
import { clearUploadedImages } from "../common";
import {
  CategoryReturnedPayload,
  ReturnedPayloadType,
  SubCategoryReturnedPayload,
  initStateType,
  ReturnedSinglePayloadType,
  RequestPayloadType,
  CategoryRequestPayload,
} from "./CategoryTypes";

const initialState: initStateType = {
  loading: false,
  loadingActivation: false,
  loadingRequestAction: false,
  categories: [],
  subCategories: [],
  //   brandCategories: [],
  singleCategory: null,
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

export const toggleCategoryActivation = createAsyncThunk(
  "toggle-category-activation",
  async (details: { categoryId: string; isActivate: boolean }, thunkAPI) => {
    const { categoryId, ...fields } = details;
    try {
      const { data } = await axios.patch(
        `/api/categories/${categoryId}/activate`,
        fields
      );
      const result = data as ReturnedSinglePayloadType<CategoryReturnedPayload>;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "add-category",
  async (details: RequestPayloadType<CategoryRequestPayload>, thunkAPI) => {
    const { setCategoryData, setOpenAddCategory, ...fields } = details;
    try {
      const { data, status } = await axios.post(`/api/categories/add`, fields);
      const result = data as ReturnedSinglePayloadType<CategoryReturnedPayload>;

      if (status === 200) {
        thunkAPI.dispatch(clearUploadedImages());
        setCategoryData({
          categoryName: "",
          categorySlug: "",
        });
        setOpenAddCategory(false);
      } else {
        window.scrollTo(0, 0);
      }

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCurrentCategory: (
      state,
      action: PayloadAction<CategoryReturnedPayload>
    ) => {
      state.singleCategory = action.payload;
    },
  },
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
    builder
      .addCase(toggleCategoryActivation.pending, (state) => {
        state.loadingActivation = true;
      })
      .addCase(toggleCategoryActivation.fulfilled, (state, action) => {
        state.loadingActivation = false;
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id
            ? {
                ...action.payload,
              }
            : category
        );
        if (action.payload.isActivate) {
          toast.success(
            `${action.payload.categoryName} category activated successfully`,
            {
              position: "top-center",
              hideProgressBar: true,
            }
          );
        } else {
          toast.error(
            `${action.payload.categoryName} category has been deactivated`,
            {
              position: "top-center",
              hideProgressBar: true,
            }
          );
        }

        state.error = null;
      })
      .addCase(toggleCategoryActivation.rejected, (state, action) => {
        state.loadingActivation = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(addNewCategory.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.categories = [action.payload, ...state.categories];
        state.error = null;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
