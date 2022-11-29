import { Button, Col, Input, Row, Select } from "antd";
import React from "react";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
const { Option } = Select;
const SignalsBuilder = ({
  signalsBuilderList,
  setSignalsBuilderList,
  signals,
  id,
}) => {
  const [selected, setSelected] = useState([]);

  const editValue = (newValue, name, targetValue = null) => {
    let newSignalsBuilderList = signalsBuilderList;
    let objIndex = newSignalsBuilderList.findIndex((obj) => obj.id === id);
    newSignalsBuilderList[objIndex].params = { [name]: newValue };
    setSignalsBuilderList(newSignalsBuilderList);
  };

  const handeleSelectSignals = (e) => {
    let newSignalsBuilderList = signalsBuilderList;
    let objIndex = newSignalsBuilderList.findIndex((obj) => obj.id === id);
    newSignalsBuilderList[objIndex].name = JSON.parse(e)?.name;
    setSignalsBuilderList(newSignalsBuilderList);
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
              {signals?.map((item, key) => (
                <Option key={key} value={JSON.stringify(item)}>
                  {item?.label || item?.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col>
            {selected?.signalparamsbuilder?.map((item, index) => (
              <span key={index}>
                {item?.label + " : "}
                <Input
                  align="right"
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

export default SignalsBuilder;
