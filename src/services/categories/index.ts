import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../axios";
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
  BrandsCategoryReturnedPayload,
  BrandCategoryRequestPayload,
  ReturnPaginationPayloadType,
  BrandCategoryRequestNewPayload,
} from "./CategoryTypes";
import { AxiosError } from "axios";
import React from "react";
import { config } from "src/config/config";

const initialState: initStateType = {
  loading: false,
  loadingActivation: false,
  loadingRequestAction: false,
  categories: [],
  subCategories: [],
  brandCategories: [],
  total: 0,
  singleCategory: null,
  singleSubCategory: null,
  singleBrandCategory: null,
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching categories"
        );
      }
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching categories"
        );
      }
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again"
        );
      }
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "add-category",
  async (details: RequestPayloadType<CategoryRequestPayload>, thunkAPI) => {
    const { setCategoryData, setOpen, file, ...fields } = details;
    const { config: fileConfig, formData } = fileUploadConfig(file);
    try {
      const { data: uploadedFile } = await axios.post(
        config.uploads.single,
        formData,
        fileConfig
      );
      const result = uploadedFile as UploadedFilePayload;

      const { data, status } = await axios.post(`/api/categories/add/v1`, {
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again"
        );
      }
    }
  }
);

export const updateCategory = createAsyncThunk(
  "update-category",
  async (details: RequestPayloadType<CategoryRequestNewPayload>, thunkAPI) => {
    const { categoryId, setOpen, setCategoryData, file, ...fields } = details;
    const { config: fileConfig, formData } = fileUploadConfig(file);

    try {
      // Checks whether a new icon is being uploaded (which by default is an object type)
      if (typeof file === "object") {
        const { data: uploadedFile } = await axios.post(
          config.uploads.single,
          formData,
          fileConfig
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again"
        );
      }
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Category could not be deleted");
      }
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching Sub-categories"
        );
      }
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again"
        );
      }
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
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again"
        );
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
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again"
        );
      }
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "delete-Subcategory",
  async (
    details: {
      subCategoryId: string;
      setOpenDeleteSubCategory: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { subCategoryId, setOpenDeleteSubCategory } = details;
    try {
      const { status } = await axios.delete(
        `/api/sub-categories/${subCategoryId}/remove`
      );

      if (status === 200) {
        setOpenDeleteSubCategory(false);
      }

      return subCategoryId;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Sub-category could not be deleted.");
      }
    }
  }
);

// Brands categories
export const getAllBrandsCategories = createAsyncThunk(
  "brands-categories",
  async (details: { page: number; limit: number }, thunkAPI) => {
    const { page, limit } = details;

    try {
      const { data } = await axios.get(
        `/api/brand-name/v1?page=${page}&limit=${limit}`
      );
      const result =
        data as ReturnPaginationPayloadType<BrandsCategoryReturnedPayload>;
      return {
        total: result.data.total,
        brandCategories: result.data.data,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching brands");
      }
    }
  }
);

export const getSearchedBrandsCategories = createAsyncThunk(
  "searched-brands-categories",
  async (
    details: { page: number; limit: number; searchTerm: string },
    thunkAPI
  ) => {
    const { page, limit, searchTerm } = details;
    const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";

    try {
      const { data } = await axios.get(
        `/api/brand-name/v1?page=${page}&limit=${limit}${searchQuery}`
      );
      const result =
        data as ReturnPaginationPayloadType<BrandsCategoryReturnedPayload>;
      return {
        total: result.data.total,
        brandCategories: result.data.data,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching brands");
      }
    }
  }
);

export const toggleBrandCategoryActivation = createAsyncThunk(
  "toggle-brand-category-activation",
  async (
    details: { brandCategoryId: string; isActivate: boolean },
    thunkAPI
  ) => {
    const { brandCategoryId, isActivate } = details;
    try {
      await axios.patch(`/api/brand-name/${brandCategoryId}/activate`, {
        isActivate,
      });

      return {
        brandCategoryId,
        isActivate,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again"
        );
      }
    }
  }
);

export const addNewBrandCategory = createAsyncThunk(
  "add-brand-category",
  async (
    details: RequestPayloadType<BrandCategoryRequestPayload>,
    thunkAPI
  ) => {
    const { setBrandCategoryData, setOpen, ...fields } = details;
    try {
      const { data, status } = await axios.post(
        `/api/brand-name/add/v1`,
        fields
      );

      const result =
        data as ReturnedSinglePayloadType<BrandsCategoryReturnedPayload>;

      if (status === 201) {
        setBrandCategoryData({
          category: "",
          subCategory: "",
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
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again"
        );
      }
    }
  }
);

export const updateBrandCategory = createAsyncThunk(
  "update-brand-category",
  async (details: BrandCategoryRequestNewPayload, thunkAPI) => {
    const { brandCategoryId, setOpen, ...fields } = details;
    try {
      const { data, status } = await axios.patch(
        `/api/brand-name/${brandCategoryId}/update/v1`,
        fields
      );
      const result =
        data as ReturnedSinglePayloadType<BrandsCategoryReturnedPayload>;

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
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again."
        );
      }
    }
  }
);

export const deleteBrandCategory = createAsyncThunk(
  "delete-brand-category",
  async (
    details: {
      brandCategoryId: string;
      setOpenDeleteBrandCategory: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { brandCategoryId, setOpenDeleteBrandCategory } = details;
    try {
      const { status } = await axios.delete(
        `/api/brand-name/${brandCategoryId}/remove`
      );

      if (status === 200) {
        setOpenDeleteBrandCategory(false);
      }

      return brandCategoryId;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Brand category could not be deleted.");
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
    setCurrentBrandCategory: (
      state,
      action: PayloadAction<BrandsCategoryReturnedPayload>
    ) => {
      state.singleBrandCategory = action.payload;
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

        toast.success(`${action.payload.categoryName} added successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
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
    builder
      .addCase(deleteSubCategory.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.subCategories = state.subCategories.filter(
          (subCategory) => subCategory._id !== action.payload
        );
        state.error = null;

        toast.error(`SubCategory is successfully deleted`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getAllBrandsCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBrandsCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.brandCategories = action.payload.brandCategories;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(getAllBrandsCategories.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(getSearchedBrandsCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.brandCategories = action.payload.brandCategories;
      state.total = action.payload.total;
      state.error = null;
    });
    builder
      .addCase(toggleBrandCategoryActivation.pending, (state) => {
        state.loadingActivation = true;
      })
      .addCase(toggleBrandCategoryActivation.fulfilled, (state, action) => {
        state.loadingActivation = false;
        const { brandCategoryId, isActivate } = action.payload;
        state.brandCategories = state.brandCategories.map((brandCategory) =>
          brandCategory._id === brandCategoryId
            ? {
                ...brandCategory,
                isActivate,
              }
            : brandCategory
        );
        if (isActivate) {
          toast.success("Brand Category activated successfully", {
            position: "top-center",
            hideProgressBar: true,
          });
        } else {
          toast.error(`Brand Category has been deactivated`, {
            position: "top-center",
            hideProgressBar: true,
          });
        }

        state.error = null;
      })
      .addCase(toggleBrandCategoryActivation.rejected, (state, action) => {
        state.loadingActivation = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(addNewBrandCategory.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(addNewBrandCategory.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.brandCategories = [action.payload, ...state.brandCategories];
        state.error = null;

        toast.success(`${action.payload.name} added to Brand Category`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(addNewBrandCategory.rejected, (state, action) => {
        state.loadingRequestAction = false;

        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateBrandCategory.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(updateBrandCategory.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.brandCategories = state.brandCategories.map((brandCategory) =>
          brandCategory._id === action.payload._id
            ? { ...action.payload }
            : brandCategory
        );
        state.error = null;

        toast.success(`${action.payload.name} has been updated`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateBrandCategory.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(deleteBrandCategory.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(deleteBrandCategory.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.brandCategories = state.brandCategories.filter(
          (brandCategory) => brandCategory._id !== action.payload
        );
        state.error = null;

        toast.error(`Brand Category is successfully deleted`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(deleteBrandCategory.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const {
  setCurrentCategory,
  setCurrentSubCategory,
  setCurrentBrandCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
