import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  initStateTypes,
  GeneralSettingTypes,
  SocialLinksPropTypes,
} from "./SettingsTypes";
import { UploadedFilePayload } from "../common/commonTypes";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const initialState: initStateTypes = {
  loading: false,
  loadingSettingsAction: false,
  siteData: null,
  error: null,
};

export const getAllSiteData = createAsyncThunk(
  "get-all-site-data",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/site`);
      const result = data as { data: GeneralSettingTypes };

      return result.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching data");
      }
    }
  }
);

export const updateHeaderLogo = createAsyncThunk(
  "update-header-logo",
  async (details: { file: File | string }, thunkAPI) => {
    const { file } = details;

    const formData = new FormData();
    formData.append("document", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (typeof file === "object") {
        const { data: dataURL } = await axios.post(
          `/api/uploads/file`,
          formData,
          config
        );

        const response = dataURL as UploadedFilePayload;

        const { data } = await axios.patch(`/api/site/logo`, {
          headerLogo: response.url,
        });
        const result = data as { data: GeneralSettingTypes };
        return result.data;
      } else {
        const { data } = await axios.patch(`/api/site/logo`, {
          headerLogo: file,
        });
        const result = data as { data: GeneralSettingTypes };
        return result.data;
      }
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

export const updateInvoiceLogo = createAsyncThunk(
  "update-invoice-logo",
  async (details: { file: File | string }, thunkAPI) => {
    const { file } = details;

    const formData = new FormData();
    formData.append("document", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (typeof file === "object") {
        const { data: dataURL } = await axios.post(
          `/api/uploads/file`,
          formData,
          config
        );

        const response = dataURL as UploadedFilePayload;

        const { data } = await axios.patch(`/api/site/logo`, {
          invoiceLogo: response.url,
        });
        const result = data as { data: GeneralSettingTypes };
        return result.data;
      } else {
        const { data } = await axios.patch(`/api/site/logo`, {
          invoiceLogo: file,
        });
        const result = data as { data: GeneralSettingTypes };
        return result.data;
      }
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

export const updateFavicon = createAsyncThunk(
  "update-favicon",
  async (details: { file: File | string }, thunkAPI) => {
    const { file } = details;

    const formData = new FormData();
    formData.append("document", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (typeof file === "object") {
        const { data: dataURL } = await axios.post(
          `/api/uploads/file`,
          formData,
          config
        );
        const response = dataURL as UploadedFilePayload;

        const { data } = await axios.patch(`/api/site/favicon`, {
          favicon: response.url,
        });
        const result = data as { data: GeneralSettingTypes };
        return result.data;
      } else {
        const { data } = await axios.patch(`/api/site/favicon`, {
          favicon: file,
        });
        const result = data as { data: GeneralSettingTypes };
        return result.data;
      }
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

export const updateSocialLinks = createAsyncThunk(
  "update-social-links",
  async (details: SocialLinksPropTypes, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/api/site/social-links`, details);
      const result = data as { data: GeneralSettingTypes };

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

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllSiteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSiteData.fulfilled, (state, action) => {
        state.loading = false;
        state.siteData = action.payload;
        state.error = null;
      })
      .addCase(getAllSiteData.rejected, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateHeaderLogo.pending, (state) => {
        state.loadingSettingsAction = true;
      })
      .addCase(updateHeaderLogo.fulfilled, (state, action) => {
        state.loadingSettingsAction = false;
        state.siteData = { ...state.siteData, ...action.payload };
        state.error = null;

        toast.success(`Header Logo updated successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateHeaderLogo.rejected, (state, action) => {
        state.loadingSettingsAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateInvoiceLogo.pending, (state) => {
        state.loadingSettingsAction = true;
      })
      .addCase(updateInvoiceLogo.fulfilled, (state, action) => {
        state.loadingSettingsAction = false;
        state.siteData = { ...state.siteData, ...action.payload };
        state.error = null;

        toast.success(`Invoice Logo updated successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateInvoiceLogo.rejected, (state, action) => {
        state.loadingSettingsAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateFavicon.pending, (state) => {
        state.loadingSettingsAction = true;
      })
      .addCase(updateFavicon.fulfilled, (state, action) => {
        state.loadingSettingsAction = false;
        state.siteData = { ...state.siteData, ...action.payload };
        state.error = null;

        toast.success(`Favicon updated successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateFavicon.rejected, (state, action) => {
        state.loadingSettingsAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateSocialLinks.pending, (state) => {
        state.loadingSettingsAction = true;
      })
      .addCase(updateSocialLinks.fulfilled, (state, action) => {
        state.loadingSettingsAction = false;
        state.siteData = { ...state.siteData, ...action.payload };
        state.error = null;

        toast.success(`Social Links updated successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateSocialLinks.rejected, (state, action) => {
        state.loadingSettingsAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default settingsSlice.reducer;
