import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
//APP COMPONENTS
import ForeCastHealthCheck from "../ForeCastHealthCheck/ForeCastHealthCheck";
import DealsDetails from "../DealsDetails/DealsDetails";
import { TeamProgress } from "../TeamProgress/TeamProgress";
import PipelineProgress from "../PipelineProgress/PipelineProgress";
//CSS FILES
// import * as classes from "./Dashboard.module.css";
//UTILE
import { useSelector } from "react-redux";
import Filter from "../Filter/Filter";

const Dashboard2 = () => {
  const [salesInformation, setSalesInformation] = useState({
    quotaSales: [],
    salesCommits: [],
    salesBestCases: [],
  });

  // const [opportunitiesForStages, setopportunitiesForStages] = useState([]);
  // const opportunities = useSelector((state) => state.opportunity || []);
  // const filterData = useSelector((state) => state?.filter?.data);
  const user = useSelector((state) => state.configuration?.data || []);

  // useEffect(() => {
  //   const filterOpportunities = () => {
  //     let filterOption = {};

  //     filterData?.map((item) => {
  //       if (item.selected) {
  //         if (item.action === "amount") {
  //           return (filterOption[item.action] = item.range);
  //         } else {
  //           return (filterOption[item.action] = item.value);
  //         }
  //       }
  //       return false;
  //     });

  //     setopportunitiesForStages(
  //       opportunities?.defaultList?.filter((item) => {
  //         if (
  //           filterOption?.fiscalyear !== undefined &&
  //           parseInt(item?.fiscalyear) !== parseInt(filterOption?.fiscalyear)
  //         ) {
  //           return false;
  //         }
  //         if (
  //           filterOption?.fiscalquarter !== undefined &&
  //           parseInt(item?.fiscalquarter) !==
  //             parseInt(filterOption?.fiscalquarter)
  //         ) {
  //           return false;
  //         }
  //         if (
  //           filterOption?.fiscalmonth !== undefined &&
  //           parseInt(moment(item?.closedate).month()) + 1 !==
  //             parseInt(filterOption?.fiscalmonth)
  //         ) {
  //           return false;
  //         }

  //         if (
  //           filterOption?.amountMin !== undefined &&
  //           filterOption?.amountMin !== null &&
  //           item?.amount < filterOption?.amountMin
  //         ) {
  //           return false;
  //         }

  //         if (
  //           filterOption?.amountMax !== undefined &&
  //           filterOption?.amountMax !== null &&
  //           item?.amount > filterOption?.amountMax
  //         ) {
  //           return false;
  //         }
  //         if (
  //           filterOption?.salesuser !== undefined &&
  //           item?.salesuser?._id !== filterOption?.salesuser
  //         ) {
  //           return false;
  //         }
  //         if (
  //           filterOption?.country !== undefined &&
  //           item?.account?.billingcountry !== filterOption?.country
  //         ) {
  //           return false;
  //         }
  //         return true;
  //       })
  //     );
  //   };
  //   opportunities && filterOpportunities();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [opportunities]);

  useEffect(() => {
    window.document.title = "Forecast intelligence";
  }, []);

  return (
    <>
      {/* {loadingFilter && <LoaderFilter />} */}
      <Filter />

      <>
        {JSON.parse(Cookies.get("VO_USER_AUTH")).role !== "admin" && (
          <ForeCastHealthCheck
            open={true}
            salesInformation={salesInformation}
            setSalesInformation={setSalesInformation}
          />
        )}
        {user?.role !== "sales" && (
          <TeamProgress open={true} salesInformation={salesInformation} />
        )}

        {/* <DealsProgress open={true} /> */}
        <PipelineProgress open={true} />

        <DealsDetails open={true} />
        <br />
        {/* <MultiBarChart /> */}
        {/* 
        <br />
        {/* <Timeline.Item>
            <Badge
              align="right"
              hoverable
              icon={<FileDoneOutlined />}
              color={"warning"}
            >
            </Badge>
          </Timeline.Item> */}
      </>
    </>
  );
};
export default Dashboard2;
