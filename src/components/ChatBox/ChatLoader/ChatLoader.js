import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import * as classes from "./ChatLoader.module.css";

const ChatLoader = () => {
  return (
    <div className={classes.loadingContainer}>
      <Loading3QuartersOutlined className={classes.loadingIcon} spin /> &nbsp;
      &nbsp;
      <br></br>
      <Typography.Text type="secondary">Loading ...</Typography.Text>
    </div>
  );
};
export default ChatLoader;
