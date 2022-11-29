import { Col, Row, Skeleton } from "antd";
import React from "react";
import Table from "../Skeleton/Table";
import XYChart from "../Skeleton/XYchart";

export const SkeletonLoader = () => {
  return (
    <Row gutter={[30, 30]}>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Skeleton loading={true}></Skeleton>
      </Col>

      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Skeleton loading={true}></Skeleton>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Skeleton loading={true}></Skeleton>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Skeleton loading={true}></Skeleton>
      </Col>

      <Col span={24}>
        <Skeleton active />
      </Col>
      <Col span={24}>
        <XYChart />
        {/* <Result
            status="warning"
            title="There are some problems with your operation."
            extra={
              <Button type="primary" key="console">
                Go to opportunities
              </Button>
            }
          /> */}
      </Col>
      <Col span={24}>
        <Table />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Col>
    </Row>
  );
};
