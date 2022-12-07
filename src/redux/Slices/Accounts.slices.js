import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  contacts: [],
  loading: false,
  error: null,
};

export const fetchAccounts = createAsyncThunk(
  "GetAccounts",
  async (payload = null) => {
    let user = JSON.parse(Cookies.get("VO_USER_AUTH"));
    let id = user.originId;
    console.log(user);

    if (user?.role === "admin") {
      return [];
    }
    try {
      const res = await axios
        .get("/account/by/" + user?.role + "/" + id)
        .then((res) => res);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const accountsSlices = createSlice({
  name: "accounts",
  initialState,

  extraReducers: {
    [fetchAccounts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAccounts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
      state.contacts = action.payload?.contacts;
    },
    [fetchAccounts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
  // reducers: {
  //   addOpprtunityFilter: (state, action) => {
  //     state.filtredList = action?.payload;
  //     state.reports = getReport(action?.payload);
  //   },
  //   updateOpportunityItem: (state, action) => {
  //     state.filtredList = state.filtredList.map((obj) =>
  //       obj._id === action.payload?.opportunityId
  //         ? { ...obj, ...action?.payload?.value }
  //         : obj
  //     );
  //     state.defaultList = state.defaultList.map((obj) =>
  //       obj._id === action.payload?.opportunityId
  //         ? { ...obj, ...action?.payload?.value }
  //         : obj
  //     );
  //     state.reports = getReport(state.filtredList);
  //     state.reports = getReport(state.defaultList);
  //   },
  //   addAiOpportunity: (state, action) => {
  //     state.aiOpportunity = action?.payload;
  //   },
  //   setLoading: (state, action) => {
  //     state.loading = action.payload;
  //   },
  // },
});

// => {
//   console.log(state?.defaultList?.map(item => item))
//   (filtredArray, opportunities)

// export const {
//   addOpprtunityFilter,
//   setLoading,
//   updateOpportunityItem,
//   addAiOpportunity,
// } = opportunitySlices.actions;

export const accountsReducer = accountsSlices.reducer;
