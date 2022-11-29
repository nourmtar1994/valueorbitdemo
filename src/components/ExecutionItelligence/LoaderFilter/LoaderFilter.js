import { LoadingOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import * as classes from "./LoaderFilter.module.css";
const LoaderFilter = () => {
  return (
    <div className={classes.loaderFilterContainer}>
      <Typography>
        <Typography.Paragraph type="secondary" align="center" strong>
          <LoadingOutlined style={{ color: "#00417e", fontSize: "2em" }} />
          <br />
          <br />
          Filter processing
          <br />
        </Typography.Paragraph>
      </Typography>
    </div>
  );
};
export default LoaderFilter;
