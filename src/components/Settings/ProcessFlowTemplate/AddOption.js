import React, { useEffect, useState } from "react";

//ant design components
import { Form, Input, Button, notification, Switch, Tag, Select } from "antd";
//icons
import { PlusOutlined } from "@ant-design/icons";
// file upload component
import axios from "axios";

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

const AddOption = ({ getProcessFlow, questionId }) => {
  const [form] = Form.useForm();
  const [valuesList, setValuesList] = useState([]);
  const [value, setValue] = useState([]);
  const [type, setType] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [valuesList]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/optiontemplate/" + questionId, {
        name: values.option.name,
        type: values.option.type === true ? "other" : "contact",
        values: valuesList,
      });
      if (data?.success) {
        notification.success({
          placement: "bottomRight",
          message: "Option added",
        });
        setLoading(false);
        getProcessFlow();
        form.resetFields();
        setValuesList([]);
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
          placeholder="Option"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item
        name={["option", "type"]}
        label="Type"
        rules={[
          {
            required: true,
            message: "Missing Type",
          },
        ]}
      >
        <Select
          placeholder="Select type"
          style={{ width: "100%" }}
          onChange={(e) => {
            setValuesList([]);
            setType(e);
          }}
          value={type}
        >
          <Option value="contact">Contact</Option>
          <Option value="singlechoice">Single choice</Option>
          <Option value="multiplechoice">Multiple choice</Option>
          <Option value="numeric">Numeric</Option>
          <Option value="percentage">Percentage</Option>
        </Select>
      </Form.Item>

      {(type === "singlechoice" || type === "multiplechoice") && (
        <Form.Item name={["option", "values"]} label="Values">
          <Input
            style={{ width: "85%" }}
            placeholder="Value"
            disabled={loading}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <Button
            style={{ width: "15%" }}
            block
            disabled={value ? false : true}
            icon={<PlusOutlined />}
            onClick={() => {
              if (value !== "") {
                setValuesList([...valuesList, value]);
                setValue("");
              }
            }}
          ></Button>
        </Form.Item>
      )}

      <p>
        {valuesList?.map((item) => (
          <Tag
            key={item}
            closable
            onClose={() =>
              setValuesList(valuesList.filter((value) => item !== value))
            }
          >
            {item}
          </Tag>
        ))}
      </p>
      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddOption;
