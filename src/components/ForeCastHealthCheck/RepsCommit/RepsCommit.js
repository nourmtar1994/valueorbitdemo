import { Col, Divider, Row } from "antd";
import React from "react";

//CSS
import * as classes from "./RepsCommit.module.css";
const months = [
  {
    abbreviation: "Jan",
    name: "January",
  },
  {
    abbreviation: "Feb",
    name: "February",
  },
  {
    abbreviation: "Mar",
    name: "March",
  },
  {
    abbreviation: "Apr",
    name: "April",
  },
  {
    abbreviation: "May",
    name: "May",
  },
  {
    abbreviation: "Jun",
    name: "June",
  },
  {
    abbreviation: "Jul",
    name: "July",
  },
  {
    abbreviation: "Aug",
    name: "August",
  },
  {
    abbreviation: "Sep",
    name: "September",
  },
  {
    abbreviation: "Oct",
    name: "October",
  },
  {
    abbreviation: "Nov",
    name: "November",
  },
  {
    abbreviation: "Dec",
    name: "December",
  },
];

export const RepsCommit = ({ repsCommits, target, type, sales }) => {
  return (
    <>
      <Divider style={{ margin: "15px 0" }}></Divider>

      {type === "month" ? (
        <Row className={classes.gird}>
          <Col
            className={classes.gridItemHeader + " " + classes.separate}
            span={12}
          >
            <span>Sales</span>
          </Col>

          <Col
            className={classes.gridItemHeader + " " + classes.separate}
            span={12}
          >
            <span>Amount</span>
          </Col>

          {target === "commit"
            ? repsCommits?.map((item, index) => (
                <React.Fragment key={index}>
                  <Col className={classes.gridItem} span={12}>
                    {sales[index]?.firstname + " " + sales[index]?.lastname}
                  </Col>
                  <Col className={classes.gridItem} span={12}>
                    {item[0]?.value || "-"}
                  </Col>
                </React.Fragment>
              ))
            : target === "bestcase"
            ? repsCommits?.map((item, index) => (
                <React.Fragment key={index}>
                  <Col className={classes.gridItem} span={12}>
                    {sales[index]?.firstname + " " + sales[index]?.lastname}
                  </Col>
                  <Col className={classes.gridItem} span={12}>
                    {item[0]?.value || "-"}
                  </Col>
                </React.Fragment>
              ))
            : target === "target" &&
              repsCommits?.map((item, index) => (
                <React.Fragment key={index}>
                  <Col className={classes.gridItem} span={12}>
                    {sales[index]?.firstname + " " + sales[index]?.lastname}
                  </Col>
                  <Col className={classes.gridItem} span={12}>
                    {item[0]?.value || "-"}
                  </Col>
                </React.Fragment>
              ))}
        </Row>
      ) : (
        <Row className={classes.gird}>
          <Col
            className={classes.gridItemHeader + " " + classes.separate}
            span={6}
          >
            <span className={classes.rowLabel}>Sales</span>\
            <span className={classes.colLabel}>Month</span>
          </Col>
          <Col className={classes.gridItemHeader} span={6}>
            {repsCommits?.months && months[repsCommits?.months[0] - 1]?.name}
          </Col>
          <Col className={classes.gridItemHeader} span={6}>
            {repsCommits?.months && months[repsCommits?.months[1] - 1]?.name}
          </Col>
          <Col className={classes.gridItemHeader} span={6}>
            {repsCommits?.months && months[repsCommits?.months[2] - 1]?.name}
          </Col>

          {target === "commit"
            ? repsCommits?.findedRepsCommits?.map((item, index) => (
                <React.Fragment key={index}>
                  <Col className={classes.gridItem} span={6}>
                    {sales[index]?.firstname + " " + sales[index]?.lastname}
                  </Col>

                  {item?.map((element, j) => (
                    <Col key={j} className={classes.gridItem} span={6}>
                      {element?.owneradjustedamount || 0}
                    </Col>
                  ))}
                </React.Fragment>
              ))
            : target === "bestcase"
            ? repsCommits?.findedRepsBestCases?.map((item, index) => (
                <React.Fragment key={index}>
                  <Col className={classes.gridItem} span={6}>
                    {sales[index]?.firstname + " " + sales[index]?.lastname}
                  </Col>

                  {item?.map((element, j) => (
                    <Col key={j} className={classes.gridItem} span={6}>
                      {element?.owneradjustedamount || 0}
                    </Col>
                  ))}
                </React.Fragment>
              ))
            : target === "quota" &&
              repsCommits?.findedRepsQuotas?.map((item, index) => (
                <React.Fragment key={index}>
                  <Col className={classes.gridItem} span={6}>
                    {sales[index]?.firstname + " " + sales[index]?.lastname}
                  </Col>

                  {item?.map((element, j) => (
                    <Col key={j} className={classes.gridItem} span={6}>
                      {element?.quotaamount || 0}
                    </Col>
                  ))}
                </React.Fragment>
              ))}
        </Row>
      )}
    </>
  );
};
