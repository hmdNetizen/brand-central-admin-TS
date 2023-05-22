import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";
import { initStateTypes, GeneralSettingTypes } from "./SettingsTypes";

const initialState: initStateTypes = {
  loading: false,
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
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
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
  },
});

export default settingsSlice.reducer;
