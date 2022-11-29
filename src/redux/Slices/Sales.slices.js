import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchSales = createAsyncThunk(
  "GetSales",
  async (payload = null) => {
    let user = JSON.parse(Cookies.get("VO_USER_AUTH"));
    if (user?.role === "admin") {
      return null;
    }
    try {
      const res = await axios
        .get("/sales/manager/" + user?.id)
        .then((res) => res);
      return {
        data: res.data?.data,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const salesSlices = createSlice({
  name: "sales",
  initialState,
  extraReducers: {
    [fetchSales.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSales.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    },
    [fetchSales.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const salesReducer = salesSlices.reducer;
