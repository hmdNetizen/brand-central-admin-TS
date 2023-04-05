import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  loading: boolean;
  accessToken: null | string;
  adminEmail: string;
  error: null | string;
  adminLoginSuccess: string;
  passwordChangeSuccess: string;
};

const initialState: initStateType = {
  loading: false,
  error: null,
  accessToken: null,
  adminEmail: "",
  adminLoginSuccess: "",
  passwordChangeSuccess: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
