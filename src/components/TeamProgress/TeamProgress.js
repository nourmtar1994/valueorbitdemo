import React, { useEffect, useState } from "react";
//Cookies
import Cookies from "js-cookie";
//ant design components
import {
  Avatar,
  Card,
  Col,
  Comment,
  Empty,
  Popover,
  Progress,
  Row,
  Spin,
  Table,
  Tag,
  Tooltip,
} from "antd";
import axios from "axios";
import BarStatistic from "../BarStatistic/BarStatistic";
import moment from "moment";
import { NumFormatter } from "../Services/Utils/Utils";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegHandPointer, FaSadCry, FaWifi } from "react-icons/fa";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import { LoadingOutlined } from "@ant-design/icons";

export const TeamProgress = ({ open, salesInformation }) => {
  const forecastParametres = useSelector((state) => state?.forecastParametres);
  const [quarterData, setQuarterData] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (forecastParametres) {
      setQuarterData({
        year: forecastParametres?.fiscalyear?.value,
        quarter: forecastParametres?.fiscalquarter?.value,
        month: forecastParametres?.fiscalmonth?.value,
      });
    }
  }, [forecastParametres]);

  useEffect(() => {
    user === null && setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  //States

  const [barItems, setbarItems] = useState([
    {
      title: "Below track",
      percent: 0,
      color: "#7fa3d1",
    },
    {
      title: "On track",
      percent: 0,
      color: "#1a73e8",
    },
    {
      title: "Above track",
      percent: 0,
      color: "#00417e",
    },
  ]);
  const [signalsContent, setSignalsContent] = useState([]);
  const [loadingSignals, setLoadingSignals] = useState(false);
  const [actionsContent, setActionsContent] = useState([]);
  const [loadingActions, setLoadingActions] = useState(false);
  const opportunities = useSelector(
    (state) => state.opportunity?.filtredList || []
  );

  const salesusers = useSelector((state) => state?.sales?.data || []);
  //Get user from cookies

  //get team informations
  const reduceSales = (target, userid, isavege = false) => {
    let count = 0;
    if (opportunities?.length === 0) {
      return 0;
    }
    opportunities
      ?.filter((oppo) => oppo?.salesuser?._id === userid)
      ?.forEach((item) => {
        count = count + item[target];
      });
    return isavege ? count / opportunities?.length || 0 : count;
  };

  const pipelineSales = (target, userid) => {
    let totalAmount = 0;
    if (opportunities?.length === 0) {
      return 0;
    }
    opportunities
      ?.filter((oppo) => oppo?.salesuser?._id === userid)
      ?.forEach((item) => {
        item?.forecastcategoryname === target &&
          (totalAmount = totalAmount + item?.amount);
      });
    return totalAmount;
  };

  useEffect(() => {
    salesusers?.length > 0 && quarterData && getTeamInformation();
    // salesusers?.length > 0 && getTeamInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salesusers, quarterData]);

  useEffect(() => {
    let bellowTrack = 0;
    let ontrack = 0;
    let abovetrack = 0;

    data?.forEach((item) => {
      if ((item?.progress + item?.coaching) / 2 <= 30) {
        bellowTrack = bellowTrack + 1;
      } else if (
        (item?.progress + item?.coaching) / 2 > 30 &&
        (item?.progress + item?.coaching) / 2 <= 60
      ) {
        ontrack = ontrack + 1;
      } else {
        abovetrack = abovetrack + 1;
      }
    });

    setbarItems([
      {
        title: "Below track",
        percent: (bellowTrack / data?.length) * 100,
        color: "#7fa3d1",
      },
      {
        title: "On track",
        percent: (ontrack / data?.length) * 100,

        color: "#1a73e8",
      },
      {
        title: "Above track",
        percent: (abovetrack / data?.length) * 100,
        color: "#00417e",
      },
    ]);
  }, [data]);

  const getTeamInformation = async () => {
    setLoading(true);
    let link = "/teamprogress";
    if (user?.id) {
      link += "?createdbyid=" + user?.id + "&periodtype=monthly";
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
      const { data } = await axios?.get(link);
      let newData = [];
      setLoading(false);
      if (data?.success) {
        salesusers?.forEach((item, index) => {
          newData.push({
            id: item?._id,
            team: item?.firstname + " " + item?.lastname,
            coaching: reduceSales("dealcoaching", item?._id, true),
            progress: reduceSales("dealprogress", item?._id, true),
            target: data?.repsSalesTarget?.[index][0]?.value || 0,
            bestcase: data?.repsSalesForecastBestCase?.[index][0]?.value || 0,
            commitAdj: data?.repsSalesForecastCommit?.[index][0]?.value || 0,

            closed: pipelineSales("Closed", item?._id),
            commit: pipelineSales("Commit", item?._id),
            // aiCommit: salesInformation?.aibestCase || 0,
            // aibestCase: salesInformation?.aiforecast || 0,
          });
        });
      }

      setData(newData);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //SIGNALS & ACTIONS for teams
  const getTeamSignals = async (id) => {
    if (id !== signalsContent?.id) {
      setSignalsContent([]);
      setLoadingSignals(true);
      try {
        const { data } = await axios?.get("/signal_mr/sales/go/" + id);
        if (data?.success) {
          setSignalsContent({
            id: id,
            data: data?.data?.sort(
              (a, b) => moment(b?.createddate) - moment(a?.createddate)
            ),
          });
        }
        setLoadingSignals(false);
      } catch (error) {
        console.log(error);
        setLoadingSignals(false);
      }
    }
  };
  const signalsContentRender = () => {
    return (
      <Spin
        size="large"
        spinning={loadingSignals}
        indicator={<LoadingOutlined spin />}
      >
        <div style={{ minHeight: "100px", width: "100%" }}>
          {signalsContent?.data?.length > 0
            ? signalsContent?.data?.map((item, index) => (
                <Comment
                  dataSource={signalsContent?.data}
                  // actions={actions}
                  // author={<a>Han Solo</a>}
                  avatar={
                    <Avatar
                      size={17}
                      style={{ backgroundColor: "#00417e" }}
                      shape="square"
                    >
                      {index + 1}
                    </Avatar>
                  }
                  content={
                    <>
                      <p>{item?.signal}</p>

                      <Tooltip title={moment(item?.createddate)?.format("ll")}>
                        <span className="textDescription">
                          {moment(item?.createddate)?.fromNow()}
                        </span>
                      </Tooltip>
                    </>
                  }

                  // content={<Typography.Text>{item.signal}</Typography.Text>}
                  // datetime={
                  //   <Tooltip title={item?.createddate}>
                  //     <span>{moment(item?.createddate).fromNow()}</span>
                  //   </Tooltip>
                  // }
                />
              ))
            : loadingSignals === false && (
                <div style={{ width: "100%", textAlign: "center" }}>
                  <p align="center">
                    <br />
                    <FaSadCry className="textDescriptionX2" size={50} />
                    <br />
                    Not found signals
                  </p>
                </div>
              )}
        </div>
      </Spin>
    );
  };
  const getTeamActions = async (id) => {
    if (id !== actionsContent?.id) {
      setActionsContent([]);
      setLoadingActions(true);
      try {
        const { data } = await axios?.get("/action_mr/sales/go/" + id);
        if (data?.success) {
          setActionsContent({
            id: id,
            data: data?.data?.sort(
              (a, b) => moment(b?.createddate) - moment(a?.createddate)
            ),
          });
        }
        setLoadingActions(false);
      } catch (error) {
        console.log(error);
        setLoadingActions(false);
      }
    }
  };
  const actionsContentRender = () => {
    return (
      <Spin
        size="large"
        spinning={loadingActions}
        indicator={<LoadingOutlined spin />}
      >
        <div style={{ minHeight: "100px", width: "100%" }}>
          {actionsContent?.data?.length > 0
            ? actionsContent?.data?.map((item, index) => (
                <Comment
                  // actions={actions}
                  // author={<a>Han Solo</a>}
                  avatar={
                    <Avatar
                      size={17}
                      style={{ backgroundColor: "#00417e" }}
                      shape="square"
                    >
                      {index + 1}
                    </Avatar>
                  }
                  content={
                    <>
                      <p>{item?.action}</p>

                      <Tooltip title={moment(item?.createddate)?.format("ll")}>
                        <span className="textDescription">
                          {moment(item?.createddate)?.fromNow()}
                        </span>
                      </Tooltip>
                    </>
                  }

                  // content={<Typography.Text>{item.signal}</Typography.Text>}
                  // datetime={
                  //   <Tooltip title={item?.createddate}>
                  //     <span>{moment(item?.createddate).fromNow()}</span>
                  //   </Tooltip>
                  // }
                />
              ))
            : loadingActions === false && <Empty />}
        </div>
      </Spin>
    );
  };
  const getPerformance = (record) => {
    let result =
      (record?.target -
        (record?.commit * 2 + record?.closed + record?.aiCommit)) /
        record?.target || 0;
    if (result > 0) {
      return "On track";
    }
    if (result <= 0) {
      return "Below track";
    }
  };
  //Table comumns
  const columns = [
    {
      title: "Team",
      key: "team",
      render: (row) => (
        <NavLink
          className={"text-capitalize"}
          to={"/forecastintelligence/" + row?.id}
          exact
          key={1}
        >
          <b>{row?.team}</b>
        </NavLink>
      ),
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      render: (text) => NumFormatter(text, true),
    },
    {
      title: "Commit Adj",
      dataIndex: "commitAdj",
      key: "commit",
      render: (text) => NumFormatter(text, true),
    },
    {
      title: "Best Case",
      dataIndex: "bestcase",
      key: "bestcase",
      render: (text) => NumFormatter(text, true),
    },
    // {
    //   title: "AI Forecast",
    //   key: "forecast",
    //   dataIndex: "forecast",
    // },
    // {
    //   title: "Closed",
    //   key: "booked",
    //   dataIndex: "booked",
    // },
    // {
    //   title: "Pipeline Gap",
    //   key: "pipeline_gap",
    //   dataIndex: "pipeline_gap",
    // },

    {
      title: "Progress",
      key: "qualification_score",
      dataIndex: "progress",
      render: (progress) => (
        <Progress
          strokeColor={[
            "#f74b49 ",
            "#f74b49 ",
            "#fb8c00",
            "#43a047",
            "#43a047",
          ]}
          strokeWidth={7}
          percent={Math.round(progress)}
          steps={5}
        />
      ),
    },
    {
      title: "Coaching",
      key: "Coaching",
      dataIndex: "coaching",
      render: (coaching) => (
        <Progress
          strokeColor={[
            "#f74b49 ",
            "#f74b49 ",
            "#fb8c00",
            "#43a047",
            "#43a047",
          ]}
          strokeWidth={7}
          percent={Math.round(coaching)}
          steps={5}
        />
      ),
    },
    {
      title: "Performance",
      key: "PERFORMANCE",
      render: (record) => <>{getPerformance(record)}</>,
    },
    {
      title: "Signals / Actions",
      key: "signals_actions",
      width: 150,
      render: (row) => (
        <div
          align="center"
          style={{ display: "flex", width: "fit-content", margin: "auto" }}
        >
          <Popover
            overlayStyle={{ maxHeight: "300px", width: "350px" }}
            overlayInnerStyle={{ maxHeight: "300px", overflow: "auto" }}
            onOpenChange={(e) => e && getTeamSignals(row?.id)}
            trigger={["click"]}
            placement="leftTop"
            content={signalsContentRender}
          >
            <Tag color="green">
              <FaWifi cursor={"pointer"} />
            </Tag>
          </Popover>
          <Popover
            overlayStyle={{ maxHeight: "300px", width: "350px" }}
            overlayInnerStyle={{ maxHeight: "300px", overflow: "auto" }}
            onOpenChange={(e) => e && getTeamActions(row?.id)}
            trigger={["click"]}
            placement="leftTop"
            content={actionsContentRender}
          >
            <Tag color="blue">
              <FaRegHandPointer cursor={"pointer"} />
            </Tag>
          </Popover>
        </div>
      ),
    },
  ];

  return (
    <CollapsedCard title={"Team Performance"} bodyColor="#fff">
      <Row gutter={[30, 15]}>
        <Col span={24}>
          <Card>
            <BarStatistic statistic items={barItems} />
            <Table
              loading={loading}
              scroll={{ x: 800 }}
              tableLayout="auto"
              size="small"
              columns={columns}
              rowKey="id"
              // expandable={
              //   user?.role === "admin"
              //     ? {
              //         expandedRowRender: (record) => (
              //           <p style={{ margin: 0 }}>{"filtred data"}</p>
              //         ),
              //         rowExpandable: (record) => record.name !== "Not Expandable",
              //       }
              //     : false
              // }
              dataSource={data}
            />
          </Card>
        </Col>
      </Row>
    </CollapsedCard>
  );
};
