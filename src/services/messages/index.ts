import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  initStateTypes,
  ReceivedEmailTypes,
  SentEmailTypes,
  SendEmailToCustomerType,
  MessagesPayloadResponse,
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

export const getAllSentMessages = createAsyncThunk(
  "messages/sent",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/messages");
      const result = data as SentEmailTypes;
      const transformResult = result.data.data.map((message) => ({
        _id: message._id,
        emails: message.to,
        subject: message.subject,
        body: message.content,
        createdAt: message.createdAt,
        isRead: false,
      }));

      return transformResult;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching messages");
    }
  }
);

export const getAllReceivedMessages = createAsyncThunk(
  "messages/received",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/contact");
      const result = data as ReceivedEmailTypes;

      const transformResult = result.data.data.map((message) => ({
        _id: message._id,
        emails: message.emailAddress,
        subject: message.messageSubject,
        body: message.messageBody,
        createdAt: message.createdAt,
        fullName: message?.fullName,
        isRead: false,
      }));

      return transformResult;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching messages");
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
      action: PayloadAction<MessagesPayloadResponse>
    ) => {
      state.singleEmail = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllReceivedMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReceivedMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedMessages = action.payload;
        state.error = null;
      })
      .addCase(getAllReceivedMessages.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getAllSentMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSentMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.sentMessages = action.payload;
        state.error = null;
      })
      .addCase(getAllSentMessages.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentEmail } = messagesSlice.actions;
export default messagesSlice.reducer;
