import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  setupTokenRefresh,
  clearTokenRefresh,
} from "../../utils/setupTokenRefresh";
import { FetchApi } from "../../api/FetchApi";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: "/user/createUser",
        method: "POST",
        body: payload,
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Register failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: "/user/phone-register",
        method: "POST",
        body: payload,
      });
      const data = res?.data;
      if (data?.success === false) {
        return thunkAPI.rejectWithValue(data?.message);
      }
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data?.accessToken);
        localStorage.setItem("refreshToken", data?.refreshToken);
        localStorage.setItem("tokenExpiry", Date.now() + 50 * 60 * 1000);
        localStorage.setItem("loginTimestamp", Date.now());
        setupTokenRefresh(thunkAPI.dispatch);
      }
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshUserToken",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const refreshToken = state?.auth?.refreshToken;
    try {
      const res = await FetchApi({
        endpoint: "/user/refresh",
        method: "POST",
        body: { refreshToken },
      });

      const data = res?.data;

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenExpiry", Date.now() + 50 * 60 * 1000);

        setupTokenRefresh(thunkAPI.dispatch);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Token refresh failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    clearAuthMessage(state) {
      state.message = null;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;

      localStorage.clear();
      clearTokenRefresh();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.message = "Registration successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user || null;
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
        state.message = action.payload?.message || "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken || state.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload || "Session expired";
      });
  },
});

export const { logout, clearAuthError, clearAuthMessage } = authSlice.actions;

export default authSlice.reducer;
