import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getAllVillas = createAsyncThunk(
  "villas/getAllVillas",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/villas`,
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

export const fetchVillas = createAsyncThunk(
  "villas/fetchVillas",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/villas/locations-with-villas",
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

export const fetchDestinationVillas = createAsyncThunk(
  "villas/fetchVillasByChennai",
  async (locationId, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/villas/by-location?location=${locationId}`,
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

export const fetchVillasByOffer = createAsyncThunk(
  "villas/byOffer",
  async (percentage, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/villas/by-offer?percentage=${percentage}`,
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(
          response?.data?.errors || "Failed to fetch villas by offer"
        );
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch villas by offer"
      );
    }
  }
);

export const filterUserVillas = createAsyncThunk(
  "villas/filter",
  async (filters, thunkAPI) => {
    try {
      const params = {};
      if (filters?.locationId) params.locationId = filters.locationId;
      if (filters?.amenities?.length)
        params.amenities = filters.amenities.join(",");
      if (filters?.services?.length)
        params.services = filters.services.join(",");
      if (filters?.minPrice) params.minPrice = filters.minPrice;
      if (filters?.bedrooms) params.bedrooms = filters.bedrooms;
      if (filters?.maxGuests) params.maxGuests = filters.maxGuests;
      if (filters?.isFeatured !== null && filters?.isFeatured !== undefined)
        params.isFeatured = filters.isFeatured;

      const queryString = Object.keys(params).length
        ? "?" + new URLSearchParams(params).toString()
        : "";

      const response = await FetchApi({
        endpoint: `/user/villas/filter${queryString}`,
        method: "GET",
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(
          response?.data?.errors || "Villa filter failed"
        );
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to filter villas");
    }
  }
);

const villaSlice = createSlice({
  name: "villas",
  initialState: {
    getAllVillas: [],
    villas: [],
    destinationByvillas: [],
    searchResults: [],
    featured: [],
    popular: [],
    selectedVilla: {},
    offerVillas: [],
    weeklyPrice: null,
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
      .addCase(getAllVillas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVillas.fulfilled, (state, action) => {
        state.loading = false;
        state.villas = action.payload || [];
      })
      .addCase(getAllVillas.rejected, (state, action) => {
        state.loading = false;
        state.searchError = action.payload || "Search failed";
      })

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

      .addCase(fetchVillas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVillas.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllVillas = action.payload?.locations || [];
      })
      .addCase(fetchVillas.rejected, (state, action) => {
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

      .addCase(fetchDestinationVillas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDestinationVillas.fulfilled, (state, action) => {
        state.loading = false;
        state.destinationByvillas = action.payload?.villas || action.payload;
      })
      .addCase(fetchDestinationVillas.rejected, (state, action) => {
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
      })
      .addCase(fetchVillasByOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVillasByOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offerVillas = action.payload?.villas || action.payload || [];
      })
      .addCase(fetchVillasByOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(filterUserVillas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterUserVillas.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload?.villas || action.payload || [];
      })
      .addCase(filterUserVillas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVillaError, clearVillaMessage, clearWeeklyPrice } =
  villaSlice.actions;

export default villaSlice.reducer;
