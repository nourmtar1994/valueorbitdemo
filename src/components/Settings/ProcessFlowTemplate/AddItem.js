import React, { useState } from "react";
//ant design components
import { Form, Input, Button, notification } from "antd";
// file upload component
import { Dropzone, FileItem } from "@dropzone-ui/react";
import axios from "axios";
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

const AddItem = ({ getProcessFlow, idMetric, salesList = [] }) => {
  const [form] = Form.useForm();
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const updateFiles = (incommingFiles) => {
    //do something with the files
    setFiles(incommingFiles);
    //even your own upload implementation
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/itemtemplate/" + idMetric, {
        description: values.item.description,
        name: values.item.name,
      });

      if (data.success) {
        try {
          const addtoCategory = await axios.put(
            "/categorytemplate/" + idMetric,
            {
              questions: data.data._id,
            }
          );

          if (addtoCategory.data.success) {
            notification.success({
              placement: "bottomRight",
              message: "Item added",
            });
            form.resetFields();

            setLoading(false);
          }
          getProcessFlow();
        } catch (error) {
          notification.error({
            placement: "bottomRight",
            message: "Item cannot be added",
          });
          setLoading(false);
        }
      }
    } catch (error) {
      notification.error({
        placement: "bottomRight",
        message: "Item cannot be added",
      });
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      {...layout}
      name="items"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["item", "name"]}
        label="Item"
        rules={[
          {
            required: true,
            message: "Missing item text",
          },
        ]}
      >
        <Input.TextArea
          style={{ width: "100%" }}
          placeholder="Item"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item
        name={["item", "description"]}
        label="Description"
        rules={[
          {
            message: "Missing item description",
          },
        ]}
      >
        <Input.TextArea
          style={{ width: "100%" }}
          placeholder="Description"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item
        name={["item", "files"]}
        label="Upload"
        valuePropName="fileList"
        extra="Document"
      >
        <Dropzone
          behaviour="replace"
          label="Drop your file here"
          minHeight="100px"
          accept="image/*, .pdf, .doc, .docx, .txt"
          onChange={updateFiles}
          value={files}
        >
          {files.map((file) => (
            <FileItem
              resultOnTooltip={true}
              preview={false}
              {...file}
              onDelete={removeFile}
              key={file.id}
              info
            />
          ))}
        </Dropzone>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddItem;
