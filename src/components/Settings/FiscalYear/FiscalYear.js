import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, DatePicker, Row, Col } from "antd";
import CollapsedCard from "../../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const FiscalYear = () => {
  const [form] = Form.useForm();
  const [fiscalYear, setFiscalYear] = useState({});
  useEffect(() => {
    getFiscaryearMonths();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (values) => {
    try {
      const { data } = await axios.put("/fiscalyear/" + fiscalYear?._id, {
        startmonth: moment(values?.startmonth).month() + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFiscaryearMonths = async () => {
    try {
      const { data } = await axios.get("/fiscalyear/");
      setFiscalYear(data?.data);
      form?.setFieldValue(
        "startmonth",
        moment()?.set({ month: data?.data?.startmonth - 1 })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CollapsedCard title={"Fiscal Year"}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Card>
            <Form onFinish={onFinish} form={form} layout="vertical">
              <Form.Item
                name={"startmonth"}
                label="Start fiscal month"
                required
                tooltip={{
                  title: "Select fiscal year months",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <DatePicker picker="month" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </CollapsedCard>
  );
};

export default FiscalYear;
