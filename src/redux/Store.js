import { configureStore } from "@reduxjs/toolkit";
import { opportunityReducer } from "./Slices/Opportunity.slices";
import filterSlice from "./Slices/Filter.slices";
import { stagesReducer } from "./Slices/Stages";
import { forecastCategoryReducer } from "./Slices/Forecastcategory.slices";
import { salesReducer } from "./Slices/Sales.slices";
import { countryReducer } from "./Slices/Country";
import { dealBandReducer } from "./Slices/DealBand";
import forecastParametresSlice from "./Slices/ForecastParametres";
import configurationSlice from "./Slices/Configuration.slices";
import actionsSlice from "./Slices/Actions";
import { accountsReducer } from "./Slices/Accounts.slices";

export const store = configureStore({
  reducer: {
    opportunity: opportunityReducer,
    filter: filterSlice,
    actions: actionsSlice,
    forecastParametres: forecastParametresSlice,
    stages: stagesReducer,
    forecastCategory: forecastCategoryReducer,
    sales: salesReducer,
    country: countryReducer,
    dealBand: dealBandReducer,
    configuration: configurationSlice,
    accounts: accountsReducer,
  },
});
