import React, { useEffect, useState } from "react";
//axios
import axios from "axios";
//Cookies
import Cookies from "js-cookie";
//ANDT DESIGN COMPONENTS
import { Input, Button, Tooltip, Row, Col, Divider } from "antd";
//CSS FILES
import * as classes from "./ChatBox.module.css";
//ICONS
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DislikeOutlined,
  LikeOutlined,
  LoadingOutlined,
  MinusCircleFilled,
  MinusCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import moment from "moment";

//Scroll
import { useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import UploadFile from "./UploadFile";
import Options from "./Options/Options";
import { useFocus } from "../Services/Hooks/Hooks";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Guidances from "./Guidances/Guidances";

const ChatBox = ({
  ChildItem,
  accountid,
  getOpportunity,
  getMessages = null,
  oppId,
}) => {
  let { id } = useParams();
  const [user, setUser] = useState(null);

  const [messageText, setMessageText] = useState("");
  const [tagWord, setTagWord] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const [loading, setLaoding] = useState(false);
  const [inputRef, setInputFocus] = useFocus();

  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);
  useEffect(() => {
    setMessagesList(ChildItem?.messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ChildItem]);

  const handleQuestionAnsewer = (response) => {
    setLaoding(true);
    sendMessage({
      value: response.value,
      type: response.type,
      isrequest: response.isrequest,
    });
  };

  const sendMessage = async (reponse) => {
    setTagWord(reponse.value);
    if (
      reponse.value !== "" &&
      reponse.value !== " " &&
      reponse.value !== null
    ) {
      setMessageText("");
      setMessagesList([
        ...messagesList,
        {
          value: reponse.value + "",
          type: reponse.type,
          isrequest: reponse.isrequest,
        },
      ]);
      try {
        const { data } = await axios.post(
          "/message/?opportunity_id=" +
            (id || oppId) +
            "&item_id=" +
            ChildItem?._id +
            "&user_id=" +
            user?.originId,
          {
            value: reponse.value + "",
            type: reponse.type,
            isrequest: reponse.isrequest,
          }
        );
        if (data.success) {
          getOpportunity();
          getMessages && getMessages();
        }
        setTimeout(() => {
          setLaoding(false);
        }, 1000);
      } catch (error) {
        setMessageText(reponse.value);
        setMessagesList(messagesList.pop());
        setLaoding(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className={classes.chatLayout}>
        <Guidances opportunityId={id} tagWord={tagWord} />

        {/* sales feel */}
        <div
          className={classes.discussion_icon}
          hidden={
            JSON.parse(Cookies.get("VO_USER_AUTH")).role === "manager" && true
          }
          align="center"
        >
          {loading ? (
            <LoadingOutlined
              className={classes.loaderIcon + " " + classes.icon_primary}
            />
          ) : (
            <>
              <Tooltip title="Not Done">
                <CloseCircleFilled
                  className={
                    classes.icon +
                    " " +
                    (ChildItem?.salesfeel === 0 && classes.icon_danger)
                  }
                  onClick={(e) => {
                    handleQuestionAnsewer({
                      salesfeel: 0,
                      value: 0,
                      itemId: ChildItem?._id,
                      type: "salesfeel",
                      isrequest: false,
                    });
                  }}
                />
              </Tooltip>
              <Tooltip title="In progress" arrowPointAtCenter={false}>
                <MinusCircleFilled
                  className={
                    classes.icon +
                    " " +
                    (ChildItem?.salesfeel === 1 && classes.icon_warning)
                  }
                  onClick={() => {
                    handleQuestionAnsewer({
                      salesfeel: 1,
                      value: 1,
                      itemId: ChildItem?._id,
                      type: "salesfeel",
                      isrequest: false,
                    });
                  }}
                />
              </Tooltip>
              <Tooltip title="Done">
                <CheckCircleFilled
                  className={
                    classes.icon +
                    " " +
                    (ChildItem?.salesfeel === 2 && classes.icon_success)
                  }
                  onClick={() => {
                    handleQuestionAnsewer({
                      salesfeel: 2,
                      value: 2,
                      itemId: ChildItem?._id,
                      type: "salesfeel",
                      isrequest: false,
                    });
                  }}
                />
              </Tooltip>
            </>
          )}
        </div>
        {/* Icon manager */}
        <div
          className={classes.discussion_icon}
          hidden={
            JSON.parse(Cookies.get("VO_USER_AUTH")).role === "sales" && true
          }
          align="center"
        >
          {loading ? (
            <LoadingOutlined
              className={classes.loaderIcon + " " + classes.icon_primary}
            />
          ) : (
            <>
              <Tooltip title="To be reviewed">
                <DislikeOutlined
                  className={
                    classes.icon +
                    " " +
                    (ChildItem?.manageropinion === 0 && classes.icon_danger)
                  }
                  onClick={() => {
                    handleQuestionAnsewer({
                      manageropinion: 0,
                      itemId: ChildItem?._id,
                      type: "manageropinion",
                      isrequest: true,
                      value: 0,
                    });
                  }}
                />
              </Tooltip>

              <Tooltip title="To be completed">
                <MinusCircleOutlined
                  className={
                    classes.icon +
                    " " +
                    (ChildItem?.manageropinion === 1 && classes.icon_warning)
                  }
                  onClick={() => {
                    handleQuestionAnsewer({
                      manageropinion: 1,
                      itemId: ChildItem?._id,
                      type: "manageropinion",
                      isrequest: true,
                      value: 1,
                    });
                  }}
                />
              </Tooltip>
              <Tooltip title="Validated">
                <LikeOutlined
                  className={
                    classes.icon +
                    " " +
                    (ChildItem?.manageropinion === 2 && classes.icon_success)
                  }
                  onClick={() => {
                    handleQuestionAnsewer({
                      manageropinion: 2,
                      itemId: ChildItem?._id,
                      type: "manageropinion",
                      isrequest: true,
                      value: 2,
                    });
                  }}
                />
              </Tooltip>
            </>
          )}
        </div>
        <Row className={classes.chatMessageContainer}>
          {
            <div className={classes.collapseMessages}>
              {showMessage ? (
                <Tooltip title="Show messages">
                  <FaAngleDown
                    cursor={"pointer"}
                    onClick={() => {
                      setInputFocus(true);
                      setShowMessage(false);
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Hide messages">
                  <FaAngleUp
                    cursor={"pointer"}
                    onClick={() => {
                      setShowMessage(true);
                    }}
                  />
                </Tooltip>
              )}
            </div>
          }
          {!showMessage && (
            <Col xs={{ span: 24 }} hidden={showMessage}>
              <ScrollToBottom
                className={"scrolltoBottomBoxMessages"}
                initialScrollBehavior="smooth"
                followButtonClassName={"buttonScrollButton"}
              >
                <div className={classes.boxMessages}>
                  {messagesList?.map((message, index) => (
                    <div className={classes.messageContainer} key={index}>
                      <div
                        className={
                          message?.isrequest &&
                          JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                            "manager"
                            ? classes.send
                            : message?.isrequest &&
                              JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                                "sales"
                            ? classes.reception
                            : !message?.isrequest &&
                              JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                                "sales"
                            ? classes.send
                            : !message?.isrequest &&
                              JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                                "manager" &&
                              classes.reception
                        }
                      >
                        {message?.type === "salesfeel" ? (
                          <>
                            {ChildItem?.name} &nbsp;
                            {message?.value === "0" ? (
                              <>
                                <CloseCircleFilled
                                  style={{ color: "red", fontSize: "1.3em" }}
                                />
                              </>
                            ) : message?.value === "1" ? (
                              <>
                                <MinusCircleFilled
                                  style={{ color: "orange", fontSize: "1.3em" }}
                                />
                              </>
                            ) : (
                              message?.value === "2" && (
                                <>
                                  <CheckCircleFilled
                                    style={{
                                      color: "#52c41a",
                                      fontSize: "1.3em",
                                    }}
                                  />
                                </>
                              )
                            )}
                          </>
                        ) : message?.type === "manageropinion" ? (
                          <>
                            {ChildItem?.name} &nbsp;
                            {message?.value === "0" ? (
                              <>
                                <DislikeOutlined
                                  style={{ color: "red", fontSize: "1.3em" }}
                                />
                              </>
                            ) : message?.value === "1" ? (
                              <>
                                <MinusCircleOutlined
                                  style={{ color: "orange", fontSize: "1.3em" }}
                                />
                              </>
                            ) : (
                              message?.value === "2" && (
                                <>
                                  <LikeOutlined
                                    style={{
                                      color: "#52c41a",
                                      fontSize: "1.3em",
                                    }}
                                  />
                                </>
                              )
                            )}
                          </>
                        ) : message?.type === "text" ? (
                          message?.value
                        ) : (
                          message?.type === "option" && (
                            <a href="#/lll" className={classes.chatLink}>
                              {" "}
                              @{message?.value}{" "}
                            </a>
                          )
                        )}
                      </div>
                      <Divider
                        className={classes.timeInformation}
                        orientation="center"
                      >
                        <Tooltip
                          title={moment(message?.createddate).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        >
                          <span>{moment(message?.createddate).fromNow()}</span>
                        </Tooltip>
                      </Divider>
                    </div>
                  ))}
                </div>
              </ScrollToBottom>
            </Col>
          )}
        </Row>
        {!showMessage && (
          <Row className={classes.chatControlContainer}>
            <Col span={24} className={classes.chatBoxSpace}>
              <Col xs={{ span: 24 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage({
                      value: messageText,
                      type: "text",
                      isrequest:
                        JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                        "manager"
                          ? true
                          : false,
                    });
                  }}
                >
                  <Input
                    ref={inputRef}
                    size="large"
                    contextMenu={<h1>s</h1>}
                    inputMode="text"
                    className={classes.textareaMessage}
                    placeholder="Type here ..."
                    value={messageText}
                    onChange={(e) => {
                      setShowMessage(false);
                      setMessageText(e.target.value);
                    }}
                  ></Input>

                  <Tooltip title="Send message" placement="bottomRight">
                    <Button
                      disabled={messageText === "" ? true : false}
                      className={classes.sendBtn}
                      type="link"
                      size="middle"
                      htmlType="button"
                      icon={<SendOutlined />}
                      onClick={(e) => {
                        sendMessage({
                          value: messageText,
                          type: "text",
                          isrequest:
                            JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                            "manager"
                              ? true
                              : false,
                        });
                      }}
                    ></Button>
                  </Tooltip>
                </form>
              </Col>
            </Col>
            <Divider style={{ margin: "7px 0 " }} />
            <Col className={classes.actionsChatBow} span={24}>
              <UploadFile />
              <Options
                accountid={accountid}
                data={ChildItem}
                sendMessage={sendMessage}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};
export default ChatBox;
