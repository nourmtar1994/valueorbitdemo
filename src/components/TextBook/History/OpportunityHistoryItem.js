import {
  CheckCircleFilled,
  CloseCircleFilled,
  DislikeOutlined,
  LikeOutlined,
  MinusCircleFilled,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Col, Row, Timeline, Tooltip, Typography } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment-timezone";
import React, { useState, useEffect } from "react";

import {
  FaChessQueen,
  FaCalendarTimes,
  FaDollarSign,
  FaLayerGroup,
  FaShapes,
  FaStepForward,
  FaBookOpen,
  FaCommentDots,
} from "react-icons/fa";
const icons = {
  UpdateAmount: <FaDollarSign className={"icon_secondary"} />,
  UpdateStage: <FaLayerGroup className={"icon_secondary"} />,
  UpdateForecastCategory: <FaShapes className={"icon_secondary"} />,
  UpdateNextStep: <FaStepForward className={"icon_secondary"} />,
  updateCloseDate: <FaCalendarTimes className={"icon_secondary"} />,
  UpdatePlaybook: <FaBookOpen />,
};

const managerStatus = [
  <DislikeOutlined className={"icon_danger"} />,
  <MinusCircleOutlined className={"icon_warning"} />,
  <LikeOutlined className={"icon_success"} />,
];
const managerStatusText = ["To Be Reviewed", "To Be Completed", "Validated"];
const salesStatusText = ["Not Done", "In progress", "Done"];
const salesStatus = [
  <CloseCircleFilled className={"icon_danger"} />,
  <MinusCircleFilled className={"icon_warning"} />,
  <CheckCircleFilled className={"icon_success"} />,
];

const OpportunityHistoryItem = ({
  opportunity,
  opportunities,
  data,
  newUpdates,
}) => {
  const [opportunityHistory, setOpportunityHistory] = useState(null);
  const [user, setUser] = useState(JSON.parse(Cookies.get("VO_USER_AUTH")));

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  useEffect(() => {
    data &&
      setOpportunityHistory(
        data?.reduce(
          (a, c) => (
            (a[c?.opportunityid] = (a[c?.opportunityid] || [])?.concat(c)), a
          ),
          {}
        )
      );
  }, [data]);

  const getOpportunityHistory = async () => {
    try {
      const { data } = await axios.get(
        "/redshift/opportunityhistorylog/byoppo/" +
          opportunity?.values?.idorigin
      );
      if (data?.success) {
        setOpportunityHistory({
          [opportunity?.values?.idorigin]: data?.data
            ?.filter((item) => item?.createdbyid === user?.originId)
            ?.sort((a, b) => moment(b?.createddate) - moment(a?.createddate)),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newUpdates && opportunity && getOpportunityHistory();
  }, [newUpdates]);

  useEffect(() => {
    opportunity
      ? setOpportunityHistory({
          [opportunity?.values?.idorigin]:
            opportunityHistory?.[opportunity?.values?.idorigin],
        })
      : setOpportunityHistory(
          data?.reduce(
            (a, c) => (
              (a[c?.opportunityid] = (a[c?.opportunityid] || [])?.concat(c)), a
            ),
            {}
          )
        );
  }, [opportunity]);

  const getOpportunityName = (opportunityId) => {
    return opportunities?.filter(
      (item) => item?.idorigin === opportunityId
    )?.[0];
  };

  const statusRenderDom = (target, value) => {
    if (target === "salesfeel") {
      return (
        <Tooltip title={salesStatusText[value]}>{salesStatus[value]}</Tooltip>
      );
    }
    if (target === "manageropinion") {
      return (
        <Tooltip title={managerStatusText[value]}>
          {managerStatus[value]}
        </Tooltip>
      );
    }
    if (target === "text") {
      return (
        <Tooltip title={"Message: " + value}>
          <FaCommentDots />
        </Tooltip>
      );
    }
    return <FaBookOpen />;
  };

  const TimelineRender = () => {
    var opportunityTimeLines = null;
    if (opportunityHistory) {
      opportunityTimeLines = Object.keys(opportunityHistory).map((key) => {
        return (
          key !== "null" && (
            <React.Fragment key={key}>
              <Col span={23} offset={1}>
                <Typography.Link level={5} className="textWarning">
                  <FaChessQueen alignmentBaseline="baseline" size={14} />{" "}
                  {getOpportunityName(key)?.name}
                </Typography.Link>
              </Col>
              <Col span={22} offset={2}>
                <Timeline style={{ marginTop: "10px" }} mode={"left"}>
                  {opportunityHistory?.[key]?.map((item, index) => (
                    <Timeline.Item
                      dot={
                        item?.description === "UpdatePlaybook"
                          ? statusRenderDom(item?.resourcetype, item?.newvalue)
                          : icons[item?.description]
                      }
                      style={{ paddingBottom: 0 }}
                      key={"update" + index}
                    >
                      {item?.description === "UpdatePlaybook" ? (
                        <>{item?.resource}</>
                      ) : (
                        <>
                          <b>{item?.description?.replace("Update", "")}</b> (
                          {item?.lastvalue}) changed to
                          <b> {item?.newvalue} </b> .
                        </>
                      )}
                      {
                        <label className="textDescription">
                          {moment(item?.createddate).format("ll")}
                        </label>
                      }
                      {console.log(item)}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Col>
            </React.Fragment>
          )
        );
      });
    }

    return opportunityTimeLines;
  };
  return (
    <Row style={{ marginTop: "-13px" }} gutter={[10, 0]}>
      {TimelineRender()}
    </Row>
  );
};

export default OpportunityHistoryItem;
