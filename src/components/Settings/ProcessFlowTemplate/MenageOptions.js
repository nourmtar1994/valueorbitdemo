import React, { useEffect, useState } from "react";
//axios
import axios from "axios";
//ant design components
import { Button, Form, Input, Modal, notification, Typography } from "antd";
import EdiText from "react-editext";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
//style
import * as classes from "./Style/Option.module.css";

const { Paragraph } = Typography;

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
const MenageOptions = ({ item, visible, setAddOptions }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [optionsList, setOptionsList] = useState([]);

  useEffect(async () => {
    if (item) {
      try {
        const { data } = await axios.get("/optiontemplate/" + item);
        getOptions();
      } catch (error) {
        console.error(error);
      }
    }
  }, [item]);

  const getOptions = async () => {
    try {
      const { data } = await axios.get("/optiontemplate/itemtemplate/" + item);
      if (data?.success) {
        setOptionsList(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOk = async (values) => {
    setLoading(true);
    if (item) {
      try {
        const { data } = await axios.post("/optiontemplate/" + item, {
          name: values?.name,
        });
        setLoading(false);
        getOptions();
        notification.success({
          message: "Success",
          description: "Option added ",
          placement: "bottomRight",
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Cannot add Option!",
          placement: "bottomRight",
        });
        setLoading(false);
      }
    }
  };
  const handleCancel = () => {
    setAddOptions({ visivle: false, id: null });
  };
  const handleSave = async (val, id) => {
    try {
      const { data } = await axios.put("/optiontemplate/" + id, { name: val });
      setLoading(false);
      getOptions();
      notification.success({
        message: "Success",
        description: "Option updated",
        placement: "topRight",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Add Option"
      open={visible}
      footer={false}
      onCancel={handleCancel}
    >
      {optionsList?.map((item, index) => (
        <div className={classes.textEditableContainer}>
          <EdiText
            editButtonContent={<EditOutlined />}
            saveButtonContent={<CheckCircleOutlined />}
            cancelButtonContent={<CloseCircleOutlined />}
            editButtonClassName={classes.editButton}
            saveButtonClassName={classes.saveButton}
            cancelButtonClassName={classes.cancelButton}
            editContainerClassName={classes.editContainer}
            submitOnEnter
            showButtonsOnHover
            type="text"
            value={item?.name}
            onSave={(e) => handleSave(e, item?._id)}
            hideIcons
          />
          <button className={classes.deleteButton}>
            <DeleteOutlined />
          </button>
        </div>
      ))}
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

        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
          &nbsp; &nbsp;
          <Button
            type="secondary"
            htmlType="reset"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MenageOptions;
