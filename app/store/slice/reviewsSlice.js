import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";


export const fetchVillaReviews = createAsyncThunk(
  "reviews/fetch",
  async (villaId, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: `/user/reviews/${villaId}`,
        method: "GET",
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }
      return { villaId, reviews: res?.data?.reviews || [] };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addReview = createAsyncThunk(
  "reviews/add",
  async ({ villaId, payload }, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: `/user/reviews/${villaId}`,
        method: "POST",
        data: payload,
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }
      return res?.data?.review;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ villaId, payload }, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: `/user/reviews/${villaId}`,
        method: "PATCH",
        data: payload,
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }
      return res?.data?.review;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (villaId, thunkAPI) => {
    try {
      await FetchApi({
        endpoint: `/user/reviews/${villaId}`,
        method: "DELETE",
      });
      return villaId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    byVilla: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearReviewError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVillaReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVillaReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.byVilla[action.payload.villaId] =
          action.payload.reviews;
      })
      .addCase(fetchVillaReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addReview.fulfilled, (state, action) => {
        const { villaId } = action.payload;
        state.byVilla[villaId]?.push(action.payload);
      })

      .addCase(updateReview.fulfilled, (state, action) => {
        const { villaId, _id } = action.payload;
        const index = state.byVilla[villaId]?.findIndex(
          (r) => r._id === _id
        );
        if (index !== -1) {
          state.byVilla[villaId][index] = action.payload;
        }
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        const villaId = action.payload;
        state.byVilla[villaId] = [];
      });
  },
});

export const { clearReviewError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
