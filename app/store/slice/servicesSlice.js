import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";


export const fetchExtraServices = createAsyncThunk(
  "extraService/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: "/user/extra-service",
        method: "GET",
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }
      return res?.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const fetchExtraServiceById = createAsyncThunk(
  "extraService/fetchById",
  async (serviceId, thunkAPI) => {
    try {
      const res = await FetchApi({
        endpoint: `/user/extra-service/${serviceId}`,
        method: "GET",
      });

      if (res?.data?.success === false) {
        return thunkAPI.rejectWithValue(res?.data?.message);
      }

      return res?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const extraServiceSlice = createSlice({
  name: "extraService",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearExtraServiceError(state) {
      state.error = null;
    },
    clearSelectedService(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExtraServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExtraServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchExtraServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchExtraServiceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExtraServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchExtraServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearExtraServiceError, clearSelectedService } =
  extraServiceSlice.actions;

export default extraServiceSlice.reducer;
