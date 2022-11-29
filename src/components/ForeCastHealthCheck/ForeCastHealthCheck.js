import React, { useEffect, useState } from "react";
//ANDT DESIGN COMPONENTS
import { Row, Col, Progress, message, Modal, Divider, Alert } from "antd";
//APP COMPONENTS
import InfoCard from "../InfoCard/InfoCard";
import LineCharts from "../charts/LineChart/LineCharts";
//ICONS
import {
  AuditOutlined,
  FileDoneOutlined,
  InfoCircleOutlined,
  SlidersOutlined,
} from "@ant-design/icons";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { NumFormatter } from "../Services/Utils/Utils";
import UpdateAdjusment from "./UpdateAdjusment/UpdateAdjusment";
import { RepsCommit } from "./RepsCommit/RepsCommit";
import { useParams } from "react-router-dom";
import { changeRole } from "../../redux/Slices/Configuration.slices";
import {
  FaAward,
  FaChartLine,
  FaCrosshairs,
  FaPencilAlt,
  FaRegTimesCircle,
  FaRoute,
} from "react-icons/fa";
import * as classes from "./ForeCastHealthCheck.module.css";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import StatisticCard from "../../template/NewDesign/Components/StatisticCard/StatisticCard";

const ForeCastHealthCheck = ({ open }) => {
  const dispatch = useDispatch();

  const [rollupChartData, setRollupChartData] = useState({
    rollupCommit: [],
    rollupBestCase: [],
  });

  const [repsChartData, setRepsChartData] = useState({
    commitReps: [],
    bestcaseReps: [],
  });

  const [forecastChartData, setForeCastChartData] = useState({
    commit: [],
    bestCase: [],
    comments: [],
  });

  const [aiChartData, setaiChartData] = useState({
    aicommit: [],
    aibestCase: [[]],
  });

  const [forecastData, setForecastData] = useState(null);
  const [aiForecastData, setAiForecastData] = useState(null);
  const [repsData, setRepsData] = useState(null);

  const [loading, setLoading] = useState();
  const [loadingTarget, setLoadingTarget] = useState();
  const [loadingCommit, setLoadingCommit] = useState();
  const [loadingBestCase, setLoadingBestCase] = useState();
  const [quarterData, setQuarterData] = useState(null);

  const [localReports, setLocalReports] = useState(null);

  const reports = useSelector((state) => state.opportunity?.reports);
  const forecastParametres = useSelector((state) => state?.forecastParametres);

  const sales = useSelector((state) => state.sales?.data || []);
  const user = useSelector((state) => state.configuration?.data || []);
  let { id } = useParams();

  useEffect(() => {
    dispatch(changeRole({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setLocalReports(reports);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports]);

  useEffect(() => {
    if (
      forecastParametres?.fiscalyear?.value &&
      forecastParametres?.fiscalquarter?.value &&
      forecastParametres?.fiscalmonth?.value
    ) {
      setQuarterData({
        year: forecastParametres?.fiscalyear?.value,
        quarter: forecastParametres?.fiscalquarter?.value,
        month: forecastParametres?.fiscalmonth?.value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forecastParametres]);

  useEffect(() => {
    if (quarterData?.year === null) {
      return;
    }
    if (!user) {
      return;
    }
    user && quarterData && getCommitData();
    user && quarterData && getBestCaseData();
    user && quarterData && getTarget();
    user && quarterData && getAiForeCast();
    user && quarterData && getRollupChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, quarterData]);

  const getRollupChart = async () => {
    let newQuotaCommit = [];
    let newQuotaBestCase = [];

    let link = "/rollup/sales/filtered/period/";
    if (user?.role === "sales") {
      link += user?.id;
    } else {
      return;
    }
    if (quarterData?.year) {
      link += "?fiscalyear=" + quarterData?.year;
    }
    if (quarterData?.quarter) {
      link += "&fiscalquarter=" + quarterData?.quarter;
    }
    if (quarterData?.month) {
      link += "&fiscalmonth=" + quarterData?.month;
    }

    if (user?.role === "sales") {
      try {
        const { data } = await axios.get(link);
        data?.data
          .sort((a, b) => moment(a?.createddate) - moment(b?.createddate))
          .forEach((item) => {
            newQuotaCommit.push({ x: item.createddate, y: item.commit });
            newQuotaBestCase.push({ x: item.createddate, y: item.best_case });
          });

        setRollupChartData({
          rollupCommit: newQuotaCommit,
          rollupBestCase: newQuotaBestCase,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUniquePropertyValues = (_array, _property) => {
    // Set will store only distinct values
    let totalvalue = 0;
    let months = [...new Set(_array.map((element) => element[_property]))];
    let newobjects = [];
    months.map((item) => {
      totalvalue += _array?.filter((el) => el[_property] === item)[0]?.value;
      return newobjects.push(_array.filter((el) => el[_property] === item)[0]);
      //  .sort((a, b) => moment(b?.createddate) - moment(b?.createddate))[0];
    });
    return {
      months: months,
      data: newobjects,
      totalvalue,
    };
  };

  const getAiForeCast = async () => {
    setLoading(true);
    let link = "";

    if (quarterData?.year) {
      link += "?fiscalyear=" + quarterData?.year;
    }
    if (quarterData?.quarter) {
      link += "&fiscalquarter=" + quarterData?.quarter;
    }
    if (quarterData?.month) {
      link += "&fiscalmonth=" + quarterData?.month;
    }

    try {
      const { data } = await axios.get("/ai_prediction/filtered/go/" + link);

      setAiForecastData({
        aiBestCase:
          user?.role === "manager"
            ? data?.data[0]?.ai_prediction_manager_ai_best_case[0]
            : data?.data[0]?.ai_prediction_sales_ai_best_case[0],

        aiCommit:
          user?.role === "manager"
            ? data?.data[0]?.ai_prediction_manager_ai_commit[0]
            : data?.data[0]?.ai_prediction_sales_ai_commit[0],
      });

      // let salesAICommitData = [];
      // let salesAIBestCaseData = [];

      // let managerAICommitData = [];
      // let managerAIBestCaseData = [];

      // data?.data?.map((item) => {
      //   managerAICommitData?.push({
      //     ...item?.ai_prediction_manager_ai_commit[0],
      //     createddate: item?.createddate,
      //   });
      //   managerAIBestCaseData?.push({
      //     ...item?.ai_prediction_manager_ai_best_case[0],
      //     createddate: item?.createddate,
      //   });

      //   salesAICommitData?.push({
      //     ...item?.ai_prediction_sales_ai_commit[0],
      //     createddate: item?.createddate,
      //   });
      //   salesAIBestCaseData?.push({
      //     ...item?.ai_prediction_sales_ai_best_case[0],
      //     createddate: item?.createddate,
      //   });
      // });

      // let aiCommitChartData =
      //   user?.role === "manager" ? managerAICommitData : salesAICommitData;

      // let aiBestCasetChartData =
      //   user?.role === "manager" ? managerAIBestCaseData : salesAIBestCaseData;
      setLoading(false);

      let newCommitData = [];
      let newBestCase = [];

      data?.data
        ?.sort((a, b) => moment(a?.createddate) - moment(b?.createddate))
        ?.forEach((item) => {
          item?.createddate &&
            newCommitData.push({
              x: item?.createddate,
              y: item?.ai_commit ? item?.ai_commit : 0,
            });
        });

      data?.data
        ?.sort((a, b) => moment(a?.createddate) - moment(b?.createddate))
        ?.forEach((item) => {
          item?.createddate &&
            newBestCase.push({
              x: item?.createddate,
              y: item?.ai_best_case ? item?.ai_best_case : 0,
            });
        });

      console.log({
        aicommit: newCommitData,
        aibestCase: newBestCase,
      });

      setaiChartData({
        aicommit: newCommitData,
        aibestCase: newBestCase,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //monthly (sales & manager )
  const getCommitData = async () => {
    if (quarterData?.year === null) {
      return;
    }
    if (!user) {
      return;
    }
    setLoadingCommit(true);
    let link = "";
    if (user) {
      link = "?createdbyid=" + user?.id;
    }
    if (quarterData?.year) {
      link += "&fiscalyear=" + quarterData?.year;
    }
    if (quarterData?.quarter) {
      link += "&fiscalquarter=" + quarterData?.quarter;
    }
    if (quarterData?.month) {
      link += "&fiscalmonth=" + quarterData?.month;
    }

    try {
      const { data } = await axios.get(
        "/forecast/by/go/" + link + "&forecastcategoryname=commit"
      );
      setLoadingCommit(false);
      if (data?.success) {
        let newCommiData;
        newCommiData = data?.data?.sort(
          (a, b) => moment(b?.createddate) - moment(a?.createddate)
        );

        //Commit adj
        if (quarterData?.month) {
          setForecastData((prevState) => {
            return {
              ...prevState,
              commit: newCommiData[0] || 0,
            };
          });
        } else if (quarterData?.quarter) {
          setForecastData((prevState) => {
            return {
              ...prevState,
              commit: getUniquePropertyValues(newCommiData, "fiscalmonth"),
            };
          });
        }
        // commit chart
        let forecastcComments = [];
        let newforecastChartData = {
          commit: [],
        };

        data?.data
          ?.sort((a, b) => moment(a?.createddate) - moment(b?.createddate))
          ?.forEach((element) => {
            newforecastChartData.commit.push({
              x: element?.createddate,
              y: element?.value || 0,
            });
            forecastcComments.push(element?.comment || "no comment");
          });

        setForeCastChartData((prevState) => {
          return {
            ...prevState,
            commit: newforecastChartData?.commit,
            comments: forecastcComments,
          };
        });

        //Reps Commit
        let newCommitRepData;

        newCommitRepData = data?.repsSalesForecast;

        const getRepsValue = (array) => {
          return array?.sort(
            (a, b) => moment(b?.createddate) - moment(a?.createddate)
          )[0]?.value;
        };

        let totalcommit = 0;
        newCommitRepData?.map(
          (item) => (totalcommit = totalcommit + (getRepsValue(item) || 0))
        );

        setRepsData((prevState) => {
          return {
            ...prevState,
            commit: totalcommit,
            allCommits: newCommitRepData,
          };
        });

        //reps commit chart
        let newRepDataChart = [];

        data?.RepsSalesSum?.map(
          (item) =>
            item?.value &&
            newRepDataChart.push({
              x: item?.date,
              y: item?.value,
            })
        );

        setRepsChartData((prevState) => {
          return {
            ...prevState,
            commitReps: newRepDataChart,
          };
        });
      }
    } catch (error) {
      setLoadingCommit(false);
      // setForecastData(null);
    }
  };

  //monthly (sales & manager )
  const getBestCaseData = async () => {
    if (quarterData?.year === null) {
      return;
    }
    if (!user) {
      return;
    }
    setLoadingBestCase(true);
    let link = "";
    if (user) {
      link = "?createdbyid=" + user?.id;
    }
    if (quarterData?.year) {
      link += "&fiscalyear=" + quarterData?.year;
    }
    if (quarterData?.quarter) {
      link += "&fiscalquarter=" + quarterData?.quarter;
    }
    if (quarterData?.month) {
      link += "&fiscalmonth=" + quarterData?.month;
    }

    try {
      const { data } = await axios.get(
        "/forecast/by/go/" + link + "&forecastcategoryname=bestcase"
      );
      setLoadingBestCase(false);
      if (data?.success) {
        let newBestCaseData;
        newBestCaseData = data?.data?.sort(
          (a, b) => moment(b?.createddate) - moment(a?.createddate)
        );

        //bestcase adj

        if (quarterData?.month) {
          setForecastData((prevState) => {
            return {
              ...prevState,
              bestCase: newBestCaseData[0] || 0,
            };
          });
        } else if (quarterData?.quarter) {
          setForecastData((prevState) => {
            return {
              ...prevState,
              bestCase: getUniquePropertyValues(newBestCaseData, "fiscalmonth"),
            };
          });
        }

        //Reps bestcase
        let newBestCaseReps;

        newBestCaseReps = data?.repsSalesForecast?.sort(
          (a, b) => moment(b?.createddate) - moment(a?.createddate)
        );

        const getRepsValue = (array) => {
          return array?.sort(
            (a, b) => moment(b?.createddate) - moment(a?.createddate)
          )[0]?.value;
        };

        let totalBestCase = 0;

        newBestCaseReps?.map(
          (item) => (totalBestCase = totalBestCase + (getRepsValue(item) || 0))
        );

        setRepsData((prevState) => {
          return {
            ...prevState,
            bestCase: totalBestCase,
            allBestCases: newBestCaseReps,
          };
        });
        // commit chart
        let forecastComments = [];
        let newforecastChartData = {
          bestCase: [],
        };

        data?.data
          ?.sort((a, b) => moment(a?.createddate) - moment(b?.createddate))
          ?.forEach((element) => {
            newforecastChartData.bestCase.push({
              x: element?.createddate,
              y: element?.value || 0,
            });
            forecastComments.push(element?.comment || "no comment");
          });

        setForeCastChartData((prevState) => {
          return {
            ...prevState,
            bestCase: newforecastChartData?.bestCase,
          };
        });

        //reps bestcase chart
        let newRepDataChart = [];

        data?.RepsSalesSum?.map(
          (item) =>
            item?.value &&
            newRepDataChart.push({
              x: item?.date,
              y: item?.value,
            })
        );

        setRepsChartData((prevState) => {
          return {
            ...prevState,
            bestcaseReps: newRepDataChart,
          };
        });
      }
    } catch (error) {
      setLoadingBestCase(false);
      // setForecastData(null);
    }
  };

  const getTarget = async () => {
    if (quarterData?.year === null) {
      return;
    }
    if (!user) {
      return;
    }
    setLoadingTarget(true);
    let link = "";
    if (user) {
      link = "?createdbyid=" + user?.id;
    }
    if (quarterData?.year) {
      link += "&fiscalyear=" + quarterData?.year;
    }
    if (quarterData?.quarter) {
      link += "&fiscalquarter=" + quarterData?.quarter;
    }
    if (quarterData?.month) {
      link += "&fiscalmonth=" + quarterData?.month;
    }

    try {
      const { data } = await axios.get("/target/by/go/" + link);
      setLoadingTarget(false);

      if (data?.success) {
        let targetData;
        targetData = data?.data?.sort(
          (a, b) => moment(b?.createddate) - moment(a?.createddate)
        );

        let newRepData;
        newRepData = data?.repsSalesTarget?.sort(
          (a, b) => moment(b?.createddate) - moment(a?.createddate)
        );

        //Commit adj
        if (quarterData?.month) {
          setForecastData((prevState) => {
            return {
              ...prevState,
              target: targetData[0] || 0,
            };
          });
        } else {
          setForecastData((prevState) => {
            return {
              ...prevState,
              target: getUniquePropertyValues(targetData, "fiscalmonth"),
            };
          });
        }

        const getRepsValue = (array) => {
          return array?.sort(
            (a, b) => moment(b?.createddate) - moment(a?.createddate)
          )?.[0]?.value;
        };

        let totalRepsTarget = 0;

        newRepData?.map((item) => {
          totalRepsTarget = totalRepsTarget + (getRepsValue(item) || 0);
        });

        setRepsData((prevState) => {
          return {
            ...prevState,
            repsTarget: totalRepsTarget || 0,
            allTarget: newRepData,
          };
        });

        setForeCastChartData((prevState) => {
          return {
            ...prevState,
            target: targetData?.map((item) => {
              return {
                x: item?.createddate,
                y: item?.value ? item?.value : 0,
              };
            }),
          };
        });
      }
    } catch (error) {
      setLoadingTarget(false);
      // setForecastData(null);
    }
  };

  const updateAdjModel = async (target, adjusment) => {
    message.destroy();
    if (adjusment !== undefined) {
      Modal.info({
        okButtonProps: {
          style: {
            display: "none",
          },
        },
        closable: true,
        footer: null,
        icon: <SlidersOutlined />,
        title:
          target === "commit"
            ? "Commit Adjusment"
            : target === "target"
            ? "Target "
            : "Best Case adjusment",
        onOk() {
          target === "commit"
            ? getCommitData()
            : target === "target"
            ? getTarget()
            : getBestCaseData();
        },
        afterClose() {
          target === "commit"
            ? getCommitData()
            : target === "target"
            ? getTarget()
            : getBestCaseData();
        },
        content: (
          <UpdateAdjusment
            sales={sales}
            forecastParametres={forecastParametres}
            quarterData={quarterData}
            adjusment={adjusment}
            target={target}
          />
        ),
      });
    } else {
      message.error(
        "The " +
          (target === "commit" ? "Commit Adjusment" : "Best Case adjusment") +
          " cannot be updated before the period is set"
      );
    }
  };

  const getRepsCommit = async (data, target) => {
    if (!forecastData) {
      return;
    }
    Modal.info({
      okButtonProps: {
        style: {
          display: "none",
        },
      },

      closable: true,
      footer: null,
      icon:
        target === "target" ? (
          <AuditOutlined />
        ) : target === "commit" ? (
          <AuditOutlined />
        ) : (
          <AuditOutlined />
        ),
      title: `Reps ${target} details`,
      content: (
        <RepsCommit
          target={target}
          type={quarterData?.month ? "month" : "quarter"}
          repsCommits={data}
          sales={sales}
          user={user}
          forecastParametres={forecastParametres}
          quarterData={quarterData}
        />
      ),
    });
  };
  return (
    <CollapsedCard
      description={[
        {
          title: "Total amount",
          value: NumFormatter(localReports?.statistics?.total_amount, true),
        },
        {
          title: "Total deal",
          value: localReports?.statistics?.total_number,
        },
      ]}
      open={open}
      title={"forecast"}
      loading={loading}
    >
      <Row gutter={[10, 10]}>
        {/* target */}
        <Col
          lg={{ span: 6 }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <StatisticCard
            title={"Target"}
            icon={<FaCrosshairs />}
            type="info"
            loading={loadingTarget}
            data={
              user?.role === "manager"
                ? [
                    {
                      title: "Reps Target",
                      value: (
                        <>
                          {NumFormatter(repsData?.repsTarget || 0, true)}
                          &nbsp;
                          <InfoCircleOutlined
                            className="editButton"
                            onClick={() =>
                              getRepsCommit(repsData?.allTarget, "target")
                            }
                          />
                        </>
                      ),
                    },
                    {
                      title: "Target",
                      value: (
                        <>
                          {NumFormatter(
                            forecastData?.target?.value ||
                              forecastData?.target?.totalvalue ||
                              0,
                            true
                          )}
                          &nbsp;
                          <FaPencilAlt
                            className="editButton"
                            style={{ fontSize: "0.9em" }}
                            onClick={() => {
                              updateAdjModel("target", forecastData?.target);
                            }}
                          />
                        </>
                      ),
                    },
                  ]
                : [
                    {
                      title: "Target",
                      value: (
                        <>
                          {NumFormatter(
                            forecastData?.target?.value ||
                              forecastData?.total_quota_amount ||
                              0,
                            true
                          )}
                          &nbsp;
                          <FaPencilAlt
                            className="editButton"
                            style={{ fontSize: "0.9em" }}
                            onClick={() => {
                              updateAdjModel("target", forecastData?.target);
                            }}
                          />
                        </>
                      ),
                    },
                  ]
            }
            size={user?.role === "manager" ? 1.2 : 1.5}
          />
        </Col>
        {/* Closed */}
        <Col
          lg={{ span: 6 }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <StatisticCard
            loading={loading}
            title={"closed"}
            icon={<FaRegTimesCircle />}
            type="success"
            data={[
              {
                value: NumFormatter(
                  localReports?.stages?.total_amount_ClosedWon,
                  true
                ),
              },
            ]}
            size={1.5}
            footer={
              <Progress
                strokeColor={{
                  "0%": "#3d6fe1",
                  "100%": "#00417e",
                }}
                percent={Math.round(
                  (localReports?.stages?.total_amount_ClosedWon /
                    localReports?.statistics?.total_amount) *
                    100
                )}
                status="normal"
              />
            }
          />
        </Col>
        {/* Pipeline  */}
        <Col
          lg={{ span: 6 }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <StatisticCard
            loading={loading}
            title={"Pipeline"}
            icon={<FaRoute />}
            type="primary"
            data={[
              {
                value: NumFormatter(
                  localReports?.statistics?.total_amount -
                    localReports?.categories?.total_amount_Omitted -
                    localReports?.categories?.total_amount_Closed || 0,
                  true
                ),
              },
            ]}
            size={1.5}
            footer={
              <Progress
                strokeColor={{
                  "0%": "#3d6fe1",
                  "100%": "#00417e ",
                }}
                percent={
                  localReports?.statistics?.total_amount > 0
                    ? Math?.round(
                        ((localReports?.statistics?.total_amount -
                          localReports?.categories?.total_amount_Omitted -
                          localReports?.categories?.total_amount_Closed) /
                          localReports?.statistics?.total_amount) *
                          100
                      )
                    : 0
                }
                status="normal"
              />
            }
          />
        </Col>
        {/* gap Coverage */}
        <Col
          lg={{ span: 6 }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <StatisticCard
            loading={loading}
            title={"gap Coverage"}
            icon={<FileDoneOutlined />}
            type="primary"
            data={[
              {
                value: (localReports?.categories?.total_amount_Pipeline /
                  (localReports?.statistics?.total_amount -
                    localReports?.categories?.total_amount_Closed) >
                0
                  ? localReports?.categories?.total_amount_Pipeline /
                    (localReports?.statistics?.total_amount -
                      localReports?.categories?.total_amount_Closed)
                  : 0
                )?.toLocaleString("en-US"),
              },
            ]}
            size={1.5}
          />
        </Col>

        {/* FORECAST Chart */}
        <Col md={{ span: 12, order: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <InfoCard
            icon={false}
            title={
              <>
                <FaChartLine />
                &nbsp;Forecast
              </>
            }
            body={
              <>
                <Row>
                  <Col
                    className={classes.chartInfoInfo}
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <StatisticCard
                      loading={loadingCommit}
                      icon={false}
                      title={"Commit Adj"}
                      type="primary"
                      data={[
                        {
                          value: (
                            <>
                              {NumFormatter(
                                forecastData?.commit?.value ||
                                  forecastData?.commit?.totalvalue ||
                                  0,
                                true
                              )}
                              &nbsp;
                              <FaPencilAlt
                                className={"editButton"}
                                onClick={() => {
                                  updateAdjModel(
                                    "commit",
                                    forecastData?.commit
                                  );
                                }}
                              />
                            </>
                          ),
                        },
                      ]}
                      size={1.5}
                    />
                  </Col>
                  <Col
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                    className={classes.chartInfoInfo}
                  >
                    <StatisticCard
                      loading={loading}
                      icon={false}
                      title={
                        user?.role === "sales"
                          ? "Rollup"
                          : user?.role === "manager" && "Reps Commit"
                      }
                      type="danger"
                      data={[
                        {
                          value: (
                            <>
                              {NumFormatter(
                                user?.role === "sales"
                                  ? localReports?.categories
                                      ?.total_amount_Closed +
                                      localReports?.categories
                                        ?.total_amount_Commit
                                  : repsData?.commit || 0,
                                true
                              )}
                              &nbsp;
                              {user?.role === "manager" && (
                                <InfoCircleOutlined
                                  className="editButton"
                                  onClick={() =>
                                    getRepsCommit(
                                      repsData?.allCommits,
                                      "commit"
                                    )
                                  }
                                />
                              )}
                            </>
                          ),
                        },
                      ]}
                      size={1.5}
                    />
                  </Col>
                  <Col
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <StatisticCard
                      loading={loading}
                      icon={false}
                      title="AI Forecast"
                      type="warning"
                      data={[
                        {
                          value:
                            NumFormatter(
                              aiForecastData?.aiCommit?.ai_commit || 0,
                              true
                            ) || 0,
                        },
                      ]}
                      size={1.5}
                    />
                  </Col>
                  <Divider style={{ margin: 0 }} />
                </Row>

                <LineCharts
                  xTitle={quarterData?.month ? "Day" : "Month"}
                  data={[
                    {
                      name: "Commit",
                      data:
                        forecastChartData?.commit?.length > 0
                          ? forecastChartData?.commit
                          : [],
                    },
                    {
                      name: user?.role === "sales" ? "Rollup" : "Reps",
                      data:
                        user?.role === "sales"
                          ? rollupChartData?.rollupCommit?.length > 0
                            ? rollupChartData?.rollupCommit
                            : []
                          : repsChartData?.commitReps?.length > 0
                          ? repsChartData?.commitReps
                          : [],
                    },
                    {
                      name: "AI Commit",
                      data:
                        aiChartData?.aicommit?.length > 0
                          ? aiChartData?.aicommit
                          : [],
                    },
                    {
                      name: "Target",
                      data:
                        forecastChartData?.target?.length > 0
                          ? forecastChartData?.target
                          : [],
                    },
                  ]}
                  comments={forecastChartData?.comments || []}
                />
              </>
            }
          />
        </Col>
        {/* BEST CASE chart */}
        <Col md={{ span: 12, order: 4 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <InfoCard
            icon={false}
            title={
              <>
                <FaAward />
                &nbsp; Best Case
              </>
            }
            body={
              <div>
                <Row style={{ display: "flex" }}>
                  <Col
                    className={classes.chartInfoInfo}
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <StatisticCard
                      loading={loadingBestCase}
                      icon={false}
                      title={"Best Case Adj"}
                      type="primary"
                      data={[
                        {
                          value: (
                            <>
                              {NumFormatter(
                                forecastData?.bestCase?.value ||
                                  forecastData?.bestCase?.totalvalue ||
                                  0,
                                true
                              )}
                              &nbsp;
                              <FaPencilAlt
                                className={"editButton"}
                                onClick={() =>
                                  updateAdjModel(
                                    "bestcase",
                                    forecastData?.bestCase
                                  )
                                }
                              />
                            </>
                          ),
                        },
                      ]}
                      size={1.5}
                    />
                  </Col>
                  <Col
                    className={classes.chartInfoInfo}
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <StatisticCard
                      loading={loading}
                      icon={false}
                      title={
                        user?.role === "sales"
                          ? "Rollup"
                          : user?.role === "manager" && "Reps Best case"
                      }
                      type="danger"
                      size={1.5}
                      data={[
                        {
                          value: (
                            <>
                              {NumFormatter(
                                user?.role === "sales"
                                  ? localReports?.categories
                                      ?.total_amount_Closed +
                                      localReports?.categories
                                        ?.total_amount_Commit +
                                      localReports?.categories
                                        ?.total_amount_Best_Case
                                  : repsData?.bestCase,
                                true
                              )}
                              &nbsp;
                              {user?.role === "manager" && (
                                <InfoCircleOutlined
                                  className={"editButton"}
                                  onClick={() =>
                                    getRepsCommit(
                                      repsData?.allBestCases,
                                      "bestcase"
                                    )
                                  }
                                />
                              )}
                            </>
                          ),
                        },
                      ]}
                    />
                  </Col>
                  <Col
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <StatisticCard
                      loading={loading}
                      icon={false}
                      title={"AI Best Case"}
                      type="warning"
                      data={[
                        {
                          value: NumFormatter(
                            aiForecastData?.aiBestCase?.ai_best_case || 0,
                            true
                          ),
                        },
                      ]}
                      size={1.5}
                    />
                  </Col>
                  <Divider style={{ margin: 0 }} />
                </Row>

                {forecastChartData?.bestCase?.length > 0 ||
                rollupChartData?.rollupBestCase?.length > 0 ||
                aiChartData?.aibestCase?.length > 0 ||
                repsChartData?.bestcaseReps?.length > 0 ||
                forecastChartData?.target?.length > 0 ? (
                  <LineCharts
                    xTitle={quarterData?.month ? "Day" : "Month"}
                    data={[
                      {
                        name: "Best Case",
                        data:
                          forecastChartData?.bestCase?.length > 0
                            ? forecastChartData?.bestCase
                            : [],
                      },
                      {
                        name: user?.role === "sales" ? "Rollup" : "Reps",
                        data:
                          user?.role === "sales"
                            ? rollupChartData?.rollupBestCase?.length > 0
                              ? rollupChartData?.rollupBestCase
                              : []
                            : repsChartData?.bestcaseReps?.length > 0
                            ? repsChartData?.bestcaseReps
                            : [],
                      },
                      {
                        name: "AI Best Case",
                        data:
                          aiChartData?.aibestCase?.length > 0
                            ? aiChartData?.aibestCase
                            : [],
                      },
                      {
                        name: "Target",
                        data:
                          forecastChartData?.target?.length > 0
                            ? forecastChartData?.target
                            : [],
                      },
                    ]}
                  />
                ) : (
                  <Alert message="No history" />
                )}
              </div>
            }
          ></InfoCard>
        </Col>
      </Row>
    </CollapsedCard>
  );
};

export default ForeCastHealthCheck;
