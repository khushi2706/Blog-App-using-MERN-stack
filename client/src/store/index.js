import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

const themeSlice = createSlice({
  name : 'theme',
  initialState : {
    isDarkmode : false,
  },
  reducers : {
    setDarkmode : (state, action) => {
      state.isDarkmode = action.payload
    }
  }

})

export const authActions = authSlice.actions;
export const setDarkmode = themeSlice.actions.setDarkmode;

const rootReducer = combineReducers({
  auth : authSlice.reducer,
  theme : themeSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer,
});