import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = false;
    },
    loginFail: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
    }
  },
});


export const { loginStart, loginSuccess, loginFail, logout } = userSlice.actions;

export default userSlice.reducer;