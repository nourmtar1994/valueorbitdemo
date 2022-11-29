import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  totalCount: 0,
  defaultList: [],
  filtredList: [],
  reports: [],
  aiOpportunity: null,
  loading: false,
  error: null,
};

export const fetchOpportunity = createAsyncThunk(
  "GetOpportunity",
  async (payload = null) => {
    let user = JSON.parse(Cookies.get("VO_USER_AUTH"));
    let id =
      user.role.toLowerCase() === "sales"
        ? user.id
        : user.role.toLowerCase() === "manager"
        ? user.id
        : "";

    try {
      const res = await axios.get("/opportunity/user/" + id).then((res) => res);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const getReport = (finded) => {
  const report = {
    statistics: {
      total_number: 0,
      total_amount: 0,
    },

    categories: {
      total_number_Omitted: 0,
      total_amount_Omitted: 0,
      total_number_Pipeline: 0,
      total_amount_Pipeline: 0,
      total_number_Best_Case: 0,
      total_amount_Best_Case: 0,
      total_number_Commit: 0,
      total_amount_Commit: 0,
      total_number_Closed: 0,
      total_amount_Closed: 0,
    },

    stages: {
      total_number_Prospecting: 0,
      total_amount_Prospecting: 0,

      total_number_ValueProposition: 0,
      total_amount_ValueProposition: 0,

      total_number_NeedsAnalysis: 0,
      total_amount_NeedsAnalysis: 0,

      total_number_ClosedWon: 0,
      total_amount_ClosedWon: 0,

      total_number_IdDecisionMakers: 0,
      total_amount_IdDecisionMakers: 0,

      total_number_NegotiationReview: 0,
      total_amount_NegotiationReview: 0,

      total_number_Qualification: 0,
      total_amount_Qualification: 0,

      total_number_ProposalPriceQuote: 0,
      total_amount_ProposalPriceQuote: 0,

      total_number_PerceptionAnalysis: 0,
      total_amount_PerceptionAnalysis: 0,

      total_number_ClosedLost: 0,
      total_amount_ClosedLost: 0,
    },
    progress: {
      total_number: 0,
      total_amount: 0,
    },
    coaching: {
      total_number: 0,
      total_amount: 0,
    },
  };
  //console.log(finded);
  if (finded?.length > 0) {
    // Statistics General
    report.statistics.total_number = finded.length;
    report.statistics.total_amount = finded
      .map((row) => row.amount)
      .reduce((acc, row) => row + acc);

    // Statistics Categories
    report.categories.total_number_Omitted = finded.filter(
      (item) => item.forecastcategoryname === "Omitted"
    ).length;
    report.categories.total_amount_Omitted = finded
      .filter(({ forecastcategoryname }) => forecastcategoryname === "Omitted")
      .reduce((sum, row) => sum + row.amount, 0);

    report.categories.total_number_Pipeline = finded.filter(
      (item) => item.forecastcategoryname === "Pipeline"
    ).length;
    report.categories.total_amount_Pipeline = finded
      .filter(({ forecastcategoryname }) => forecastcategoryname === "Pipeline")
      .reduce((sum, row) => sum + row.amount, 0);

    report.categories.total_number_Best_Case = finded.filter(
      (item) => item.forecastcategoryname === "Best Case"
    ).length;
    report.categories.total_amount_Best_Case = finded
      .filter(
        ({ forecastcategoryname }) => forecastcategoryname === "Best Case"
      )
      .reduce((sum, row) => sum + row.amount, 0);

    report.categories.total_number_Commit = finded.filter(
      (item) => item.forecastcategoryname === "Commit"
    ).length;
    report.categories.total_amount_Commit = finded
      .filter(({ forecastcategoryname }) => forecastcategoryname === "Commit")
      .reduce((sum, row) => sum + row.amount, 0);

    report.categories.total_number_Closed = finded.filter(
      (item) => item.forecastcategoryname === "Closed"
    ).length;
    report.categories.total_amount_Closed = finded
      .filter(({ forecastcategoryname }) => forecastcategoryname === "Closed")
      .reduce((sum, row) => sum + row.amount, 0);

    // Statistics Stages

    report.stages.total_number_Prospecting = finded.filter(
      (item) => item.stagename === "Prospecting"
    ).length;
    report.stages.total_amount_Prospecting = finded
      .filter(({ stagename }) => stagename === "Prospecting")
      .reduce((sum, row) => sum + row.amount, 0);

    report.stages.total_number_ValueProposition = finded.filter(
      (item) => item.stagename === "Value Proposition"
    ).length;
    report.stages.total_amount_ValueProposition = finded
      .filter(({ stagename }) => stagename === "Value Proposition")
      .reduce((sum, row) => sum + row.amount, 0);

    report.stages.total_number_NeedsAnalysis = finded.filter(
      (item) => item.stagename === "Needs Analysis"
    ).length;
    report.stages.total_amount_NeedsAnalysis = finded
      .filter(({ stagename }) => stagename === "Needs Analysis")
      .reduce((sum, row) => sum + row.amount, 0);

    report.stages.total_number_ClosedWon = finded.filter(
      (item) => item.stagename === "Closed Won"
    ).length;
    report.stages.total_amount_ClosedWon = finded
      .filter(({ stagename }) => stagename === "Closed Won")
      .reduce((sum, row) => sum + row.amount, 0);

    report.stages.total_number_IdDecisionMakers = finded.filter(
      (item) => item.stagename === "Id. Decision Makers"
    ).length;
    report.stages.total_amount_IdDecisionMakers = finded
      .filter(({ stagename }) => stagename === "Id. Decision Makers")
      .reduce((sum, row) => sum + row.amount, 0);

    report.stages.total_number_NegotiationReview = finded.filter(
      (item) => item.stagename === "Negotiation/Review"
    ).length;
    report.stages.total_amount_NegotiationReview = finded
      .filter(({ stagename }) => stagename === "Negotiation/Review")
      .reduce((sum, row) => sum + row.amount, 0);

    report.stages.total_number_Qualification = finded.filter(
      (item) => item.stagename === "Qualification"
    ).length;
    report.stages.total_amount_Qualification = finded
      .filter(({ stagename }) => stagename === "Qualification")
      .reduce((sum, row) => sum + row.amount, 0);

    report.stages.total_number_ProposalPriceQuote = finded.filter(
      (item) => item.stagename === "Proposal/Price Quote"
    ).length;
    report.stages.total_amount_ProposalPriceQuote = finded
      .filter(({ stagename }) => stagename === "Proposal/Price Quote")
      .reduce((sum, row) => sum + row.amount, 0);

    report.stages.total_number_PerceptionAnalysis = finded.filter(
      (item) => item.stagename === "Perception Analysis"
    ).length;
    report.stages.total_amount_PerceptionAnalysis = finded
      .filter(({ stagename }) => stagename === "Perception Analysis")
      .reduce((sum, row) => sum + row.amount, 0);

    report.stages.total_number_ClosedLost = finded.filter(
      (item) => item.stagename === "Closed Lost"
    ).length;
    report.stages.total_amount_ClosedLost = finded
      .filter(({ stagename }) => stagename === "Closed Lost")
      .reduce((sum, row) => sum + row.amount, 0);

    //Progress
    report.progress.total_number = finded.filter(
      (item) => item.dealprogress !== 0
    ).length;
    report.progress.total_amount = finded
      .filter(({ dealprogress }) => dealprogress !== 0)
      .reduce((sum, row) => sum + row.dealprogress, 0);

    //Coaching
    report.coaching.total_number = finded.filter(
      (item) => item.dealcoaching !== 0
    ).length;
    report.coaching.total_amount = finded
      .filter(({ dealcoaching }) => dealcoaching !== 0)
      .reduce((sum, row) => sum + row.dealcoaching, 0);

    //ManagerJdm
    // const findedJdm = await ForecastHealthCheckCategoryModel.find().select('name');

    // if (findedJdm.length != 0) {
    //   findedJdm.forEach(async jdm => {
    //     jdms.push(jdm.name)
    //     jdmsCount.push(finded.filter(item => item.managerjudgment === jdm.name).length);
    //     jdmsAmount.push(finded.filter(({
    //       managerjudgment
    //     }) => managerjudgment === jdm.name).reduce((sum, row) => sum + row.amount, 0));
    //   });
    // }
  }
  return report;
};

export const opportunitySlices = createSlice({
  name: "opportunity",
  initialState,

  extraReducers: {
    [fetchOpportunity.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchOpportunity.fulfilled]: (state, action) => {
      state.loading = false;
      state.defaultList = action.payload?.data;
      state.defaultReports = getReport(action.payload?.data);
      state.filtredList = action.payload?.data;
      state.reports = getReport(action.payload?.data);
      state.totalCount = action.payload?.data?.length || 0;
    },
    [fetchOpportunity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
  reducers: {
    addOpprtunityFilter: (state, action) => {
      state.filtredList = action?.payload;
      state.reports = getReport(action?.payload);
    },
    updateOpportunityItem: (state, action) => {
      state.filtredList = state.filtredList.map((obj) =>
        obj._id === action.payload?.opportunityId
          ? { ...obj, ...action?.payload?.value }
          : obj
      );
      state.defaultList = state.defaultList.map((obj) =>
        obj._id === action.payload?.opportunityId
          ? { ...obj, ...action?.payload?.value }
          : obj
      );
      state.reports = getReport(state.filtredList);
      state.reports = getReport(state.defaultList);
    },
    addAiOpportunity: (state, action) => {
      state.aiOpportunity = action?.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// => {
//   console.log(state?.defaultList?.map(item => item))
//   (filtredArray, opportunities)

export const {
  addOpprtunityFilter,
  setLoading,
  updateOpportunityItem,
  addAiOpportunity,
} = opportunitySlices.actions;

export const opportunityReducer = opportunitySlices.reducer;
