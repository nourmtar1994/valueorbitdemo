import React, { useEffect, useState } from "react";
//axios
import axios from "axios";
//ant design components
import { Button, Form, Input, Modal, notification } from "antd";

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

const EditCategoryModel = ({ visibility, IdCategory }) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(visibility);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCategory = async () => {
    if (IdCategory) {
      try {
        const { data } = await axios.get("/category/" + IdCategory);
        form.setFieldsValue(data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getCategory();
    visibility !== null && setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility]);

  const handleOk = async (values) => {
    setLoading(true);
    if (IdCategory) {
      try {
        const { data } = await axios.put("/category/" + IdCategory, values);
        setLoading(false);
        notification.success({
          message: "Success",
          description: "Category updated !",
          placement: "topRight",
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Cannot update Category!",
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
        title={"Edit category" + IdCategory}
        open={visible}
        confirmLoading={confirmLoading}
        footer={false}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          {...layout}
          name="edit_category"
          onFinish={handleOk}
          validateMessages={validateMessages}
        >
          <Form.Item name={"name"} label="name" rules={[{ required: true }]}>
            <Input placeholder="Name" disabled={loading} />
          </Form.Item>
          <Form.Item name={"description"} label="Description">
            <TextArea placeholder="Description" disabled={loading} />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
            <Button type="primary" htmlType="submit" loading={loading}>
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
export default EditCategoryModel;
