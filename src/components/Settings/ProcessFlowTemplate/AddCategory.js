import React, { useState } from "react";

//ant design components
import { Form, Input, Button, notification } from "antd";

import axios from "axios";

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

const AddCategory = ({ playBookId, getProcessFlow }) => {
  const [form] = Form.useForm();
  // const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = useState(false);

  // const updateFiles = (incommingFiles) => {
  //   //do something with the files
  //   setFiles(incommingFiles);
  //   //even your own upload implementation
  // };

  // const removeFile = (id) => {
  //   setFiles(files.filter((x) => x.id !== id));
  // };

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const { data } = await axios.post("/categorytemplate/" + playBookId, {
        description: values.description,
        name: values.name,
      });
      setLoading(false);
      if (data.success) {
        notification.success({
          placement: "bottomRight",
          message: "Category added ",
        });
        form.resetFields();
        getProcessFlow();
      }
    } catch (error) {
      console.error(error);
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
        name={"name"}
        label="Catégory name"
        rules={[{ required: true }]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item name={"description"} label="Description">
        <TextArea disabled={loading} placeholder="Description" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddCategory;
