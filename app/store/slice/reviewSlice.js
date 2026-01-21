import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const createReview = createAsyncThunk(
  "reviews/create",
  async ({ villaId, payload }, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const res = await FetchApi({
        endpoint: `/user/reviews/${villaId}`,
        method: "POST",
        body: payload,
        token,
      });

      if (res?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return res?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ villaId, payload }, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const res = await FetchApi({
        endpoint: `/user/reviews/${villaId}`,
        method: "PATCH",
        body: payload,
        token,
      });

      if (res?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return res?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (villaId, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const res = await FetchApi({
        endpoint: `/user/reviews/${villaId}`,
        method: "DELETE",
        token,
      });

      if (res?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return { villaId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const fetchVillaReviews = createAsyncThunk(
  "reviews/fetchVillaReviews",
  async (villaId, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: `/user/reviews/${villaId}`,
        method: "GET",
      });

      if (res?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return res?.data?.reviews || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    error: null,
    message: null,
    reviews: [],
    createReviewLoading: false,
    createReviewMessage: null,
    createReviewError: null,
  },
  reducers: {
    clearReviewState(state) {
      state.error = null;
      state.message = null;
      state.createReviewMessage = null;
      state.createReviewError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVillaReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVillaReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchVillaReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createReview.pending, (state) => {
        state.createReviewLoading = true;
        state.createReviewMessage = null;
        state.createReviewError = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.createReviewLoading = false;
        state.createReviewMessage = action.payload?.message;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.createReviewLoading = false;
        state.createReviewError = action.payload;
      })

      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteReview.fulfilled, (state) => {
        state.message = "Review deleted successfully";
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
