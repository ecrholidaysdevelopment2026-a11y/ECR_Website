import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const searchVillas = createAsyncThunk(
  "villas/search",
  async (params, thunkAPI) => {
    try {
      const queryString = params
        ? "?" + new URLSearchParams(params).toString()
        : "";
      const response = await FetchApi({
        endpoint: `/user/villas/search${queryString}`,
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.data?.message);
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

export const fetchVillaVideos = createAsyncThunk(
  "villas/fetchVillaVideos",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/villas/villaVideos",
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(
          response?.data?.errors || "Failed to fetch villa videos"
        );
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch villa videos"
      );
    }
  }
);

export const getVillaBySlug = createAsyncThunk(
  "villa/getBySlug",
  async (slug, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/user/villas/${slug}`,
        method: "GET",
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch villa");
    }
  }
);

const villaSlice = createSlice({
  name: "villas",
  initialState: {
    searchResults: [],
    featured: [],
    popular: [],
    selectedVilla: {},
    weeklyPrice: null,
    villasByChennai: [],
    villasByPuducherry: [],
    villaVideos: [],
    loading: false,
    error: null,
    message: null,
    searchMsg: null,
    searchError: null,
  },
  reducers: {
    clearVillaError(state) {
      state.error = null;
      state.searchError = null;
    },
    clearVillaMessage(state) {
      state.searchMsg = null;
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
        state.searchResults = action.payload || [];
      })
      .addCase(searchVillas.rejected, (state, action) => {
        state.loading = false;
        state.searchError = action.payload || "Search failed";
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
      })

      .addCase(fetchVillaVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVillaVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.villaVideos = action.payload || action.payload || [];
      })
      .addCase(fetchVillaVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getVillaBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVillaBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVilla = action.payload;
      })
      .addCase(getVillaBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVillaError, clearVillaMessage, clearWeeklyPrice } =
  villaSlice.actions;

export default villaSlice.reducer;
