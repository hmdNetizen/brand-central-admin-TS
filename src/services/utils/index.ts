import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  initStateTypes,
  ReceivedEmailTypes,
  SentEmailTypes,
  SendEmailToCustomerType,
} from "./UtilsTypes";
import axios from "../axios";

const initialState = {
  loading: false,
  error: null,
};

export const getAllSentMessages = createAsyncThunk(
  "utils/sent-emails",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/messages");
      const result = data as SentEmailTypes;

      return result.data.data.reverse();
    } catch (error) {
      thunkAPI.rejectWithValue("");
    }
  }
);

export const sendEmailToCustomer = createAsyncThunk(
  "send-email",
  async (details: SendEmailToCustomerType, thunkAPI) => {
    const { setOpen, ...fields } = details;

    try {
      const { status } = await axios.post(`/api/messages`, fields);

      if (status === 200) setOpen(false);

      return fields;
    } catch (error) {
      return thunkAPI.rejectWithValue("Email could not be sent");
    }
  }
);

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(sendEmailToCustomer.pending, (state) => {
    //     state.loadingEmailAction = true;
    //   })
    //   .addCase(sendEmailToCustomer.fulfilled, (state, action) => {
    //     state.loadingEmailAction = false;
    //     state.emailSuccess = "Email Sent";
    //     state.error = null;
    //   })
    //   .addCase(sendEmailToCustomer.rejected, (state, action) => {
    //     state.loadingEmailAction = false;
    //     state.emailSuccess = "";
    //     if (typeof action.payload === "string" || action.payload === null) {
    //       state.error = action.payload;
    //     }
    //   });
  },
});

export default utilsSlice.reducer;
