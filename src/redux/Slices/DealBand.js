import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDealBand = createAsyncThunk("GetDealBand", async () => {
  try {
    const res = await axios.get("/dealband").then((res) => res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const dealBandSlices = createSlice({
  name: "DealBand",
  initialState,
  extraReducers: {
    [fetchDealBand.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchDealBand.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    },
    [fetchDealBand.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const dealBandReducer = dealBandSlices.reducer;
