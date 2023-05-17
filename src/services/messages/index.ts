import React from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../axios";
import { v4 as uuidv4 } from "uuid";
import {
  initStateTypes,
  ReceivedEmailTypes,
  SentEmailTypes,
  SendEmailToCustomerType,
  MessagesPayloadResponse,
} from "./MessageTypes";
import { constructContent } from "src/lib/helpers";

const initialState: initStateTypes = {
  loading: false,
  loadingMessageAction: false,
  loadingSendMessage: false,
  sentMessages: [],
  receivedMessages: [],
  singleMessage: null,
  total: 0,
  emailSuccess: "",
  error: null,
};

export const getAllSentMessages = createAsyncThunk(
  "messages/sent",
  async (details: { page: number; limit: number }, thunkAPI) => {
    const { page, limit } = details;
    try {
      const { data } = await axios.get(
        `/api/messages/v1?page=${page}&limit=${limit}`
      );
      console.log(
        "Get Endpoint",
        `/api/messages/v1?page=${page}&limit=${limit}`
      );
      const result = data as SentEmailTypes;
      const transformResult = result.data.data.map((message) => ({
        _id: message._id,
        emails: message.to,
        subject: message.subject,
        body: message.content,
        createdAt: message.createdAt,
        isRead: false,
      }));

      return {
        sentMessages: transformResult,
        total: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching messages");
    }
  }
);

export const getSearchedSentMessages = createAsyncThunk(
  "searched/sent",
  async (
    details: { page: number; limit: number; searchTerm: string },
    thunkAPI
  ) => {
    const { page, limit, searchTerm } = details;
    try {
      const { data } = await axios.get(
        `/api/messages/v1?page=${page}&limit=${limit}&searchTerm=${searchTerm}`
      );

      console.log(
        "Search endpoint",
        `/api/messages/v1?page=${page}&limit=${limit}${searchTerm}`
      );

      const result = data as SentEmailTypes;
      const transformResult = result.data.data.map((message) => ({
        _id: message._id,
        emails: message.to,
        subject: message.subject,
        body: message.content,
        createdAt: message.createdAt,
        isRead: false,
      }));

      return {
        sentMessages: transformResult,
        total: result.data.total,
      };
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

export const deleteSentMessage = createAsyncThunk(
  "delete-sent-message",
  async (
    details: {
      messageId: string;
      setOpenDeleteMessage: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { messageId, setOpenDeleteMessage } = details;
    try {
      const { status } = await axios.delete(`/api/messages/${messageId}`);

      if (status === 200) {
        setOpenDeleteMessage(false);
      }

      return messageId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const deleteReceivedMessage = createAsyncThunk(
  "delete-received-message",
  async (
    details: {
      messageId: string;
      setOpenDeleteMessage: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { messageId, setOpenDeleteMessage } = details;
    try {
      const { status } = await axios.delete(`/api/contact/${messageId}`);

      if (status === 200) {
        setOpenDeleteMessage(false);
      }

      return messageId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
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

      return {
        _id: uuidv4(),
        emails: fields.to,
        subject: fields.subject,
        body: decodeURIComponent(constructContent(fields.content)),
        createdAt: new Date().toISOString(),
        isRead: false,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Email could not be sent");
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setCurrentMessage: (
      state,
      action: PayloadAction<MessagesPayloadResponse>
    ) => {
      state.singleMessage = action.payload;
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
        state.sentMessages = action.payload.sentMessages;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(getAllSentMessages.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(getSearchedSentMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.sentMessages = action.payload.sentMessages;
      state.total = action.payload.total;
      state.error = null;
    });
    builder
      .addCase(deleteSentMessage.pending, (state) => {
        state.loadingMessageAction = true;
      })
      .addCase(deleteSentMessage.fulfilled, (state, action) => {
        state.loadingMessageAction = false;
        state.sentMessages = state.sentMessages.filter(
          (email) => email._id !== action.payload
        );
        state.total = state.total - 1;
        state.error = null;

        toast.success("Message deleted successfully", {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(deleteSentMessage.rejected, (state, action) => {
        state.loadingMessageAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(deleteReceivedMessage.pending, (state) => {
        state.loadingMessageAction = true;
      })
      .addCase(deleteReceivedMessage.fulfilled, (state, action) => {
        state.loadingMessageAction = false;
        state.receivedMessages = state.receivedMessages.filter(
          (email) => email._id !== action.payload
        );
        state.total = state.total - 1;
        state.error = null;

        toast.success("Email deleted successfully", {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(deleteReceivedMessage.rejected, (state, action) => {
        state.loadingMessageAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(sendEmailToCustomer.pending, (state) => {
        state.loadingSendMessage = true;
      })
      .addCase(sendEmailToCustomer.fulfilled, (state, action) => {
        state.loadingSendMessage = false;
        state.emailSuccess = "Email Sent";
        state.sentMessages = [action.payload, ...state.sentMessages];
        state.error = null;

        toast.success("Email Sent Successfully", {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(sendEmailToCustomer.rejected, (state, action) => {
        state.loadingSendMessage = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
