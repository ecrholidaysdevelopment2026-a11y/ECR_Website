import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const createBooking = createAsyncThunk(
  "bookings/create",
  async ({ bookingData }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state?.auth?.accessToken;
    try {
      const res = await FetchApi({
        endpoint: "/user/bookings/create",
        method: "POST",
        data: bookingData,
        token,
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return res?.data?.booking;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  "bookings/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: "/user/bookings",
        method: "GET",
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return res?.data?.bookings || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "bookings/cancel",
  async (bookingId, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const res = await FetchApi({
        endpoint: `/user/bookings/cancel/${bookingId}`,
        method: "PATCH",
        token,
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return { bookingId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBookingError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.list = state.list.map((booking) =>
          booking._id === action.payload.bookingId
            ? { ...booking, bookingStatus: "CANCELLED" }
            : booking
        );
      });
  },
});

export const { clearBookingError } = bookingsSlice.actions;
export default bookingsSlice.reducer;
