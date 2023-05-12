import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  initStateTypes,
  ReceivedEmailTypes,
  SentEmailTypes,
  SendEmailToCustomerType,
  ReceivedEmailReturnedPayload,
  SentEmailReturnedPayload,
} from "./MessageTypes";
import axios from "../axios";

const initialState: initStateTypes = {
  loading: false,
  loadingMessageAction: false,
  sentMessages: [],
  receivedMessages: [],
  singleEmail: null,
  emailSuccess: "",
  error: null,
};

export const getAllSentEmails = createAsyncThunk(
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

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setCurrentEmail: (
      state,
      action: PayloadAction<
        ReceivedEmailReturnedPayload | SentEmailReturnedPayload
      >
    ) => {
      state.singleEmail = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setCurrentEmail } = messagesSlice.actions;
export default messagesSlice.reducer;
