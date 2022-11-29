import {
  Button,
  Form,
  Input,
  Select,
  Typography,
  DatePicker,
  InputNumber,
  notification,
  Alert,
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Option } = Select;
const UpdateOpportunity = ({
  opportunity,
  getSignals,
  signalId = null,
  actionId = null,
  setOppToUpdate = null,
  setLayoutSize,
}) => {
  const [form] = Form.useForm();
  // const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const stages = useSelector((state) => state.stages.data);

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  const onFinish = async (values) => {
    notification.destroy();
    setLoading(true);
    if (opportunity?._id) {
      try {
        const { data } = await axios.put(
          "/opportunity/" + opportunity?._id,
          values
        );
        setLoading(false);

        if (data?.success) {
          actionId && updateActions();
          signalId && updateSignals();

          notification.success({
            placement: "bottomRight",
            message: "Deal updated",
          });
        }
      } catch (error) {
        setLoading(false);
        notification.error({
          placement: "bottomRight",
          message: "Deal cannot be updated .",
        });
      }
    }
  };

  const updateActions = async () => {
    try {
      const { data } = await axios.put("/actions/" + actionId, {
        isDone: true,
      });
      if (data?.success) {
        getSignals();
        // console.log("actions updated  ->>" + actionId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSignals = async () => {
    try {
      const { data } = await axios.put("/signals/" + signalId, {
        isDone: true,
      });
      if (data?.success) {
        // console.log("signales updated  ->>" + signalId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue({
      ...opportunity,
      closedate: moment(opportunity?.closedate),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunity]);

  // const getOpportunity = async () => {
  //   setLoading(true);
  //   if (opportunity?.id) {
  //     try {
  //       const { data } = await axios.get("/opportunity/" + opportunity?._id);
  //       setLoading(false);

  //       if (data?.success) {
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <>
      {opportunity?.name ? (
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={
              <>
                Stage&nbsp;
                <Typography.Text className="ant-form-text" type="secondary">
                  ( Optional )
                </Typography.Text>
              </>
            }
            name="stagename"
          >
            <Select
              disabled={loading}
              className="radiusInput"
              placeholder="Stage"
              size="medium"
              allowClear
              showSearch
            >
              {stages?.map((item, index) => (
                <Option key={index} value={item?.apiname}>
                  {item?.apiname}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <>
                Amount &nbsp;
                <Typography.Text className="ant-form-text" type="secondary">
                  ( Optional )
                </Typography.Text>
              </>
            }
            name="amount"
          >
            <InputNumber
              disabled={loading}
              className="radiusInput"
              size="medium"
              placeholder="Amount"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label={
              <>
                Close Date &nbsp;
                <Typography.Text className="ant-form-text" type="secondary">
                  ( Optional )
                </Typography.Text>
              </>
            }
            name="closedate"
          >
            <DatePicker
              disabled={loading}
              className="radiusInput"
              size="medium"
              placeholder="Close Date"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label={
              <>
                Next Step &nbsp;
                <Typography.Text className="ant-form-text" type="secondary">
                  ( Optional )
                </Typography.Text>
              </>
            }
            name="nextstep"
          >
            <Input
              disabled={loading}
              className="radiusInput"
              size="medium"
              placeholder="Next Step"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <div align="right">
              <Button
                className="radiusInput"
                disabled={loading}
                onClick={() => {
                  setLayoutSize();
                  setOppToUpdate();
                }}
              >
                Close
              </Button>
              &nbsp;
              <Button
                className="radiusInput"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <Alert
          showIcon
          message="No found opportunity"
          type="info"
          closable
          description=""
        />
      )}
    </>
  );
};

export default UpdateOpportunity;
