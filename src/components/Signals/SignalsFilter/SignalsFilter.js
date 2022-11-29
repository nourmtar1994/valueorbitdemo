import React from "react";
//ant design components
import { Col, Input, Row } from "antd";

//Style
import * as classes from "./SignalsFilter.module.css";

const SignalsFilter = ({ searchSignals }) => {
  return (
    <Row gutter={[10, 30]} className={classes.filterContainer}>
      <Col
        xs={{ span: 12 }}
        sm={{ span: 8 }}
        md={{ span: 8 }}
        lg={{ span: 6 }}
      ></Col>
      <Col
        xs={{ span: 12 }}
        sm={{ span: 8 }}
        md={{ span: 8 }}
        lg={{ span: 6 }}
      ></Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 8 }}
        md={{ span: 8 }}
        lg={{ span: 8, offset: 4 }}
      >
        <Input
          placeholder="Search ..."
          className="radiusInput"
          // onChange={(e) => searchSignals(e.target.value)}
        />
      </Col>
    </Row>
  );
};

export default SignalsFilter;
