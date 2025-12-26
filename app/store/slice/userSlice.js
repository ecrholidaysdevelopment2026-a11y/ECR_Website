import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/me",
        method: "GET",
        token: true,
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.message);
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch user profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/update",
        method: "PATCH",
        body: payload,
        token: true,
      });

      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.message);
      }

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to update profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    clearUserMessage(state) {
      state.message = null;
    },
    logoutUser(state) {
      state.profile = null;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload?.user || action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload?.user || action.payload;
        state.message = "Profile updated successfully";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError, clearUserMessage, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
