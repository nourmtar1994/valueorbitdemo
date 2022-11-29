import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchStages = createAsyncThunk("GetStages", async () => {
  try {
    const res = await axios.get("/stage/names/go").then((res) => res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const stagesSlices = createSlice({
  name: "stages",
  initialState,
  extraReducers: {
    [fetchStages.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchStages.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchStages.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const stagesReducer = stagesSlices.reducer;
