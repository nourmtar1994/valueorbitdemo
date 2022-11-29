import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  data: [
    {
      action: "fiscalyear",
      value: moment().year(),
      selected: true,
    },
    {
      action: "fiscalquarter",
      value: moment().quarter(),
      selected: true,
    },
    {
      action: "fiscalmonth",
      value: moment().month() + 1,
      selected: true,
    },
  ],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      let index = state.data.findIndex(
        (item) => item.action === action.payload.action
      );

      let isMatch = state.data.findIndex(
        (item) =>
          item.action === action.payload.action &&
          item.value === action.payload.value
      );

      if (action.payload.selected) {
        if (index === -1) {
          state.data.push(action.payload);
        } else if (isMatch !== -1) {
          state.data.splice(isMatch, 1);
        } else {
          state.data[index] = action.payload;
        }
      } else {
        state.data.splice(index, 1);
      }
    },
    removeFilter: (state, action) => {
      state.data = state?.data?.filter(
        (item) => item.action !== action.payload?.action
      );
    },

    resetFilter: (state, action) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFilter, removeFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
