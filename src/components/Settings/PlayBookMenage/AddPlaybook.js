import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification, Select } from "antd";

import axios from "axios";
const { Option } = Select;
const { TextArea } = Input;
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

const AddPlaybook = ({ getComunications }) => {
  const [form] = Form.useForm();
  const [files, setFiles] = React.useState([]);
  const [managerList, setManagerList] = useState([]);
  // const [salesList, setSalesList] = useState([]);

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

  // const getSaller = (idManager) => {
  //   if (idManager) {
  //     let sallerList = managerList.filter((item) => item._id === idManager);
  //     if (sallerList[0].salesusers) {
  //       setSalesList(sallerList[0].salesusers);
  //     }
  //   }
  // };

  const onFinish = async (values) => {
    try {
      const data = await axios.post("/processflow/" + values.manager, values);
      form.resetFields();
      notification.success({
        message: "Playbook added",
      });
      getComunications();
    } catch (error) {
      console.log(error);
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
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name={"manager"}
        label={
          "Manager" + " (" + (managerList ? managerList.length || 0 : 0) + ")"
        }
        rules={[{ required: true }]}
      >
        <Select placeholder="Select the manager " allowClear showSearch>
          {managerList?.map((item, index) => (
            <Option key={index} value={item._id}>
              <b>{item.firstname}</b>&nbsp; {item.lastname}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* <Form.Item
        name={"seller"}
        label={"Seller" + ' (' + (salesList ? salesList.length || 0 : 0) + ')'}
        rules={[{ required: true }]}
      >
        <Select placeholder="Select the seller " allowClear showSearch disabled={salesList.length === 0 ? true : false}  >
          {
            salesList?.map((item, index) =>
              <Option key={index} value={item._id}><b>{item.firstname}</b> {+ ' ' + item.lastname}</Option>
            )
          }
        </Select>
      </Form.Item> */}
      <Form.Item name={"description"} label="Description">
        <TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit">
          ADD
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddPlaybook;
