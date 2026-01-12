import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const createLead = createAsyncThunk(
  "lead/create",
  async (leadData, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: "/user/lead/create",
        method: "POST",
        body: leadData,
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return res?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const leadSlice = createSlice({
  name: "lead",
  initialState: {
    loading: false,
    success: false,
    lead: null,
    error: null,
  },
  reducers: {
    clearLeadState(state) {
      state.loading = false;
      state.success = false;
      state.lead = null;
      state.error = null;
    },
    clearLeadError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.lead = action.payload;
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLeadState, clearLeadError } = leadSlice.actions;
export default leadSlice.reducer;
