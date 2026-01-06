import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getAllBlockedDates = createAsyncThunk(
  "blockedDates/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/admin/blocked-dates/getAll",
        method: "GET",
      });

      return response?.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch blocked dates"
      );
    }
  }
);

export const getBlockedDatesCalendar = createAsyncThunk(
  "blockedDates/calendar",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/blocked-dates/calendar",
        method: "GET",
      });

      return response?.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch calendar blocked dates"
      );
    }
  }
);

const initialState = {
  blockedDates: [],
  calendarBlockedDates: [],
  loadingAll: false,
  loadingCalendar: false,
  error: null,
  message: null,
};

const blockedDatesSlice = createSlice({
  name: "blockedDates",
  initialState,
  reducers: {
    clearBlockedDatesMessage(state) {
      state.message = null;
    },
    clearBlockedDatesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlockedDates.pending, (state) => {
        state.loadingAll = true;
        state.error = null;
      })
      .addCase(getAllBlockedDates.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.blockedDates = action.payload;
      })
      .addCase(getAllBlockedDates.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action.payload;
      })

      .addCase(getBlockedDatesCalendar.pending, (state) => {
        state.loadingCalendar = true;
        state.error = null;
      })
      .addCase(getBlockedDatesCalendar.fulfilled, (state, action) => {
        state.loadingCalendar = false;
        state.calendarBlockedDates = action.payload.map((item) => ({
          ...item,
          startDate: new Date(item.startDate || item.date),
          endDate: new Date(item.endDate || item.date),
        }));
      })
      .addCase(getBlockedDatesCalendar.rejected, (state, action) => {
        state.loadingCalendar = false;
        state.error = action.payload;
      });
  },
});

export const { clearBlockedDatesMessage, clearBlockedDatesError } =
  blockedDatesSlice.actions;

export default blockedDatesSlice.reducer;
