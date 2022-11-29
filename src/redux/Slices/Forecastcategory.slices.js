import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchForecastCategory = createAsyncThunk(
  "GetForecastCategory",
  async () => {
    try {
      const res = await axios
        .get("/managerjuggement/")
        .then((res) => res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const forecastCategorySlices = createSlice({
  name: "forecastCategory",
  initialState,
  extraReducers: {
    [fetchForecastCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchForecastCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    },
    [fetchForecastCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const forecastCategoryReducer = forecastCategorySlices.reducer;
