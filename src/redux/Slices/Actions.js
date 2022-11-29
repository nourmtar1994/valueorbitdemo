import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    addActions: (state, action) => {
      state.data = action?.payload;
    },
    resetActions: (state, action) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addActions, resetActions } = actionsSlice.actions;

export default actionsSlice.reducer;
