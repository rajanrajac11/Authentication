import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  userData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.loading = true;
    },

    loginFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    loginSuccess: (state, action) => {
      (state.loading = false), (state.userData = action.payload);
    },
  },
});

export const { loginFailure, loginStart, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
