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
    const { setBrandData, setOpen, file, ...fields } = details;
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

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setCurrentBrand: (state, action: PayloadAction<BrandReturnedPayload>) => {
      state.singleBrand = action.payload;
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
  },
});

export const { setCurrentBrand } = brandsSlice.actions;
export default brandsSlice.reducer;
