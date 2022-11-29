import React, { useState } from "react";
import { Select } from "antd";
import * as classes from "./ManagerJudgment.module.css";

import { useDispatch } from "react-redux";
import { addFilter } from "../../redux/Slices/Filter.slices";
import { NumFormatter } from "../Services/Utils/Utils";
import { ScheduleOutlined } from "@ant-design/icons";
import { FaDollarSign } from "react-icons/fa";
import { useEffect } from "react";
const { Option } = Select;

const color = ["danger", "purple", "warning", "info", "success", "primary"];

const ManagerJudgmentList = ({ data, defaultValue }) => {
  const dispatch = useDispatch();
  const [selectetdJudgment, setSelectetdJudgment] = useState(null);

  // useEffect(() => {
  //   totalOpportunity && getManagerAdjustmentdata(forecastCategory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [totalOpportunity]);

  useEffect(() => {
    setSelectetdJudgment({
      action: "forecastcategory",
      value: defaultValue?.value,
      selected: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManagerJudFilter = (item) => {
    if (item) {
      setSelectetdJudgment({
        action: "managerJudgment",
        value: item,
        selected: true,
      });
      dispatch(
        addFilter({
          action: "managerJudgment",
          value: item,
          selected: true,
        })
      );
    } else {
      dispatch(
        addFilter({
          action: "managerJudgment",
          value: item,
          selected: false,
        })
      );
      setSelectetdJudgment(null);
    }
  };

  return (
    <Select
      className="custom-select"
      value={selectetdJudgment?.value}
      placeholder="Manager Judgment "
      allowClear
      showSearch
      style={{ width: "100%" }}
      onChange={(e) => handleManagerJudFilter(e)}
    >
      {data?.map((item, i) => (
        <Option key={i} value={item?.title} label={item?.title}>
          <div>
            <label className={classes[color[i]]}>
              <ScheduleOutlined size={10} /> &nbsp;
              {item?.title} ({item?.nbr})
            </label>
            <br />
            <label align="center" className={"icon_silver"}>
              <FaDollarSign size={12} /> &nbsp;
              {NumFormatter(item.amount)}
            </label>
          </div>
        </Option>
      ))}
    </Select>

    // <Row className={classes.timeline} align="center">
    //   {data?.map((item, i) => (
    //     <Col
    //       onClick={() => handleManagerJudFilter(item)}
    //       key={i}
    //       md={{
    //         span:
    //           data.length === 1
    //             ? 24
    //             : data.length === 2
    //             ? 12
    //             : data.length === 3
    //             ? 8
    //             : data.length === 4
    //             ? 5
    //             : 4,
    //       }}
    //       sm={{ span: 12 }}
    //       xs={{ span: 24 }}
    //       className={
    //         classes.timelineItem +
    //         " " +
    //         (classes[color[i]] || classes.primary) +
    //         " " +
    //         (selectetdJudgment?.value === item?.title && classes.active)
    //       }
    //     >
    //       <label className={classes.title}>
    //         {item.title + " (" + item.nbr + ")"}
    //       </label>
    //       <label className={classes.tag} color="transparente">
    //         {NumFormatter(item.amount)}
    //       </label>
    //     </Col>
    //   ))}
    // </Row>
  );
};

export default ManagerJudgmentList;
