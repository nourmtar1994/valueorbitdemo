import { Skeleton } from "antd";
import React from "react";
import "./Statistic.css";
// const data = [
//     {
//       title: "Pipline",
//       value: "130.0k",
//     },
//     {
//       title: "Target",
//       value: "10.0k",
//     },
//   ];
//   const title = ""
//   const icon = <FaCrosshairs />;
// types  : info - success -

const types = {
  primary: "badge-primary",
  success: "badge-success",
  info: "badge-info",
  danger: "badge-danger",
  warning: "badge-warning",
  secondary: "badge-secondary",
};
const StatisticCard = ({
  title,
  data,
  icon,
  type = "secondary",
  loading = false,
  size = 1,
}) => {
  return (
    <div className={"card " + types[type]}>
      {data?.[0] && (
        <div className="card-body">
          <div className="media-body">
            <span className={"title"}>{title}</span>
            <div>
              {loading ? (
                <Skeleton.Input active size="small" />
              ) : (
                <h3 style={{ fontSize: size + "em" }}>{data?.[0]?.value}</h3>
              )}
            </div>
            <label className="textInfo">{data?.[0]?.title}</label>
          </div>
        </div>
      )}
      {data?.[1] && (
        <div className="card-body">
          <div className="media-body">
            <span> &nbsp;</span>

            <h3 style={{ fontSize: size + "em" }}>
              {loading ? (
                <Skeleton.Input active size="small" />
              ) : (
                data?.[1]?.value
              )}
            </h3>

            <label className="textInfo">{data?.[1]?.title}</label>
          </div>
        </div>
      )}
      {icon && <div className="badge">{icon}</div>}
    </div>
  );
};

export default StatisticCard;
