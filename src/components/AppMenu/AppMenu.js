import React from "react";
import * as classes from "./AppMenu.module.css";
import { RightOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { NavLink } from "react-router-dom";
const AppMenu = ({ icon = null, title = null, link }) => {
  return (
    <div className={classes.container}>
      <Col>
        <div className={classes.icon}>{icon}</div>
      </Col>
      <Col xs={{ span: 20 }} sm={{ span: 22 }} md={{ span: 23 }}>
        <NavLink to={link || "#"}>
          <div className={classes.title}>{title}</div>
        </NavLink>
      </Col>
      <Col xs={{ span: 4 }} sm={{ span: 2 }} md={{ span: 1 }} align="left">
        <NavLink to={link || "#"}>
          <div className={classes.arrowRight}>
            <RightOutlined />
          </div>
        </NavLink>
      </Col>
    </div>
  );
};

export default AppMenu;
