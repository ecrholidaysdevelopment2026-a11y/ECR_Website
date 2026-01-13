import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getUserEvents = createAsyncThunk(
  "userEvent/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: "/user/event/get",
        method: "GET",
      });
      return res?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch events");
    }
  }
);

export const getUserEventById = createAsyncThunk(
  "userEvent/getById",
  async (id, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: `/user/event/getById/${id}`,
        method: "GET",
      });
      return res?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch event");
    }
  }
);

export const getUserEventsByCategory = createAsyncThunk(
  "userEvent/byCategory",
  async (categoryId, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: `/user/event/byCategory/${categoryId}`,
        method: "GET",
      });
      return res?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch category events"
      );
    }
  }
);

const userEventSlice = createSlice({
  name: "userEvent",
  initialState: {
    events: [],
    categoryEvents: [],
    selectedEvent: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserEventError(state) {
      state.error = null;
    },
    clearSelectedUserEvent(state) {
      state.selectedEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(getUserEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserEventsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserEventsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryEvents = action.payload;
      })
      .addCase(getUserEventsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserEventError, clearSelectedUserEvent } =
  userEventSlice.actions;

export default userEventSlice.reducer;
