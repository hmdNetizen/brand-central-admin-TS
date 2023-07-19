import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitStateType, SalesPersonReturnedPayload } from "./SalesPersonTypes";

const initialState: InitStateType = {
  loadingSalespersons: false,
  salespersons: [],
  singleSalesperson: null,
  error: null,
};

const salespersonsSlice = createSlice({
  name: "salesperson",
  initialState,
  reducers: {
    setCurrentSalesperson: (
      state,
      action: PayloadAction<SalesPersonReturnedPayload | null>
    ) => {
      state.singleSalesperson = action.payload;
    },
  },
});

export const { setCurrentSalesperson } = salespersonsSlice.actions;
export default salespersonsSlice.reducer;
