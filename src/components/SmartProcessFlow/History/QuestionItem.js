import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Col, Row, Timeline, Tooltip, Typography } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DislikeOutlined,
  LikeOutlined,
  MinusCircleFilled,
  MinusCircleOutlined,
} from "@ant-design/icons";

import * as classes from "./History.module.css";
import moment from "moment";
import { FaCommentDots, FaDotCircle, FaEllipsisV } from "react-icons/fa";

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

const QuestionItem = ({ questions }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  const questionStatus = (item) => {
    let status = null;
    if (user?.role === "manager") {
      status = salesStatus[item?.salesfeel];
    } else if (user?.role === "sales") {
      status = managerStatus[item?.manageropinion];
    }
    return status;
  };

  const messageRenderer = (message) => {
    let messageDom = null;
    if (message?.type === "salesfeel") {
      messageDom = <>{salesStatusText[message?.value]}</>;
    }
    if (message?.type === "manageropinion") {
      messageDom = <>{managerStatusText[message?.value]}</>;
    }
    if (message?.type === "text") {
      messageDom = <> {message?.value} </>;
    }
    if (message?.type === "option") {
      messageDom = <Typography.Link>@ {message?.value}</Typography.Link>;
    }
    return (
      <div className={classes.message}>
        {messageDom}
        {" . "}

        <span className={classes.dateMessage}>
          <Tooltip
            className="textDescription"
            title={moment(message?.createddate).format("YYYY-MM-DD HH:mm:ss")}
          >
            <span>{moment(message?.createddate).fromNow()}</span>
          </Tooltip>
        </span>
      </div>
    );
  };

  const dotRenderer = (message) => {
    let dotDom = <FaDotCircle className={classes.icon_primary} />;
    if (message?.type === "salesfeel") {
      dotDom = salesStatus[message?.value];
    }
    if (message?.type === "manageropinion") {
      dotDom = managerStatus[message?.value];
    }

    if (message?.type === "text") {
      dotDom = <FaCommentDots className={classes.icon_primary} />;
    }

    if (message?.type === "option") {
      dotDom = <FaEllipsisV className={classes.icon_info} />;
    }

    return dotDom;
  };

  return (
    <Row style={{ marginTop: "-13px" }} gutter={[10, 10]}>
      {questions?.map((item, index) => (
        <React.Fragment key={index}>
          <Col span={23} offset={1}>
            <Typography.Link level={5} className="textBlack">
              {index + 1 + " - "}
              {item?.name}{" "}
            </Typography.Link>
            {questionStatus(item)}
          </Col>
          <Col span={22} offset={2}>
            <Timeline mode={"left"}>
              {item?.messages
                ?.sort(
                  (a, b) => moment(b?.createddate) - moment(a?.createddate)
                )
                ?.map((message, j) => (
                  <Timeline.Item
                    dot={dotRenderer(message)}
                    key={j}
                    style={{ paddingBottom: 0 }}
                  >
                    {messageRenderer(message)}
                  </Timeline.Item>
                ))}
            </Timeline>
          </Col>
        </React.Fragment>
      ))}
    </Row>
  );
};

export default QuestionItem;
