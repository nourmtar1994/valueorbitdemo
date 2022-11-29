import React, { useEffect, useRef, useState } from "react";
import { Button, Input, InputNumber, Select, Space } from "antd";
import { LineOutlined, SendOutlined } from "@ant-design/icons";
// import * as classes from "./Options.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const { Option } = Select;

const Options = ({ data = null, sendMessage, accountid = null }) => {
  const inputRef = useRef(null);
  const [contactList, setContactList] = useState([]);
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
  }, []);

  useEffect(() => {
    const getContact = async () => {
      try {
        const { data } = await axios.get("/contact/names/account/" + accountid);
        if (data?.success) {
          setContactList(data?.data?.map((item) => item?.name));
        }
      } catch (error) {
        console?.log(error);
      }
    };
    if (accountid) {
      getContact();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Space>
      <LineOutlined rotate={90} style={{ fontSize: "1.1em", color: "grey" }} />

      {data?.options?.map((item, index) =>
        item?.type === "contact" ||
        item?.type === "multiplechoice" ||
        item?.type === "singlechoice" ? (
          <>
            <Select
              mode={item?.type === "multiplechoice" ? "multiple" : false}
              key={index}
              bordered={false}
              size="small"
              ref={inputRef}
              onChange={(e) => setValue(e)}
              style={{ minWidth: "100px" }}
              placeholder={item?.name}
              showSearch
              allowClear
              value={value}
            >
              {item?.type === "contact"
                ? contactList.map((opt, index) => (
                    <Option value={opt} key={index}>
                      {opt}
                    </Option>
                  ))
                : item?.values?.map((opt, index) => (
                    <Option value={opt} key={index}>
                      {opt}
                    </Option>
                  ))}
            </Select>
          </>
        ) : item?.type === "numeric" ? (
          <InputNumber
            onPressEnter={(e) => {
              if (e) {
                sendMessage({
                  value: e.target.value + "",
                  type: "option",
                  isrequest:
                    JSON.parse(Cookies.get("VO_USER_AUTH")).role === "manager"
                      ? true
                      : false,
                });
                setValue(null);
              }
            }}
            value={value}
            onChange={(e) => setValue(e)}
            size="small"
            style={{ width: 100 }}
            placeholder={item?.name}
          />
        ) : (
          item?.type === "percentage" && (
            <Input
              onPressEnter={(e) => {
                if (e) {
                  sendMessage({
                    value: e.target.value + "",
                    type: "option",
                    isrequest:
                      JSON.parse(Cookies.get("VO_USER_AUTH")).role === "manager"
                        ? true
                        : false,
                  });
                  setValue(null);
                }
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="small"
              style={{ width: 100 }}
              placeholder={item?.name}
            />
          )
        )
      )}

      {value && (
        <Button
          style={{ marginRight: 5 }}
          icon={<SendOutlined />}
          size="small"
          type="ghost"
          onClick={() => {
            if (value) {
              setValue();
              sendMessage({
                value: value,
                type: "option",
                isrequest:
                  JSON.parse(Cookies.get("VO_USER_AUTH")).role === "manager"
                    ? true
                    : false,
              });
            }
          }}
        />
      )}
    </Space>
  );
};

export default Options;
