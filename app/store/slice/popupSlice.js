import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePopup: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      state.activePopup = action.payload;
    },
    closePopup: (state) => {
      state.activePopup = null;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
