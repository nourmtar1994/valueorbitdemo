import React, { useEffect, useState } from "react";
//redux (app store)
import { useSelector } from "react-redux";
//axios
import axios from "axios";
//ant design components
import { Button, Modal, Form, Input, notification, Select } from "antd";
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

const EditPlayBookModel = ({ visibility, IdPlayBook }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [managerList, setManagerList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (IdPlayBook) {
      try {
        const { data } = await axios.get("/processflow/" + IdPlayBook);
        data.success &&
          form.setFieldsValue({
            name: data.data.name,
            manageruser: data.data.manageruser._id,
            opportunity: data.data.opportunity,
            description: data.data.description,
          });
      } catch (error) {
        console.error(error);
      }
    }
    visibility !== null && setVisible(true);
  }, [visibility]);

  useEffect(() => {
    getManager();
  }, []);

  const getManager = async () => {
    try {
      const { data } = await axios.get("/manager");
      if (data) {
        setManagerList(data);
      } else {
        notification.error({
          message: "Error",
          description: "Cannot get manager list !",
          placement: "topRight",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Cannot get manager list !",
        placement: "topRight",
      });
    }
  };

  const handleOk = async (values) => {
    setLoading(true);
    if (IdPlayBook) {
      try {
        const { data } = await axios.put("/processflow/" + IdPlayBook, values);
        setLoading(false);
        notification.success({
          message: "Success",
          description: "Playbook flow updated ",
          placement: "topRight",
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Cannot update Playbook ",
          placement: "topRight",
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
        title={"Edit Process Flow "}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          {...layout}
          name="communication"
          onFinish={handleOk}
          validateMessages={validateMessages}
        >
          <Form.Item name={"name"} label="name" rules={[{ required: true }]}>
            <Input placeholder="Name" disabled={loading} />
          </Form.Item>

          <Form.Item
            name={"manageruser"}
            label={
              "Manager" +
              " (" +
              (managerList ? managerList.length || 0 : 0) +
              ")"
            }
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select the manager "
              allowClear
              showSearch
              disabled={loading}
            >
              {managerList?.map((item, index) => (
                <Option key={index} value={item._id}>
                  <b>{item.firstname}</b> {+" " + item.lastname}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item
            name={"seller"}
            label={"Seller"}
            rules={[{ required: true }]}
          >
            <Select placeholder="Select the seller " allowClear showSearch >
            </Select>
          </Form.Item> */}
          <Form.Item name={"description"} label="Description">
            <TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
            <Button type="primary" htmlType="submit" loading={false}>
              ADD
            </Button>
            &nbsp; &nbsp;
            <Button type="secondary" htmlType="reset">
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditPlayBookModel;
