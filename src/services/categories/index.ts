import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../axios";
import { clearUploadedImages, uploadFile } from "../common";
import { UploadedFilePayload } from "../common/commonTypes";
import { fileUploadConfig } from "src/config/fileUpload";
import {
  CategoryReturnedPayload,
  ReturnedPayloadType,
  SubCategoryReturnedPayload,
  initStateType,
  ReturnedSinglePayloadType,
  RequestPayloadType,
  CategoryRequestPayload,
  CategoryRequestNewPayload,
  SubCategoryRequestPayload,
  SubCategoryRequestNewPayload,
} from "./CategoryTypes";
import { AxiosError } from "axios";

const initialState: initStateType = {
  loading: false,
  loadingActivation: false,
  loadingRequestAction: false,
  categories: [],
  subCategories: [],
  //   brandCategories: [],
  singleCategory: null,
  singleSubCategory: null,
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

export const getSearchedCategory = createAsyncThunk(
  "searched-category",
  async (query: string, thunkAPI) => {
    try {
      const searchQuery = query ? `searchTerm=${query}` : "";
      const { data } = await axios.get(`/api/categories/v1?${searchQuery}`);
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
    const { setCategoryData, setOpen, file, ...fields } = details;
    const { config, formData } = fileUploadConfig(file);
    try {
      const { data: uploadedFile } = await axios.post(
        `/api/uploads/file`,
        formData,
        config
      );
      const result = uploadedFile as UploadedFilePayload;

      const { data, status } = await axios.post(`/api/categories/add`, {
        ...fields,
        setIcon: result.url,
      });
      const response =
        data as ReturnedSinglePayloadType<CategoryReturnedPayload>;

      if (status === 201) {
        setCategoryData({
          categoryName: "",
          categorySlug: "",
        });
        setOpen(false);
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "update-category",
  async (details: RequestPayloadType<CategoryRequestNewPayload>, thunkAPI) => {
    const { categoryId, setOpen, setCategoryData, file, ...fields } = details;
    const { config, formData } = fileUploadConfig(file);

    try {
      // Checks whether a new icon is being uploaded (which by default is an object type)
      if (typeof file === "object") {
        const { data: uploadedFile } = await axios.post(
          `/api/uploads/file`,
          formData,
          config
        );
        const result = uploadedFile as UploadedFilePayload;

        const { data, status } = await axios.patch(
          `/api/categories/${categoryId}/update`,
          { ...fields, setIcon: result.url }
        );

        const response =
          data as ReturnedSinglePayloadType<CategoryReturnedPayload>;

        if (status === 200) {
          setOpen(false);
          setCategoryData({
            categoryName: "",
            categorySlug: "",
          });
        }

        return response.data;
      } else {
        const { data, status } = await axios.patch(
          `/api/categories/${categoryId}/update`,
          fields
        );

        const response =
          data as ReturnedSinglePayloadType<CategoryReturnedPayload>;

        if (status === 200) {
          setOpen(false);
          setCategoryData({
            categoryName: "",
            categorySlug: "",
          });
        }

        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "delete-category",
  async (
    details: {
      categoryId: string;
      setOpenDeleteCategory: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { categoryId, setOpenDeleteCategory } = details;

    try {
      const { status } = await axios.delete(
        `/api/categories/${categoryId}/remove`
      );

      if (status === 200) {
        setOpenDeleteCategory(false);
      }

      return categoryId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Category could not be deleted");
    }
  }
);

// Sub Categories
export const getAllSubcategories = createAsyncThunk(
  "subCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/sub-categories`);
      const result = data as ReturnedPayloadType<SubCategoryReturnedPayload>;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const getSearchedSubCategory = createAsyncThunk(
  "searched-subcategory",
  async (query: string, thunkAPI) => {
    try {
      const searchQuery = query ? `searchTerm=${query}` : "";
      const { data } = await axios.get(`/api/sub-categories/v1?${searchQuery}`);
      const result = data as ReturnedPayloadType<SubCategoryReturnedPayload>;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error occurred while fetching categories"
      );
    }
  }
);

export const toggleSubCategoryActivation = createAsyncThunk(
  "toggle-subcategory-activation",
  async (details: { subCategoryId: string; isActivate: boolean }, thunkAPI) => {
    const { subCategoryId, isActivate } = details;
    try {
      await axios.patch(`/api/sub-categories/${subCategoryId}/activate`, {
        isActivate,
      });

      return {
        subCategoryId,
        isActivate,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const addNewSubCategory = createAsyncThunk(
  "add-sub-category",
  async (details: RequestPayloadType<SubCategoryRequestPayload>, thunkAPI) => {
    const { setSubCategoryData, setOpen, ...fields } = details;
    try {
      const { data, status } = await axios.post(
        `/api/sub-categories/add/v1`,
        fields
      );

      const result =
        data as ReturnedSinglePayloadType<SubCategoryReturnedPayload>;

      if (status === 200) {
        setSubCategoryData({
          category: "",
          name: "",
          categorySlug: "",
        });
        setOpen(false);
      } else {
        window.scrollTo(0, 0);
      }

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

export const updateSubCategory = createAsyncThunk(
  "update-subcategory",
  async (details: SubCategoryRequestNewPayload, thunkAPI) => {
    const { subCategoryId, setOpen, ...fields } = details;
    try {
      const { data, status } = await axios.patch(
        `/api/sub-categories/${subCategoryId}/update/v1`,
        fields
      );

      const result =
        data as ReturnedSinglePayloadType<SubCategoryReturnedPayload>;

      if (status === 200) {
        setOpen(false);
      }

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
    setCurrentSubCategory: (
      state,
      action: PayloadAction<SubCategoryReturnedPayload>
    ) => {
      state.singleSubCategory = action.payload;
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
    builder.addCase(getSearchedCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
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
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? { ...action.payload } : category
        );
        toast.success(`${action.payload.categoryName} has been updated`, {
          position: "top-center",
          hideProgressBar: true,
        });

        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );

        toast.error(`Category is successfully deleted`, {
          position: "top-center",
          hideProgressBar: true,
        });

        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getAllSubcategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
        state.error = null;
      })
      .addCase(getAllSubcategories.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(getSearchedSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.subCategories = action.payload;
      state.error = null;
    });
    builder
      .addCase(toggleSubCategoryActivation.pending, (state) => {
        state.loadingActivation = true;
      })
      .addCase(toggleSubCategoryActivation.fulfilled, (state, action) => {
        const { subCategoryId, isActivate } = action.payload;
        state.subCategories = state.subCategories.map((subCategory) =>
          subCategory._id === subCategoryId
            ? {
                ...subCategory,
                isActivate,
              }
            : subCategory
        );
        if (isActivate) {
          toast.success("Subcategory activated successfully", {
            position: "top-center",
            hideProgressBar: true,
          });
        } else {
          toast.error(`Subcategory has been deactivated`, {
            position: "top-center",
            hideProgressBar: true,
          });
        }

        state.error = null;
      })
      .addCase(toggleSubCategoryActivation.rejected, (state, action) => {
        state.loadingActivation = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(addNewSubCategory.pending, (state, action) => {
        state.loadingRequestAction = true;
      })
      .addCase(addNewSubCategory.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.subCategories = [action.payload, ...state.subCategories];
        state.error = null;

        toast.success(`${action.payload.name} added to Subcategory`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(addNewSubCategory.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateSubCategory.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.subCategories = state.subCategories.map((subCategory) =>
          subCategory._id === action.payload._id
            ? { ...action.payload }
            : subCategory
        );
        state.error = null;

        toast.success(`${action.payload.name} has been updated`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentCategory, setCurrentSubCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
