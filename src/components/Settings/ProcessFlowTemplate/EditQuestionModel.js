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

const EditCategoryModel = ({ visibility, idItem, getProcessFlow }) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(visibility);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItem();
    visibility !== null && setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility]);

  const getItem = async () => {
    if (idItem) {
      try {
        const { data } = await axios.get("/itemtemplate/" + idItem);
        form.setFieldsValue(data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleOk = async (values) => {
    setLoading(true);
    if (idItem) {
      try {
        const { data } = await axios.put("/itemtemplate/" + idItem, values);
        setLoading(false);
        if (data.success) {
          notification.success({
            message: "Success",
            description: "Item updated ",
            placement: "bottomRight",
          });
          getProcessFlow();
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Cannot update Item",
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
        title="Edit item"
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
          <Form.Item name={"description"} label="Description">
            <TextArea placeholder="Description" disabled={loading} />
          </Form.Item>

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
export default EditCategoryModel;
