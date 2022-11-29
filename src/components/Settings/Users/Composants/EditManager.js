import { Button, Form, Input, Modal, notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const EditManager = ({
  setShowEditManager,
  showEditManager,
  getManagerList,
  manager = null,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    manager !== null &&
      form.setFieldsValue({
        firstname: manager.firstname,
        lastname: manager.lastname,
        username: manager.username,
      });
  }, [manager]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.put("/manager/" + manager._id, values);
      if (data.success) {
        setLoading(false);

        notification.success({
          message: "Manager Edited ",
        });
        getManagerList();
      }
    } catch (error) {
      notification.error({
        message: "Cannot edit the manager ! try again",
      });
      setLoading(false);
    }
  };

  return (
    <Modal
      footer={false}
      title="Edit Manager"
      visible={showEditManager}
      onCancel={() => setShowEditManager(false)}
    >
      <Form
        form={form}
        layout="vertical"
        {...layout}
        name="category"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="firstname"
          label="Firstname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Lastname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password disabled={loading} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password disabled={loading} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
          <Button
            type="ghost"
            htmlType="reset"
            onClick={() => setShowEditManager(false)}
          >
            Cancel
          </Button>
          &nbsp; &nbsp;
          <Button type="primary" htmlType="submit" loading={loading}>
            ADD
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditManager;
