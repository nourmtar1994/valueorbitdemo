import React, { useEffect, useState } from "react";

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

const EditPlayBookModel = ({ visibility, IdPlayBook, getProcessFlow }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [managerList, setManagerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingManger, setloadingManger] = useState(false);

  useEffect(() => {
    getProcessFlowTemplate();
    visibility !== null && setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility]);

  useEffect(() => {
    getManager();
  }, []);

  const getProcessFlowTemplate = async () => {
    setLoading(true);
    if (IdPlayBook) {
      try {
        const { data } = await axios.get("/processflowtemplate/" + IdPlayBook);
        if (data.success) {
          form.setFieldsValue({
            name: data?.data?.name,
            managerusers: data?.data?.managerusers,
            description: data?.data?.description,
          });
          getProcessFlow();
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const getManager = async () => {
    setloadingManger(true);
    try {
      const { data } = await axios.get(
        "/processflowtemplate/availablemanager/go"
      );

      function getDifference(array1, array2) {
        return array1.filter((object1) => {
          return !array2.some((object2) => {
            return object1._id === object2._id;
          });
        });
      }

      let diff = getDifference(data?.all, data?.data);

      setManagerList([
        ...diff?.map((item) => {
          return { ...item, available: false };
        }),
        ...data?.data?.map((item) => {
          return { ...item, available: true };
        }),
      ]);
      setloadingManger(false);
      // } else {
      //   notification.error({
      //     message: "Error",
      //     description: "Cannot get manager list !",
      //     placement: "bottomRight",
      //   });
      // }
    } catch (error) {
      setloadingManger(false);

      notification.error({
        message: "Error",
        description: "Cannot get manager list !",
        placement: "bottomRight",
      });
    }
  };

  const handleOk = async (values) => {
    setLoading(true);
    if (IdPlayBook) {
      try {
        const { data } = await axios.put(
          "/processflowtemplate/" + IdPlayBook,
          values
        );
        setLoading(false);
        if (data.success) {
          notification.success({
            message: "Success",
            description: "Playbook updated",
            placement: "bottomRight",
          });
          getProcessFlow();
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Cannot update playbook",
          placement: "bottomRight",
        });
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const removeManager = async (managerid, processflowId) => {
    setloadingManger(true);
    try {
      const { data } = await axios.put(
        "/processflowtemplate/manager/remove?processflowtemplate_id=" +
          processflowId +
          "&manager_id=" +
          managerid
      );
      if (data?.success) {
      }
    } catch (error) {
      setloadingManger(false);
      console.log(error);
    }
  };

  const addManager = async (managerid, processflowId) => {
    setloadingManger(true);
    try {
      const { data } = await axios.put(
        "/processflowtemplate/manager/add?processflowtemplate_id=" +
          processflowId +
          "&manager_id=" +
          managerid
      );

      setloadingManger(false);
    } catch (error) {
      setloadingManger(false);
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title={"Edit Process Flow "}
        open={visible}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
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
            <Input placeholder="Name" disabled={loading} loading={loading} />
          </Form.Item>

          <Form.Item
            name={"managerusers"}
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
              loading={loadingManger}
              mode="tags"
              onDeselect={(e) => removeManager(e, IdPlayBook)}
              onSelect={(e) => addManager(e, IdPlayBook)}
            >
              {managerList?.map((item, index) => (
                <Option
                  key={index}
                  value={item._id}
                  disabled={!item?.available}
                >
                  {item.name}
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
            <TextArea
              placeholder="Description"
              disabled={loading}
              loading={loading}
            />
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
export default EditPlayBookModel;
