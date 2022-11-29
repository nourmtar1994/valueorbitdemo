//REACT COMPONENTS
import React, { useEffect, useState } from "react";
//ANT DESIGN COMPONENTS
import { Col, Drawer, Row, Typography } from "antd";
//CSS FILE
import * as classes from "./Status.module.css";
//ICONS
import { CloseOutlined, ScheduleOutlined } from "@ant-design/icons";

const drawerStyle = {
  background:
    "linear-gradient(45deg, rgb(32 32 33) 0%, rgb(78, 188, 228) 100%)",
  color: "#fff",
  overflow: "hidden",
  padding: "8px",
};
const Status = ({ setShow }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setShow();
  }, [visible]);
  return (
    <>
      <button
        className={classes.show_hide_btn}
        onClick={() => setVisible(!visible)}
      >
        <ScheduleOutlined />
      </button>
      {/* show && ' show' */}
      <Drawer
        height={70}
        closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
        bodyStyle={drawerStyle}
        placement={"bottom"}
        closable={false}
        onClose={() => setVisible(!visible)}
        visible={visible}
        mask={false}
      >
        <Row>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <div className={classes.statistic}>
              <div className={classes.quota}>
                <p>Quota</p>
                <span>$9.000.000</span>
              </div>
              <div className={classes.commit}>
                <p>Commit</p>
                <span>9.000.000</span>
              </div>
            </div>
            {/* cardData.quota */}
          </Col>

          <Col md={{ span: 6 }} xs={{ span: 24 }} align="center">
            <Typography.Title level={5} style={{ color: " #fff" }}>
              H&M
            </Typography.Title>
            <Typography style={{ color: " silver" }}>
              Reshaping customer services
            </Typography>
          </Col>

          <Col md={{ span: 6 }} xs={{ span: 24 }} align="center">
            <Typography.Title level={5} style={{ color: " #fff" }}>
              Best Case
            </Typography.Title>
          </Col>

          <Col md={{ span: 6 }} xs={{ span: 24 }} align="center">
            <Typography.Title level={5} style={{ color: " #fff" }}>
              4 Solution Validation
            </Typography.Title>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default Status;
