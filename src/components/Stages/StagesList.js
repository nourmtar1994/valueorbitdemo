import { NodeIndexOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addFilter } from "../../redux/Slices/Filter.slices";
import { NumFormatter } from "../Services/Utils/Utils";
// import * as classes from "./Stages.module.css";

const { Option } = Select;
const StagesList = ({ data, defaultValue }) => {
  const [selectetdStage, setSelectetdStage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectetdStage({
      action: "forecastcategory",
      value: defaultValue?.value,
      selected: true,
    });
  }, []);

  const handleStageFilter = (item) => {
    if (item) {
      setSelectetdStage({
        action: "stagename",
        value: item,
        selected: true,
      });
      dispatch(
        addFilter({
          action: "stagename",
          value: item,
          selected: true,
        })
      );
    } else {
      dispatch(
        addFilter({
          action: "stagename",
          value: item,
          selected: false,
        })
      );
      setSelectetdStage(null);
    }
  };

  return (
    <Select
      className="custom-select"
      value={selectetdStage?.value}
      placeholder="Stages"
      allowClear
      showSearch
      style={{ width: "100%" }}
      onChange={(e) => handleStageFilter(e)}
    >
      {data?.map((item, index) => (
        <Option key={index} value={item?.title} label={item?.title}>
          <div className="demo-option-label-item">
            <NodeIndexOutlined size={10} className={"icon_primary"} /> &nbsp;
            {item?.title} ({item?.nbr})
            <br />
            <label align="center" className={"icon_silver"}>
              <FaDollarSign size={12} /> &nbsp;
              {NumFormatter(item.amount)}
            </label>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default StagesList;
