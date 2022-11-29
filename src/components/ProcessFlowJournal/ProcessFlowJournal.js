import React from "react";

import {
  Avatar,
  Badge,
  Card,
  Comment,
  Result,
  Select,
  Tooltip,
  Typography,
} from "antd";
import Loader from "../Badge/Loader/Loader";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DislikeOutlined,
  LikeOutlined,
  MinusCircleFilled,
  MinusCircleOutlined,
} from "@ant-design/icons";

import * as classes from "./ProcessFlowJournal.module.css";
import moment from "moment";

const { Option } = Select;

const ProcessFlowJournal = ({
  data,
  selectEdCategory,
  setSelectEdCategory,
  setMessageLoading,
  messageLoading,
  messages,
  opportunity,
}) => {
  return (
    <Card
      extra={
        <Select
          size="middle"
          value={selectEdCategory}
          allowClear
          showSearch
          placeholder="Category"
          style={{ minWidth: 120 }}
          onChange={(category) => {
            setSelectEdCategory(category);
            setMessageLoading(true);
          }}
        >
          {data?.categories?.map((item, index) => (
            <Option key={index} value={item?._id}>
              {item?.name}
            </Option>
          ))}
        </Select>
      }
      title={<div>Journal</div>}
      bodyStyle={{ padding: "3px 0px 0px 10px" }}
    >
      {messageLoading ? (
        <>
          <br />
          <br />
          <br />
          <Loader />
        </>
      ) : (
        <ScrollToBottom
          initialScrollBehavior="smooth"
          className={"scrolltoBottom"}
          followButtonClassName={"buttonScrollButton"}
        >
          {messages?.length > 0 ? (
            messages?.map((item, index) => (
              <Badge.Ribbon
                key={index}
                text={item?.isrequest ? "M" : "S"}
                color={item?.isrequest ? "red" : "green"}
              >
                <Comment
                  // actions={actions}
                  author={
                    <Typography.Text
                      type="secondary"
                      className={classes.userInfoMessage}
                    >
                      {item?.isrequest
                        ? opportunity?.salesuser?.manageruser?.username
                        : opportunity?.salesuser?.username}
                    </Typography.Text>
                  }
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#00417e",
                        verticalAlign: "middle",
                        textTransform: "uppercase",
                      }}
                      size="large"
                    >
                      {item?.isrequest
                        ? opportunity?.salesuser?.manageruser?.lastname[0] +
                          opportunity?.salesuser?.manageruser?.firstname[0]
                        : opportunity?.salesuser?.lastname[0] +
                          opportunity?.salesuser?.firstname[0]}
                    </Avatar>
                  }
                  content={
                    <>
                      <b>
                        {(item?.item?.category?._id !== selectEdCategory
                          ? item?.item?.category?.name + " - "
                          : "") + item?.item?.name}
                      </b>
                      <p>
                        {item?.type === "salesfeel" ? (
                          item?.value === "0" ? (
                            <>
                              <CloseCircleFilled
                                className={
                                  classes.icon + " " + classes.icon_danger
                                }
                              />
                            </>
                          ) : item?.value === "1" ? (
                            <>
                              <MinusCircleFilled
                                className={
                                  classes.icon + " " + classes.icon_warning
                                }
                              />
                            </>
                          ) : (
                            item?.value === "2" && (
                              <>
                                <CheckCircleFilled
                                  className={
                                    classes.icon + " " + classes.icon_success
                                  }
                                />
                              </>
                            )
                          )
                        ) : item?.type === "manageropinion" ? (
                          item?.value === "0" ? (
                            <>
                              <DislikeOutlined
                                className={
                                  classes.icon + " " + classes.icon_danger
                                }
                              />
                            </>
                          ) : item?.value === "1" ? (
                            <>
                              <MinusCircleOutlined
                                className={
                                  classes.icon + " " + classes.icon_warning
                                }
                              />
                            </>
                          ) : (
                            item?.value === "2" && (
                              <>
                                <LikeOutlined
                                  className={
                                    classes.icon + " " + classes.icon_success
                                  }
                                />
                              </>
                            )
                          )
                        ) : item?.type === "text" ? (
                          item?.value
                        ) : (
                          item?.type === "option" && (
                            <Typography.Link>@ {item?.value}</Typography.Link>
                          )
                        )}
                      </p>
                    </>
                  }
                  datetime={
                    <div className={classes.messageTime}>
                      <Tooltip
                        title={moment(item?.createddate).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      >
                        <span>{moment(item?.createddate).fromNow()}</span>
                      </Tooltip>
                    </div>
                  }
                />
              </Badge.Ribbon>
            ))
          ) : (
            <>
              <Result
                status="404"
                subTitle="Sorry, this category that you choosen does not contain any action."
              />
            </>
          )}
        </ScrollToBottom>
      )}
    </Card>
  );
};

export default ProcessFlowJournal;
