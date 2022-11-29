import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  sales: {
    value: null,
    selected: false,
  },
  fiscalyear: {
    value: null,
    selected: true,
  },
  fiscalquarter: {
    value: null,
    selected: true,
  },
  fiscalmonth: {
    value: null,
    selected: true,
  },
};

export const forecastParametresSlice = createSlice({
  name: "forecastParametres",
  initialState,
  reducers: {
    addForecastParametres: (state, action) => {
      if (action?.payload?.selected) {
        state[action.payload?.action].value = action.payload?.value;
        state[action.payload?.action].selected = true;
      } else {
        state[action.payload?.action].value = null;
        state[action.payload?.action].selected = false;
      }
    },
    removeForecastParametres: (state, action) => {
      // console?.log(action.payload);
    },

    resetForecastParametres: (state, action) => {
      state = {
        sales: {
          value: null,
          selected: false,
        },
        year: {
          value: 2022,
          selected: true,
        },
        quarter: {
          value: moment().quarter(),
          selected: true,
        },
        month: {
          value: moment().month() + 1,
          selected: true,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addForecastParametres,
  removeForecastParametres,
  resetForecastParametres,
} = forecastParametresSlice.actions;

export default forecastParametresSlice.reducer;
