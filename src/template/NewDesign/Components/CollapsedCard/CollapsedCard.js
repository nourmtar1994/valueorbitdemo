import { DownSquareTwoTone, UpSquareTwoTone } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaExpand, FaMinus, FaPlus, FaRedoAlt } from "react-icons/fa";
import Loader from "../../../../components/Badge/Loader/Loader";

import * as classes from "./CollapsedCard.module.css";
// const collapsedStyle = {
//   hide: { height: 0, overflow: "hidden" },
//   show: { height: "auto", overflow: "hidden" },
// };
const CollapsedCard = ({
  children,
  extra,
  title,
  collapsable = true,
  bodyColor = "transparent",
  description = [],
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [show, setShow] = useState(true);

  const reload = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 500);
  };

  return (
    <div id={title} className={classes.collapseCard}>
      <Row className={classes.header + " " + (!collapsed && classes.bordred)}>
        <Col className={classes.title} xs={{ span: 20 }}>
          <Space>
            <Typography.Title level={4} ellipsis>
              {title}
            </Typography.Title>
            {description?.map((item, index) => (
              <Typography.Text
                key={index}
                ellipsis
                className="textDescription "
              >
                . {item?.title} :{" "}
                <span className="textDescriptionX2 text-bold">
                  {item?.value}
                </span>
              </Typography.Text>
            ))}
          </Space>
        </Col>
        <div className={classes.options} align="right">
          {collapsed ? (
            <FaMinus
              onClick={() => setCollapsed(!collapsed)}
              className="action-icon"
            />
          ) : (
            <FaPlus
              onClick={() => setCollapsed(!collapsed)}
              className="action-icon"
            />
          )}
          <FaRedoAlt onClick={() => reload()} className="action-icon" />
          <FaExpand
            onClick={() => document.getElementById(title)?.requestFullscreen()}
            className="action-icon"
          />
        </div>
      </Row>

      <div
        className={classes.body}
        style={{ background: bodyColor }}
        hidden={!collapsed}
      >
        {show ? (
          children
        ) : (
          <div style={{ background: "#fff" }}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsedCard;
