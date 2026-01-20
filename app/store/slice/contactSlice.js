import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";
export const createContact = createAsyncThunk(
  "contact/create",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/contact/create",
        method: "POST",
        body: payload,
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to submit contact enquiry",
      );
    }
  },
);


const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearContactMessage(state) {
      state.message = null;
    },
    clearContactError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "Contact enquiry submitted successfully";
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactMessage, clearContactError } = contactSlice.actions;

export default contactSlice.reducer;
