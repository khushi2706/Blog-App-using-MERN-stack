// import { configureStore, createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { isLoggedIn: false },
//   reducers: {
//     login(state) {
//       state.isLoggedIn = true;
//     },
//     logout(state) {
//       localStorage.removeItem("userId");
//       state.isLoggedIn = false;
//     },
//   },
// });

// export const authActions = authSlice.actions;

// export const store = configureStore({
//   reducer: authSlice.reducer,
// });

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apislice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authApiSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});
