import { createSlice } from "@reduxjs/toolkit";

const AppConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    language: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = AppConfigSlice.actions;
export default AppConfigSlice.reducer;
