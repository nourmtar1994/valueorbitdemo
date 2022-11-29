import React, { useState } from "react";
//redux (app store)
//ant design components
import { Form, Input, Button, notification } from "antd";
//icons

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

const AddCategory = ({ playBookId, getComunications }) => {
  const [form] = Form.useForm();
  const [files, setFiles] = React.useState([]);
  const [isCategorySet, setIsCategorySet] = useState(false);
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
      const { data } = await axios.post("/category/" + playBookId, {
        description: values.description,
        name: values.name,
      });

      if (data.success) {
        try {
          const addToOpp = await axios.put("/processflow/" + playBookId, {
            metrics: data.data._id,
          });
          if (addToOpp.data) {
            notification.success({
              placement: "bottomRight",
              message: "Category added ",
              description: "Category added to process flow",
            });
            form.resetFields();
            getComunications();
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
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
        <Input
          disabled={loading}
          onChange={(e) =>
            setIsCategorySet(e.target.value === "" ? false : true)
          }
        />
      </Form.Item>

      <Form.Item name={"description"} label="description">
        <TextArea disabled={loading} placeholder="Description" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          ADD
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddCategory;

{
  /* <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key}>
                <Divider orientation="left">
                  Question n° {index + 1}
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{
                      color: "red",
                      margin: "10px ",

                      fontSize: "20px",
                    }}
                  />
                </Divider>
                <Form.Item
                  name={[name, "name"]}
                  label="Question"
                  rules={[
                    {
                      required: true,
                      message: "Missing Question text",
                    },
                  ]}
                >
                  <Input.TextArea
                    style={{ width: "100%" }}
                    placeholder="Question"
                  />
                </Form.Item>
                <Form.Item
                  name={[name, "description"]}
                  label="description"
                  rules={[
                    {
                      message: "Missing Question description",
                    },
                  ]}
                >
                  <Input.TextArea
                    style={{ width: "100%" }}
                    placeholder="describe the question"
                  />
                </Form.Item>

                <Form.Item
                  name={[name, "files"]}
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
              </div>
            ))}
            <Form.Item>
              <Button
                disabled={!isCategorySet}
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Question
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List> */
}
