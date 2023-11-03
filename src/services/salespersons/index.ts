import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "src/config/config";
import axios from "../axios";
import {
  InitStateType,
  SalespersonReturnedPayload,
  SalespersonsPayloadTypes,
  SingleSalespersonPayloadTypes,
} from "./SalesPersonTypes";

const initialState: InitStateType = {
  loadingSalespersons: false,
  loadingSingleSalesperson: false,
  salespersons: [],
  singleSalesperson: null,
  error: null,
};

export const getAllSalespersons = createAsyncThunk(
  "get-all-salespersons",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(config.salespersons.get);
      const result = data as SalespersonsPayloadTypes;

      return result.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

export const getSalespersonProfile = createAsyncThunk(
  "get-salesperson-profile",
  async (salespersonId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(
        config.salespersons.getById(salespersonId)
      );
      const result = data as SingleSalespersonPayloadTypes;

      return result.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

const salespersonsSlice = createSlice({
  name: "salesperson",
  initialState,
  reducers: {
    setCurrentSalesperson: (
      state,
      action: PayloadAction<SalespersonReturnedPayload | null>
    ) => {
      state.singleSalesperson = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalespersons.pending, (state) => {
        state.loadingSalespersons = true;
      })
      .addCase(getAllSalespersons.fulfilled, (state, action) => {
        state.loadingSalespersons = false;
        state.salespersons = action.payload;
        state.error = null;
      })
      .addCase(getAllSalespersons.rejected, (state, action) => {
        state.loadingSalespersons = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSalespersonProfile.pending, (state) => {
        state.loadingSingleSalesperson = true;
      })
      .addCase(getSalespersonProfile.fulfilled, (state, action) => {
        state.loadingSingleSalesperson = false;
        state.singleSalesperson = action.payload;
        state.error = null;
      })
      .addCase(getSalespersonProfile.rejected, (state, action) => {
        state.loadingSingleSalesperson = false;

        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentSalesperson } = salespersonsSlice.actions;
export default salespersonsSlice.reducer;
