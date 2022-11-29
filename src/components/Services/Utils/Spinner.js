import { Spin } from "antd";
import React from "react";

const style = {
  width: "100%",
  margin: "20px 0",
  marginBottom: "20px",
  padding: "30px 50px",
  textAlign: "center",
  //   background: "rgba(0, 0, 0, 0.05)",
  borderRradius: "4px",
};
const Spinner = () => {
  return (
    <div style={style}>
      <Spin />
    </div>
  );
};

export default Spinner;
