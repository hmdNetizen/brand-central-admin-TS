import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initAdminStateTypes } from "./UserTypes";

const initialState: initAdminStateTypes = {
  loadingProfile: false,
  admin: null,
  uploadingFile: false,
  uploadPercentage: 0,
  uploadedProfilePhoto: null,
  updateSuccess: "",
  updatingAdmin: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
