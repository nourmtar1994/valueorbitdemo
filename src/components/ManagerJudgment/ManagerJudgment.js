import React, { useState } from "react";
import { Col, Row } from "antd";
import * as classes from "./ManagerJudgment.module.css";

import { useDispatch } from "react-redux";
import { addFilter } from "../../redux/Slices/Filter.slices";
import { NumFormatter } from "../Services/Utils/Utils";
const color = ["danger", "purple", "warning", "info", "success", "primary"];

const ManagerJudgment = ({ data }) => {
  const dispatch = useDispatch();
  const [selectetdJudgment, setSelectetdJudgment] = useState(null);

  // useEffect(() => {
  //   totalOpportunity && getManagerAdjustmentdata(forecastCategory);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [totalOpportunity]);

  const handleManagerJudFilter = (item) => {
    if (item.title === selectetdJudgment?.value) {
      dispatch(
        addFilter({
          action: "managerJudgment",
          value: item.title,
          selected: false,
        })
      );
      setSelectetdJudgment(null);
    } else {
      setSelectetdJudgment({
        action: "managerJudgment",
        value: item.title,
        selected: true,
      });
      dispatch(
        addFilter({
          action: "managerJudgment",
          value: item.title,
          selected: true,
        })
      );
    }
  };

  return (
    <Row className={classes.timeline} align="center">
      {data?.map((item, i) => (
        <Col
          onClick={() => handleManagerJudFilter(item)}
          key={i}
          md={{
            span:
              data.length === 1
                ? 24
                : data.length === 2
                ? 12
                : data.length === 3
                ? 8
                : data.length === 4
                ? 5
                : 4,
          }}
          sm={{ span: 12 }}
          xs={{ span: 24 }}
          className={
            classes.timelineItem +
            " " +
            (classes[color[i]] || classes.primary) +
            " " +
            (selectetdJudgment?.value === item?.title && classes.active)
          }
        >
          <label className={classes.title}>
            {item.title + " (" + item.nbr + ")"}
          </label>
          <label className={classes.tag} color="transparente">
            {NumFormatter(item.amount)}
          </label>
        </Col>
      ))}
    </Row>
  );
};

export default ManagerJudgment;
