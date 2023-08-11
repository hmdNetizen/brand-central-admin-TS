import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initAdminStateTypes, UserProfilePayloadType } from "./UserTypes";
import axios from "../axios";
import jwt_decode from "jwt-decode";
import { NavigateFunction } from "react-router-dom";
import { logout } from "../auth";
import { AxiosError } from "axios";

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

export const loadAdminProfile = createAsyncThunk(
  "admin-profile",
  async (navigate: NavigateFunction, thunkAPI) => {
    try {
      const { data, status } = await axios.get(`/api/users/profile`);

      const token = localStorage.accessToken;
      const decoded: {
        exp: number;
        iat: number;
        id: string;
      } = jwt_decode(token);

      // logs out after token expires
      if (decoded.exp > Date.now() || status === 401) {
        thunkAPI.dispatch(clearAdminProfile());
        thunkAPI.dispatch(logout());
        navigate("/login");
      }

      const result = data as UserProfilePayloadType;

      return result.data;
    } catch (error: AxiosError | any) {
      thunkAPI.dispatch(clearAdminProfile());
      thunkAPI.dispatch(logout());
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching admin profile"
        );
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearAdminProfile: (state) => {
      state.admin = null;
      state.uploadedProfilePhoto = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadAdminProfile.pending, (state) => {
        state.loadingProfile = true;
      })
      .addCase(loadAdminProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.admin = action.payload;
        state.error = null;
      })
      .addCase(loadAdminProfile.rejected, (state, action) => {
        state.loadingProfile = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

const { clearAdminProfile } = userSlice.actions;
export default userSlice.reducer;
