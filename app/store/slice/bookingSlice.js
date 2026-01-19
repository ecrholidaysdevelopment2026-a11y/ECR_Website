import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const createBooking = createAsyncThunk(
  "bookings/create",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const res = await FetchApi({
        endpoint: "/user/bookings/create",
        method: "POST",
        body: payload,
        token,
      });
      if (res?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }
      return res.data;
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

export const verifyPayment = createAsyncThunk(
  "booking/verifyPayment",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/user/bookings/verify-payment`,
        method: "POST",
        body: payload,
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to update booking payment"
      );
    }
  }
);

export const userBooking = createAsyncThunk(
  "booking/userBooking",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/user/bookings/${id}`,
        method: "GET",
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to update booking payment"
      );
    }
  }
);

export const PaymentConfirm = createAsyncThunk(
  "booking/PaymentConfirm",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/user/bookings/confirm`,
        method: "POST",
        body: payload,
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to update booking payment"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    message: null,
    error: null,
    bookingDetails: {},
    loading: false,
    bookingerror: null,
    bookingMsg: null,
    PaymentConfirmmessage: null,
    PaymentConfirmerror: null,
    bookingData: null,
    PaymentConfirData: null,
  },
  reducers: {
    clearBookingError(state) {
      state.bookingerror = null;
      state.bookingMsg = null;
      state.error = null;
      state.message = null;
      state.PaymentConfirmerror = null;
      state.PaymentConfirmmessage = null;
      state.verifyMessage = null;
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
        state.bookingMsg = action.payload?.message;
        state.bookingData = action.payload?.booking;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.bookingerror = action.payload;
      })

      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.list = state.list.map((booking) =>
          booking._id === action.payload.bookingId
            ? { ...booking, bookingStatus: "CANCELLED" }
            : booking
        );
      })

      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyMessage =
          action.payload?.message || "Booking payment updated successfully";
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(userBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload?.booking;
      })
      .addCase(userBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(PaymentConfirm.pending, (state) => {
        state.loading = true;
      })
      .addCase(PaymentConfirm.fulfilled, (state, action) => {
        state.loading = false;
        state.PaymentConfirmmessage =
          action.payload?.message || "Booking payment updated successfully";
        state.PaymentConfirData = action.payload;
      })
      .addCase(PaymentConfirm.rejected, (state, action) => {
        state.loading = false;
        state.PaymentConfirmerror = action.payload;
      });
  },
});

export const { clearBookingError } = bookingSlice.actions;
export default bookingSlice.reducer;
