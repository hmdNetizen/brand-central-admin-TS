import { createSlice } from "@reduxjs/toolkit";
import { InitStateType } from "./SalesPersonTypes";

const initialState: InitStateType = {
  loadingSalespersons: false,
  salespersons: [],
  error: null,
};

const salespersonsSlice = createSlice({
  name: "salesperson",
  initialState,
  reducers: {},
});

export default salespersonsSlice.reducer;
