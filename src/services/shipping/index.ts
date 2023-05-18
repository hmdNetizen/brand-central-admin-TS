import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ZipCodeReturnedPayload } from "./ShoppingTypes";
import { initStateType } from "./ShoppingTypes";

const initialState: initStateType = {
  loading: false,
  zipCodes: [],
  singleZipCode: null,
  error: null,
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setCurrentZipCode: (
      state,
      action: PayloadAction<ZipCodeReturnedPayload>
    ) => {
      state.singleZipCode = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setCurrentZipCode } = shippingSlice.actions;
export default shippingSlice.reducer;
