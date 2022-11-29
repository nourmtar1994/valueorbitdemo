import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCountry = createAsyncThunk("GetCountry", async () => {
  try {
    const res = await axios.get("/account/country/names").then((res) => res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const countrySlices = createSlice({
  name: "country",
  initialState,
  extraReducers: {
    [fetchCountry.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCountry.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    },
    [fetchCountry.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const countryReducer = countrySlices.reducer;
