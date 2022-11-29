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

const EditSales = ({
  setShowEditSales,
  showEditSales,
  getManagerList,
  sales = null,
}) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sales !== null &&
      form.setFieldsValue({
        firstname: sales.firstname,
        lastname: sales.lastname,
        username: sales.username,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sales]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.put("/sales/" + sales._id, values);
      if (data.success) {
        setLoading(false);
        notification.success({
          message: "Sales Edited",
        });
        getManagerList();
      }
    } catch (error) {
      notification.error({
        message: "Cannot edit the sales ! try again",
      });
      setLoading(false);
    }
  };

  return (
    <Modal
      footer={false}
      title="Edit Sales"
      visible={showEditSales}
      onCancel={() => setShowEditSales(false)}
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
            onClick={() => setShowEditSales(false)}
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

export default EditSales;