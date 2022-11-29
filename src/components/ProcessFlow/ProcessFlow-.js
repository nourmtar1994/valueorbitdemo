import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import Communication from "./ProcessFlow";
import axios from "axios";
import { Col, Result, Row, Select, Space } from "antd";
import Badge from "../Badge/Badge";

const { Option } = Select;

const ProcessFlow = ({
  getOpportunity,
  activeCategory,
  setActiveCategory,
  dealName = "",
}) => {
  const [user, setUser] = useState(null);
  const [list, setList] = useState(null);
  const [loading, setloading] = useState(false);
  const [selectedProcess, setselectedProcess] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
  }, []);

  useEffect(() => {
    getProcessFlow();
  }, [user]);

  const getProcessFlow = async () => {
    setloading(true);

    if (user) {
      if (user.role === "manager") {
        try {
          const { data } = await axios.get("processflow/manager/" + user.id);
          if (data.success) {
            setList(data.data);
            setloading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (user.role === "sales") {
        try {
          const { data } = await axios.get("processflow/sales/" + user.id);
          if (data.success) {
            setList(data.data);
            setloading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const selectProcessFlow = (e) => {
    setloading(true);
    setselectedProcess(list.find((item) => item._id === e));
    setTimeout(() => {
      setloading(false);
    }, 1000);
  };

  return (
    <Badge title="Process Flow">
      <Row gutter={[30, 30]}>
        <Col span={16} push={4}>
          <Select
            loading={list ? false : true}
            disabled={list ? false : true}
            style={{ width: "100%" }}
            showSearch
            placeholder="Select a process flow"
            optionFilterProp="children"
            onChange={selectProcessFlow}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {list?.map((item, index) => (
              <Option key={index} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Col>
        {/* <Col span={24}>
          {selectedProcess ? (
            <ProcessFlow
              dealName={dealName}
              setActiveCategory={setActiveCategory}
              activeCategory={activeCategory}
              data={selectedProcess || null}
              loading={loading}
              getOpportunity={getOpportunity}
            />
          ) : (
            <Result title="Please select the process flow" />
          )}
        </Col> */}
      </Row>
    </Badge>
  );
};
export default ProcessFlow;
