import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";


export const addFavourite = createAsyncThunk(
  "favourites/add",
  async (villaId, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: `/user/favourites/${villaId}`,
        method: "POST",
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }
      return { villaId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const removeFavourite = createAsyncThunk(
  "favourites/remove",
  async (villaId, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: `/user/favourites/${villaId}`,
        method: "DELETE",
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }
      return { villaId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchFavourites = createAsyncThunk(
  "favourites/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: "/user/favourites",
        method: "GET",
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }
      return res?.data?.villas || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFavouriteError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addFavourite.fulfilled, (state, action) => {
        state.list.push(action.payload.villaId);
      })

      .addCase(removeFavourite.fulfilled, (state, action) => {
        state.list = state.list.filter((id) => id !== action.payload.villaId);
      });
  },
});

export const { clearFavouriteError } = favouritesSlice.actions;
export default favouritesSlice.reducer;
