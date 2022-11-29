import React, { useState } from "react";
//redux (app store)

//ant design components
import { Form, Input, Button, notification } from "antd";

import axios from "axios";

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

const AddOption = ({ getProcessFlow, questionId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/optiontemplate/" + questionId, {
        name: values.option.name,
      });
      if (data?.success) {
        notification.success({
          placement: "bottomRight",
        });
        setLoading(false);
        getProcessFlow();
        form.resetFields();
      }
    } catch (error) {
      notification.error({
        placement: "bottomRight",
        message: "Option cannot be added",
      });
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      {...layout}
      name="category"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["option", "name"]}
        label="Option"
        rules={[
          {
            required: true,
            message: "Missing Question text",
          },
        ]}
      >
        <Input
          style={{ width: "100%" }}
          placeholder="Question"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          ADD
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddOption;
