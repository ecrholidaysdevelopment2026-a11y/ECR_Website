import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getUserFavourites = createAsyncThunk(
  "userFavourite/getAll",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const res = await FetchApi({
        endpoint: "/user/favourites",
        method: "GET",
        token,
      });
      return res?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch favourites"
      );
    }
  }
);

export const addToFavourites = createAsyncThunk(
  "userFavourite/add",
  async (villaId, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const res = await FetchApi({
        endpoint: `/user/favourites/${villaId}`,
        method: "POST",
        token,
      });
      return res?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to add favourite");
    }
  }
);

export const removeFromFavourites = createAsyncThunk(
  "userFavourite/remove",
  async (villaId, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const res = await FetchApi({
        endpoint: `/user/favourites/${villaId}`,
        method: "DELETE",
        token,
      });
      return { villaId, data: res?.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to remove favourite"
      );
    }
  }
);

const userFavouriteSlice = createSlice({
  name: "userFavourite",
  initialState: {
    favourites: [],
    loading: false,
    favSuccess: null,
    favError: null,
  },
  reducers: {
    clearFavSuccess(state) {
      state.favSuccess = null;
    },
    clearFavError(state) {
      state.favError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(getUserFavourites.rejected, (state, action) => {
        state.loading = false;
        state.favError = action.payload;
      })

      .addCase(addToFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites.push(action.payload);
        state.favSuccess = "Added to favourites";
      })
      .addCase(addToFavourites.rejected, (state, action) => {
        state.loading = false;
        state.favError = action.payload;
      })

      .addCase(removeFromFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = state.favourites.filter(
          (fav) => fav?.villaId?._id !== action.payload.villaId
        );
        state.favSuccess =
          action.payload?.data?.message || "Removed from favourites";
      })
      .addCase(removeFromFavourites.rejected, (state, action) => {
        state.loading = false;
        state.favError = action.payload;
      });
  },
});

export const { clearFavSuccess, clearFavError } = userFavouriteSlice.actions;

export default userFavouriteSlice.reducer;
