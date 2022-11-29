import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import * as classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loadingContainer}>
      <Loading3QuartersOutlined className={classes.loadingIcon} spin /> &nbsp;
      &nbsp;
      <br></br>
      <Typography.Text style={{ color: "#00417e" }}>
        Loading ...
      </Typography.Text>
    </div>
  );
};
export default Loader;
