import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  uploadingFile: false,
  uploadPercentage: 0,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default commonSlice.reducer;
