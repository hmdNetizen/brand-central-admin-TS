import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { toast } from "react-toastify";
import {
  initStateType,
  ResponsePayloadType,
  BrandReturnedPayload,
  BrandRequestPayload,
  SingleResponsePayloadType,
} from "./BrandTypes";
import { fileUploadConfig } from "src/config/fileUpload";
import { UploadedFilePayload } from "../common/commonTypes";
import { AxiosError } from "axios";
import { VideoFileRounded } from "@mui/icons-material";

const initialState: initStateType = {
  loadingBrands: false,
  loadingBrandActivation: false,
  loadingBrandAction: false,
  brands: [],
  total: 0,
  singleBrand: null,
  error: null,
};

export const getAllBrands = createAsyncThunk(
  "get-all-brands",
  async (query: { page: number; limit: number }, thunkAPI) => {
    const { page, limit } = query;
    try {
      const { data } = await axios.get(
        `/api/brand/v1?page=${page}&limit=${limit}`
      );
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

export const getSearchedBrands = createAsyncThunk(
  "get-searched-brands",
  async (
    query: { page: number; limit: number; searchTerm: string },
    thunkAPI
  ) => {
    const { page, limit, searchTerm } = query;
    const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";
    try {
      const { data } = await axios.get(
        `/api/brand/v1?page=${page}&limit=${limit}${searchQuery}`
      );
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

export const toggleBrandActivation = createAsyncThunk(
  "toggle-brand-name-activation",
  async (details: { brandId: string; isActivated: boolean }, thunkAPI) => {
    const { brandId, isActivated } = details;
    try {
      await axios.patch(`/api/brand/${brandId}/activate`, {
        isActivated,
      });

      return {
        brandId,
        isActivated,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const createNewBrand = createAsyncThunk(
  "add-new-brand",
  async (details: BrandRequestPayload, thunkAPI) => {
    const {
      setBrandData,
      setOpen,
      file,
      setPreview,
      setSelectedFile,
      ...fields
    } = details;
    const { config, formData } = fileUploadConfig(file);
    try {
      if (typeof file === "object") {
        const { data: uploadedFile } = await axios.post(
          `/api/uploads/file`,
          formData,
          config
        );

        const result = uploadedFile as UploadedFilePayload;

        const { data, status } = await axios.post(`/api/brand/add/v1`, {
          ...fields,
          icon: result.url,
        });
        const response = data as SingleResponsePayloadType;

        if (status === 201) {
          setBrandData({
            name: "",
            slug: "",
          });

          setPreview(undefined);
          setSelectedFile("");
          setOpen(false);
        }

        return response.data;
      } else {
        const { data, status } = await axios.post(`/api/brand/add/v1`, fields);
        const response = data as SingleResponsePayloadType;

        if (status === 201) {
          setBrandData({
            name: "",
            slug: "",
          });

          setPreview(undefined);
          setSelectedFile("");
          setOpen(false);
        }

        return response.data;
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

export const updateBrand = createAsyncThunk(
  "update-brand",
  async (details: BrandRequestPayload, thunkAPI) => {
    const {
      setBrandData,
      setOpen,
      brandId,
      file,
      setPreview,
      setSelectedFile,
      ...fields
    } = details;
    const { config, formData } = fileUploadConfig(file);
    try {
      if (typeof file === "object") {
        const { data: uploadedFile } = await axios.post(
          `/api/uploads/file`,
          formData,
          config
        );

        const result = uploadedFile as UploadedFilePayload;

        const { data, status } = await axios.patch(
          `/api/brand/${brandId}/update/v1`,
          {
            ...fields,
            icon: result.url,
          }
        );
        const response = data as SingleResponsePayloadType;

        if (status === 200) {
          setBrandData({
            name: "",
            slug: "",
          });

          setOpen(false);
          setPreview(undefined);
          setSelectedFile("");
        }

        return response.data;
      } else {
        const { data, status } = await axios.patch(
          `/api/brand/${brandId}/update/v1`,
          fields
        );
        const response = data as SingleResponsePayloadType;

        if (status === 200) {
          setBrandData({
            name: "",
            slug: "",
          });

          setOpen(false);
          setPreview(undefined);
          setSelectedFile("");
        }

        return response.data;
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

export const deleteBrand = createAsyncThunk(
  "delete-brand",
  async (
    details: {
      brandId: string;
      setOpenDeleteBrand: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { brandId, setOpenDeleteBrand } = details;
    try {
      const { status } = await axios.delete(`/api/brand/${brandId}/remove`);

      if (status === 200) {
        setOpenDeleteBrand(false);
      }

      return brandId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Brand could not be deleted");
    }
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setCurrentBrand: (state, action: PayloadAction<BrandReturnedPayload>) => {
      state.singleBrand = action.payload;
    },
    clearBrandErrors: (state) => {
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.loadingBrands = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loadingBrands = false;
        state.brands = action.payload.brands;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loadingBrands = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(getSearchedBrands.fulfilled, (state, action) => {
      state.loadingBrands = false;
      state.brands = action.payload.brands;
      state.total = action.payload.total;
      state.error = null;
    });
    builder
      .addCase(toggleBrandActivation.pending, (state) => {
        state.loadingBrandActivation = true;
      })
      .addCase(toggleBrandActivation.fulfilled, (state, action) => {
        state.loadingBrandActivation = false;
        const { brandId, isActivated } = action.payload;
        state.brands = state.brands.filter((brand) => brand._id !== brandId);
        if (isActivated) {
          toast.success("Brand activated successfully", {
            position: "top-center",
            hideProgressBar: true,
          });
        } else {
          toast.error(`Brand has been deactivated`, {
            position: "top-center",
            hideProgressBar: true,
          });
        }

        state.error = null;
      })
      .addCase(toggleBrandActivation.rejected, (state, action) => {
        state.loadingBrandActivation = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(createNewBrand.pending, (state) => {
        state.loadingBrandAction = true;
      })
      .addCase(createNewBrand.fulfilled, (state, action) => {
        state.loadingBrandAction = false;
        state.brands = [action.payload, ...state.brands];

        toast.success(`${action.payload.name} added to Brands`, {
          position: "top-center",
          hideProgressBar: true,
        });
        state.error = null;
      })
      .addCase(createNewBrand.rejected, (state, action) => {
        state.loadingBrandAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateBrand.pending, (state) => {
        state.loadingBrandAction = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loadingBrandAction = false;
        state.brands = state.brands.map((brand) =>
          brand._id === action.payload._id ? { ...action.payload } : brand
        );

        toast.success(`${action.payload.name} has been updated`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loadingBrandAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(deleteBrand.pending, (state) => {
        state.loadingBrandAction = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loadingBrandAction = false;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload
        );
        state.error = null;

        toast.success(`Brand deleted successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loadingBrandAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentBrand, clearBrandErrors } = brandsSlice.actions;
export default brandsSlice.reducer;
