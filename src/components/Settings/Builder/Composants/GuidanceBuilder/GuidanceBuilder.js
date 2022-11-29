import { Button, Col, Input, Row, Select } from "antd";
import React from "react";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
const { Option } = Select;
const GuidanceBuilder = ({
  guidanceBuilderList,
  setGuidanceBuilderList,
  guidance,
  id,
}) => {
  const [selected, setSelected] = useState([]);

  const editValue = (newValue, name, targetValue = null) => {
    let newGuidanceBuilderList = guidanceBuilderList;
    let objIndex = newGuidanceBuilderList.findIndex((obj) => obj.id === id);
    newGuidanceBuilderList[objIndex].params = { [name]: newValue };
    setGuidanceBuilderList(newGuidanceBuilderList);
  };

  const handeleSelectSignals = (e) => {
    let newGuidanceBuilderList = guidanceBuilderList;
    let objIndex = newGuidanceBuilderList.findIndex((obj) => obj.id === id);
    newGuidanceBuilderList[objIndex].name = JSON.parse(e)?.name;
    setGuidanceBuilderList(newGuidanceBuilderList);
    setSelected(JSON.parse(e));
  };

  return (
    <>
      <Row gutter={[10, 10]}>
        <>
          <Col>
            <Select
              onChange={(e) => handeleSelectSignals(e)}
              style={{ width: 150 }}
              defaultActiveFirstOption
            >
              {guidance?.map((item, key) => (
                <Option key={key} value={JSON.stringify(item)}>
                  {item?.label || item?.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col>
            {selected?.guidanceparamsbuilder?.map((item, index) => (
              <span key={index}>
                {item?.label + " : "}
                <Input
                  style={{ width: 200 }}
                  onChange={(e) => editValue(e.target.value, item?.name)}
                  placeholder={item?.label}
                />
              </span>
            ))}
          </Col>
          <Col>
            <Button type="link" danger icon={<FaTrashAlt />}>
              {" "}
            </Button>
          </Col>
        </>
      </Row>
    </>
  );
};

export default GuidanceBuilder;
