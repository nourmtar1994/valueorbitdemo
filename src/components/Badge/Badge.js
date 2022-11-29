import React, { useEffect, useState } from "react";
import {
  DownSquareTwoTone,
  LineChartOutlined,
  UpSquareTwoTone,
} from "@ant-design/icons";
import * as classes from "./badge.module.css";
import { Card, Tag } from "antd";
import Loader from "./Loader/Loader";

const Badge = (props) => {
  let {
    color,
    size = 80,
    icon = false,
    title = false,
    hoverable = false,
    align,
    action,
    loading,
    extra = false,
    count = null,
    open = true,
  } = props;

  const [collapse, setCollapse] = useState(open);

  useEffect(() => {
    setCollapse(open);
  }, [open]);

  /*
   *********color set*********
   */

  const badgeColor =
    color === "danger"
      ? classes.customDangerBadge
      : color === "success"
      ? classes.customSuccessBadge
      : color === "primary"
      ? classes.customPrimaryBadge
      : classes.customWarningBadge;
  /*
   *********color position*********
   */

  const [postion, setPostion] = useState(
    align === "right"
      ? {
          top: "-20px",
          right: "20px",
        }
      : {
          top: "-20px",
          left: "20px",
        }
  );
  /*
   *********color set*********
   */
  const badgeSize = {
    width: size,
    height: size,
    fontSize: size / 2 - 5 + "px",
    ...postion,
  };

  /*
   *********color set*********
   */
  const MouseEnterEffect = () => {
    hoverable &&
      setPostion({
        ...postion,
        top: "-50px",
      });
  };

  const MouseLeaveEffect = () => {
    hoverable &&
      setPostion({
        ...postion,
        top: "-20px",
      });
  };

  return (
    <Card
      extra={extra}
      className={classes.card}
      bordered={false}
      title={
        title ? (
          <div className={classes.CardHeader}>
            <div className={classes.collapseButton}>
              {collapse ? (
                <UpSquareTwoTone
                  twoToneColor={"#0a6cc9"}
                  className={classes.collapseIcon}
                  onClick={() => setCollapse(false)}
                />
              ) : (
                <DownSquareTwoTone
                  style={{ color: "#00417e85" }}
                  className={classes.collapseIcon}
                  onClick={() => setCollapse(true)}
                  twoToneColor={"#0a6cc9"}
                />
              )}
            </div>
            <label
              className={classes.CardHeader}
              style={
                align === "right" ? { marginRight: "90px" } : { marginRight: 0 }
              }
            >
              {title}
            </label>
            &nbsp;
            {count && <Tag color="#01417e">{count}</Tag>}
            {action?.map((item, key) => (
              <b key={key} style={{ float: "left" }}>
                {item}
              </b>
            ))}
          </div>
        ) : (
          false
        )
      }
      hoverable={hoverable}
      onMouseEnter={() => MouseEnterEffect()}
      onMouseLeave={() => MouseLeaveEffect()}
      bodyStyle={!collapse ? { display: "none" } : {}}
    >
      {icon && (
        <div
          className={`${classes.customBadge} ${badgeColor}`}
          style={{ ...badgeSize }}
        >
          {icon ? icon : <LineChartOutlined />}
        </div>
      )}

      {loading ? <Loader /> : props.children}
    </Card>
  );
};
export default Badge;
