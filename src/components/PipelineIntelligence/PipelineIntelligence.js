import React from "react";
import { useSelector } from "react-redux";
import DealsDetails from "../DealsDetails/DealsDetails";
import DealsProgress from "../DealsProgress/DealsProgress";
import Filter from "../Filter/Filter";
import PipelineProgress from "../PipelineProgress/PipelineProgress";
import RevenuePath from "../RevenuePath/RevenuePath";

const PipelineIntelligence = () => {
  const opportunities = useSelector((state) => state.opportunity);

  return (
    <>
      <Filter opportunities={opportunities} opportunitiesForStages={[]} />
      <DealsProgress open={true} />
      <PipelineProgress open={true} />
      <RevenuePath />
      <DealsDetails />
    </>
  );
};

export default PipelineIntelligence;
