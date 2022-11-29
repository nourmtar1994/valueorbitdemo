import { ApartmentOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Button, Col, Row, Statistic, Typography } from "antd";
import React from "react";
import {
  FaBookOpen,
  FaCrosshairs,
  FaFile,
  FaRegTimesCircle,
  FaRoute,
  FaTimes,
} from "react-icons/fa";
import CollapsedCard from "./Components/CollapsedCard/CollapsedCard";
import Slider from "./Components/Slider/Slider";
import StatisticCard from "./Components/StatisticCard/StatisticCard";
import "./Design.css";
import Signup from "./Signup/Signup";

const Design = () => {
  return (
    <>
      <Signup />
      {/* <Col span={6}>
        <StatisticCard
          type={"primary"}
          title={"Target"}
          icon={<FaCrosshairs />}
          data={[{ value: "100.0K" }]}
        />
      </Col>
      <Col span={6}>
        <StatisticCard
          type={"primary"}
          title={"CLOSED"}
          icon={<FaRegTimesCircle />}
          data={[{ value: "10.0K" }]}
        />
      </Col>
      <Col span={6}>
        <StatisticCard
          type={"primary"}
          title={"PIPELINE"}
          icon={<FaRoute />}
          data={[{ value: "97.5K" }]}
        />
      </Col>
      <Col span={6}>
        <StatisticCard
          type={"primary"}
          title={"GAP COVERAGE"}
          icon={<FileDoneOutlined />}
          data={[{ value: "0.077" }]}
        />
      </Col> */}
    </>
  );
  {
    /* <Col span={6}>
        <StatisticCard
          type={"secondary"}
          title={"Target"}
          icon={<FaCrosshairs />}
          data={[{ value: "10.0K" }]}
        />
      </Col>
      <Col span={6}>
        <StatisticCard
          type={"danger"}
          title={"Target"}
          icon={<FaCrosshairs />}
          data={[{ value: "10.0K" }]}
        />
      </Col>
      <Col span={6}>
        <StatisticCard
          type={"warning"}
          title={"Target"}
          icon={<FaCrosshairs />}
          data={[{ value: "10.0K" }]}
        />
      </Col>{" "}
      <Col span={6}>
        <StatisticCard
          type={"info"}
          title={"Target"}
          icon={<FaCrosshairs />}
          data={[{ value: "10.0K" }]}
        />
      </Col>
      <Col span={6}>
        <StatisticCard
          type={"primary"}
          title={"Target"}
          icon={<FaCrosshairs />}
          data={[{ value: "10.0K" }]}
        />
      </Col>
      <Col span={6}>
        <StatisticCard
          type={"success"}
          title={"Target"}
          icon={<FaCrosshairs />}
          data={[{ value: "10.0K" }]}
        />
      </Col> */
  }
};

export default Design;
