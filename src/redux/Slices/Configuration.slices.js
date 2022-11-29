import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  data: {
    id: JSON.parse(Cookies.get("VO_USER_AUTH") || null)?.id || null,
    role: JSON.parse(Cookies.get("VO_USER_AUTH") || null)?.role || null,
  },
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    changeRole: (state, action) => {
      state.data = {
        id: action.payload?.id,
        role: "sales",
      };
      if (action.payload?.id) {
        state.data = {
          id: action.payload?.id,
          role: "sales",
        };
      } else {
        state.data = {
          id: JSON.parse(Cookies.get("VO_USER_AUTH"))?.id || null,
          role: JSON.parse(Cookies.get("VO_USER_AUTH"))?.role || null,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeRole } = configurationSlice.actions;

export default configurationSlice.reducer;
