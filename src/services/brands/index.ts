import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loadingBrands: false,
  brands: [],
  error: null,
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default brandsSlice.reducer;
