import { createSlice } from "@reduxjs/toolkit";

const authState = createSlice({
  name: "authState",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authState.actions;
export default authState.reducer;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
