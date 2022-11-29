import { Tag, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFilter } from "../../redux/Slices/Filter.slices";
import { NumFormatter } from "../Services/Utils/Utils";
// import * as classes from "./Stages.module.css";

const Stages = ({ data }) => {
  const [selectetdStage, setSelectetdStage] = useState(null);

  const dispatch = useDispatch();

  const handleStageFilter = (item) => {
    if (item.title === selectetdStage?.value) {
      dispatch(
        addFilter({
          action: "stagename",
          value: item.title,
          selected: false,
        })
      );
      setSelectetdStage(null);
    } else {
      setSelectetdStage({
        action: "stagename",
        value: item.title,
        selected: true,
      });
      dispatch(
        addFilter({
          action: "stagename",
          value: item.title,
          selected: true,
        })
      );
    }
  };
  return (
    <ul className="carousel-nav ">
      {data?.map((item, index) => (
        <li
          key={index}
          onClick={() => handleStageFilter(item)}
          className={selectetdStage?.value === item.title ? "active" : ""}
        >
          <Typography.Link>
            {item?.title} ({item?.nbr})
            <br />
            <Tag className="tag" color={"transparent"}>
              {NumFormatter(item.amount)}
            </Tag>
          </Typography.Link>
        </li>
      ))}
    </ul>
  );
};

export default Stages;
