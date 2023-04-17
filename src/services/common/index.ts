import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { AxiosRequestConfig, AxiosProgressEvent } from "axios";
import { initStateType, UploadedFilePayload } from "./commonTypes";

const initialState: initStateType = {
  uploadingFile: false,
  uploadedFile: null,
  uploadPercentage: 0,
  error: null,
};

export const uploadFile = createAsyncThunk(
  "uploadPhoto",
  async (data: { file: File }, thunkAPI) => {
    const { file } = data;

    const formData = new FormData();
    formData.append("document", file);

    const config: AxiosRequestConfig<FormData> = {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          thunkAPI.dispatch(
            setUploadPercentage(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      },
    };
    try {
      const { data } = await axios.post(`/api/uploads/file`, formData, config);
      const result = data as UploadedFilePayload;

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUploadPercentage: (state, action: PayloadAction<number>) => {
      state.uploadPercentage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.uploadingFile = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploadingFile = false;
        state.uploadedFile = action.payload;
        state.error = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploadingFile = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setUploadPercentage } = commonSlice.actions;
export default commonSlice.reducer;
