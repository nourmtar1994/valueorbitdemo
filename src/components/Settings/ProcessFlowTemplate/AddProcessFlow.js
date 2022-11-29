import React from "react";
import { Form, Input, Button, notification, Select } from "antd";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const { TextArea } = Input;
const { Option } = Select;
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const AddProcsessFlow = ({ getProcessFlow }) => {
  const [form] = Form.useForm();
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getManagerList();
  }, []);

  const getManagerList = async () => {
    try {
      const { data } = await axios.get(
        "/processflowtemplate/availablemanager/go"
      );
      setManagers(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post("/processflowtemplate", values);
      form.resetFields();
      notification.success({
        placement: "bottomRight",
        message: "Playbook added ",
      });
      setLoading(false);

      getProcessFlow();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      {...layout}
      name="communication"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item name={"name"} label="name" rules={[{ required: true }]}>
        <Input disabled={loading} placeholder="Name" />
      </Form.Item>

      <Form.Item name={"description"} label="Description">
        <TextArea placeholder="Description" disabled={loading} />
      </Form.Item>

      <Form.Item name={"managerusers"} label="Managers">
        <Select
          placeholder={"Managers"}
          style={{ width: "100%" }}
          mode="multiple"
        >
          {managers?.map((item, index) => (
            <Option key={index} value={item?._id}>
              {item?.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name={"options"} label="Options">
        <TextArea placeholder="Options" disabled={loading} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddProcsessFlow;
