import React, { useEffect, useState } from "react";
import { Select } from "antd";
import * as classes from "./StagesTimeLine.module.css";
import { useDispatch } from "react-redux";
import { addFilter } from "../../redux/Slices/Filter.slices";
import { NumFormatter } from "../Services/Utils/Utils";
import { AppstoreOutlined } from "@ant-design/icons";
import { FaDollarSign } from "react-icons/fa";
const { Option } = Select;

const color = ["danger", "success", "primary", "warning", "info"];

const CategoryList = ({ data, defaultValue }) => {
  const [selectetdCategory, setSelectetdCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectetdCategory({
      action: "forecastcategory",
      value: defaultValue?.value,
      selected: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryFilter = (item) => {
    if (item) {
      setSelectetdCategory({
        action: "forecastcategory",
        value: item,
        selected: true,
      });
      dispatch(
        addFilter({
          action: "forecastcategory",
          value: item,
          selected: true,
        })
      );
    } else {
      dispatch(
        addFilter({
          action: "forecastcategory",
          value: item,
          selected: false,
        })
      );
      setSelectetdCategory(null);
    }
  };
  return (
    <Select
      className="custom-select"
      value={selectetdCategory?.value}
      placeholder="Category"
      allowClear
      showSearch
      style={{ width: "100%" }}
      onChange={(e) => handleCategoryFilter(e)}
    >
      {data?.map((item, i) => (
        <Option key={i} value={item?.title} label={item?.title}>
          <div>
            <label className={classes[color[i]]}>
              <AppstoreOutlined size={10} /> &nbsp;
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
  );
};

export default CategoryList;
