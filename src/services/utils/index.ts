import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  initStateTypes,
  ReceivedEmailTypes,
  SentEmailTypes,
} from "./UtilsTypes";
import axios from "../axios";

const initialState: initStateTypes = {
  loadingEmails: false,
  loadingSentEmails: false,
  loadingEmailAction: false,
  sentEmails: [],
  receivedEmails: [],
  filteredSentEmails: [],
  filteredReceivedEmails: [],
  singleEmail: null,
  currentPage: 0,
  error: null,
};

export const getAllSentEmails = createAsyncThunk(
  "utils/sent-emails",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/messages");
      const result = data as SentEmailTypes;

      return result.data.reverse();
    } catch (error) {
      thunkAPI.rejectWithValue("");
    }
  }
);

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default utilsSlice.reducer;
