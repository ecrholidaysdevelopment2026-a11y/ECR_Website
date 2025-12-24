import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const searchVillas = createAsyncThunk(
  "villas/search",
  async (params, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/villas/search",
        method: "GET",
        params,
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.errors);
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to search villas");
    }
  }
);

export const fetchFeaturedVillas = createAsyncThunk(
  "villas/featured",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/villas/featured",
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.errors);
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch featured villas"
      );
    }
  }
);

export const fetchPopularVillas = createAsyncThunk(
  "villas/popular",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/villas/popular",
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.errors);
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch popular villas"
      );
    }
  }
);

export const fetchWeeklyPrice = createAsyncThunk(
  "villas/weeklyPrice",
  async (villaId, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/villas/weekly-price/${villaId}`,
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.errors);
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch weekly price"
      );
    }
  }
);

export const fetchVillasByChennai = createAsyncThunk(
  "villas/fetchVillasByChennai",
  async (thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/villas/by-location/chennai`,
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.errors);
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch villas by location"
      );
    }
  }
);

export const fetchVillasByPuducherry = createAsyncThunk(
  "villas/fetchByLocation",
  async (thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/villas/by-location/puducherry`,
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.errors);
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch villas by location"
      );
    }
  }
);

const villaSlice = createSlice({
  name: "villas",
  initialState: {
    searchResults: [],
    featured: [],
    popular: [],
    weeklyPrice: null,
    villasByChennai: [],
    villasByPuducherry: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearVillaError(state) {
      state.error = null;
    },
    clearVillaMessage(state) {
      state.message = null;
    },
    clearWeeklyPrice(state) {
      state.weeklyPrice = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(searchVillas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchVillas.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload?.villas || [];
      })
      .addCase(searchVillas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Search failed";
      })

      .addCase(fetchFeaturedVillas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedVillas.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload || [];
      })
      .addCase(fetchFeaturedVillas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPopularVillas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularVillas.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload?.villas || [];
      })
      .addCase(fetchPopularVillas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchWeeklyPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeeklyPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyPrice = action.payload?.prices || action.payload;
      })
      .addCase(fetchWeeklyPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchVillasByChennai.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVillasByChennai.fulfilled, (state, action) => {
        state.loading = false;
        state.villasByChennai = action.payload?.villas || action.payload;
      })
      .addCase(fetchVillasByChennai.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchVillasByPuducherry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVillasByPuducherry.fulfilled, (state, action) => {
        state.loading = false;
        state.villasByPuducherry = action.payload?.villas || action.payload;
      })
      .addCase(fetchVillasByPuducherry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVillaError, clearVillaMessage, clearWeeklyPrice } =
  villaSlice.actions;

export default villaSlice.reducer;
