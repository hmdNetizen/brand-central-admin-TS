import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/services/axios";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import React from "react";
import jwt_decode from "jwt-decode";
import { CredentialProps } from "src/pages/auth/Login";

type AuthCredentials = {
  Email: string;
  password: string;
};

type AuthReturnedData = {
  data: {
    Email: string;
    token: string;
  };
};

type AuthError = {
  message: string;
};

type LoginPayload = {
  navigate: NavigateFunction;
  path: string;
  setCredentials: React.Dispatch<React.SetStateAction<CredentialProps>>;
  Email: string;
  password: string;
};

type initStateType = {
  loading: boolean;
  accessToken: null | string;
  adminEmail: string;
  error: null | string;
  loginSuccess: string;
  passwordChangeSuccess: string;
};

const initialState: initStateType = {
  loading: false,
  error: null,
  accessToken: localStorage.getItem("accessToken") || null,
  adminEmail: "",
  loginSuccess: "",
  passwordChangeSuccess: "",
};

export const login = createAsyncThunk(
  "auth/login-aadmin",
  async (userData: LoginPayload, thunkAPI) => {
    const { navigate, path, setCredentials, Email, password } = userData;
    try {
      const { data, status } = await axios.post(`/api/auth/login/admin`, {
        Email,
        password,
      });
      const result = data as AuthReturnedData;

      if (status === 200) {
        localStorage.setItem("accessToken", result.data.token);

        setTimeout(() => {
          navigate(path, { replace: true });
          // thunkAPI.dispatch(clearSuccessMessage());
        }, 2000);

        const token = result.data.token;

        const decoded: {
          exp: number;
          iat: number;
          id: string;
        } = jwt_decode(token);

        // logs out after token expires
        setTimeout(() => {
          //   thunkAPI.dispatch(logoutAdmin());
          navigate("/login");
        }, decoded.exp);
      }

      return result.data;
    } catch (error: AxiosError<AuthError> | any) {
      setCredentials((prev) => ({ ...prev, password: "" }));
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.token;
        state.adminEmail = action.payload.Email;
        state.loginSuccess = "You're successfully logged in";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default authSlice.reducer;
