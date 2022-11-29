import React, { useState } from "react";
import { Col, Row } from "antd";
import * as classes from "./StagesTimeLine.module.css";
import { useDispatch } from "react-redux";
import { addFilter } from "../../redux/Slices/Filter.slices";
import { NumFormatter } from "../Services/Utils/Utils";

const color = ["danger", "success", "primary", "warning", "info"];

const CategoryFilter = ({ data }) => {
  const [selectetdCategory, setSelectetdCategory] = useState(null);
  const dispatch = useDispatch();

  const handleCategoryFilter = (item) => {
    if (item.title === selectetdCategory?.value) {
      dispatch(
        addFilter({
          action: "forecastcategory",
          value: item.title,
          selected: false,
        })
      );
      setSelectetdCategory(null);
    } else {
      setSelectetdCategory({
        action: "forecastcategory",
        value: item.title,
        selected: true,
      });
      dispatch(
        addFilter({
          action: "forecastcategory",
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
          onClick={() => handleCategoryFilter(item)}
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
                ? 6
                : 4,
          }}
          sm={{ span: 12 }}
          xs={{ span: 24 }}
          className={
            classes.timelineItem +
            " " +
            (classes[color[i]] || classes.primary) +
            " " +
            (selectetdCategory?.value === item?.title && classes.active)
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

export default CategoryFilter;
