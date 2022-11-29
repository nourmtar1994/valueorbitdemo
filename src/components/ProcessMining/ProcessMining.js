import { Col, Row } from "antd";
import React from "react";
import Badge from "../Badge/Badge";

const ProcessMining = ({ open = true }) => {
  return (
    <Badge open={open} title={"Process Mining"}>
      <Row gutter={[30, 15]}>
        <Col span={24}>
          <iframe
            style={{ border: "none" }}
            width={"100%"}
            height={"500px"}
            src="process_mining.html"
          ></iframe>
        </Col>
      </Row>
    </Badge>
  );
};

export default ProcessMining;
