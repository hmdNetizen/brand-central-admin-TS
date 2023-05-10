import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  sentMessages: [],
  receivedMessages: [],
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default messagesSlice.reducer;
