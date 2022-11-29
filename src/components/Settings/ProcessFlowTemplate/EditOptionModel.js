import React, { useEffect, useState } from "react";
//axios
import axios from "axios";
//ant design components
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Switch,
  Tag,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

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

const EditOptionModel = ({ visibility, idOption, getProcessFlow }) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(visibility);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valuesList, setValuesList] = useState([]);
  const [value, setValue] = useState([]);
  const [type, setType] = useState(false);
  useEffect(() => {
    getOption();
    visibility !== null && setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility]);

  const getOption = async () => {
    if (idOption) {
      try {
        const { data } = await axios.get("/optiontemplate/" + idOption);
        form.setFieldsValue(data.data);
        setValuesList(data?.data?.values);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleOk = async (values) => {
    setLoading(true);
    if (idOption) {
      try {
        const { data } = await axios.put("/optiontemplate/" + idOption, values);
        setLoading(false);
        if (data.success) {
          notification.success({
            message: "Success",
            description: "Option updated",
            placement: "bottomRight",
          });
          getProcessFlow();
          setValuesList([]);
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Cannot update option!",
          placement: "bottomRight",
        });
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Edit option"
        open={visible}
        // confirmLoading={confirmLoading}
        footer={false}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          {...layout}
          name="edit_item"
          onFinish={handleOk}
          validateMessages={validateMessages}
        >
          <Form.Item name={"name"} label="name" rules={[{ required: true }]}>
            <Input placeholder="Name" disabled={loading} />
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
            &nbsp; &nbsp;
            <Button
              onClick={() => setVisible(false)}
              type="secondary"
              htmlType="reset"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditOptionModel;
