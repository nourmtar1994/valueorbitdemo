import { Button, Result } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const NoOpportunity = () => {
  return (
    <div align="center" style={{ width: "100%" }}>
      <Result
        status="404"
        title="Deals not be found"
        subTitle=""
        extra={
          <NavLink to={"/deal_intelligence/"}>
            <Button type="primary">Go to deals list {">"} </Button>
          </NavLink>
        }
      />
    </div>
  );
};
export default NoOpportunity;
