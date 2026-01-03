import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const fetchVillaLocations = createAsyncThunk(
  "locations/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/villas/locations",
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(
          response?.data?.errors || "Failed to fetch locations"
        );
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch locations"
      );
    }
  }
);

const locationSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearLocationError(state) {
      state.error = null;
    },
    clearLocationMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVillaLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVillaLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload?.locations || action.payload || [];
      })
      .addCase(fetchVillaLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLocationError, clearLocationMessage } =
  locationSlice.actions;

export default locationSlice.reducer;
