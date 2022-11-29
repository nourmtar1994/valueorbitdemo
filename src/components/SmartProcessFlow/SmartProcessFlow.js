import {
  CheckCircleFilled,
  CloseCircleFilled,
  DislikeOutlined,
  LikeOutlined,
  MinusCircleFilled,
  MinusCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  FaCommentDots,
  FaHome,
  FaMoon,
  FaRedoAlt,
  FaSun,
} from "react-icons/fa";
import Mentions from "rc-mentions";

import { Button, Card, Col, Row, Tooltip } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader/Loader";
import * as classes from "./SmartProcessFlow.module.css";
import AddNotes from "../Notes/AddNotes";
import History from "./History/History";
import Split from "react-split";
import Guidances from "../ChatBox/Guidances/Guidances";
const { Option } = Mentions;

const SmartProcessFlow = ({
  setMode,
  getOpportunity,
  getMessages,
  opportunity,
  processFlowData,
  activeCategory,
}) => {
  const MentionsRef = useRef(null);
  const [darkMode, setdarkMode] = useState(false);
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);
  const [contactList, setContactList] = useState();
  const [loading, setLoading] = useState(false);
  const [Target, setTarget] = useState(null);
  const [guide, setGuide] = useState("category");
  const [message, setMessage] = useState("");
  const [tagWord, setTagWord] = useState("");

  const [newNotes, setNewNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  const getContact = async () => {
    try {
      const { data } = await axios.get(
        "/contact/names/account/" + opportunity?.accountid
      );
      if (data?.success) {
        setContactList(data?.data?.map((item) => item?.name));
      }
    } catch (error) {
      console?.log(error);
    }
  };
  useEffect(() => {
    if (opportunity?.accountid) {
      getContact();
    }
    user && getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getNotes = async () => {
    try {
      const { data } = await axios.get(
        "/note/filteredby/?createdby=" + user?.originId
      );

      if (data?.success) {
        setNotes(
          data?.data?.filter(
            (item) => item?.opportunity?.idorigin === opportunity?.idorigin
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (newvalue) => {
    setValue(newvalue);
    setMessage(newvalue);

    if (newvalue === "@" && value === "") {
      setValue("@" + " ");
      setTimeout(() => {
        setValue(newvalue.replace(" ", ""));
      }, 300);
    }
  };

  const mentionOptionRenderer = () => {
    if (guide === "category") {
      return processFlowData?.categories?.map((categoryItem, Xindex) => {
        return categoryItem?.items?.map((optionItem, Yindex) => {
          return (
            <>
              <Option
                key={JSON.stringify({
                  type: "category",
                  category: {
                    id: categoryItem?._id,
                    name: categoryItem?.name,
                  },
                  question: {
                    id: optionItem?.id,
                    name: optionItem?.name,
                    ...optionItem,
                  },
                  options: optionItem?.options,
                })}
                value={" " + categoryItem?.name + " - " + optionItem?.name}
              >
                {Xindex +
                  1 +
                  "." +
                  (Yindex + 1) +
                  " - " +
                  categoryItem?.name +
                  " - " +
                  optionItem?.name}
              </Option>
            </>
          );
        });
      });
    } else if (guide === "actions") {
      if (Target && JSON.parse(Cookies.get("VO_USER_AUTH")).role === "sales") {
        return (
          <>
            <Option
              value=" Not Done"
              key={JSON.stringify({
                salesfeel: 0,
                value: 0,
                itemId: Target?.question?._id,
                type: "salesfeel",
                isrequest: false,
              })}
            >
              <CloseCircleFilled className={classes.icon_danger} /> Not Done
            </Option>
            <Option
              value=" In progress"
              key={JSON.stringify({
                salesfeel: 1,
                value: 1,
                itemId: Target?.question?._id,
                type: "salesfeel",
                isrequest: false,
              })}
            >
              <MinusCircleFilled className={classes.icon_warning} />{" "}
              {" In progress"}
            </Option>
            <Option
              value=" Done"
              key={JSON.stringify({
                salesfeel: 2,
                value: 2,
                itemId: Target?.question?._id,
                type: "salesfeel",
                isrequest: false,
              })}
            >
              <CheckCircleFilled className={classes.icon_success} /> Done
            </Option>
            {renderOptions(Target?.options)}
          </>
        );
      } else if (
        Target &&
        JSON.parse(Cookies.get("VO_USER_AUTH")).role === "manager"
      ) {
        return (
          <>
            <Option
              value=" To be reviewed"
              key={JSON.stringify({
                manageropinion: 0,
                value: 0,
                itemId: Target?.question?._id,
                type: "manageropinion",
                isrequest: true,
              })}
            >
              <DislikeOutlined className={classes.icon_danger} /> To be reviewed
            </Option>
            <Option
              value=" To be completed"
              key={JSON.stringify({
                manageropinion: 1,
                value: 1,
                itemId: Target?.question?._id,
                type: "manageropinion",
                isrequest: true,
              })}
            >
              <MinusCircleOutlined className={classes.icon_warning} /> To be
              completed
            </Option>
            <Option
              value=" Validated"
              key={JSON.stringify({
                manageropinion: 2,
                value: 2,
                itemId: Target?.question?._id,
                type: "manageropinion",
                isrequest: true,
              })}
            >
              <LikeOutlined className={classes.icon_success} /> Validated
            </Option>
            {renderOptions(Target?.options)}
          </>
        );
      }
    } else if (guide === "contact" || guide === "other") {
      return contactList?.map((item) => (
        <Option
          key={JSON.stringify({
            value: item,
            itemId: Target?.question?._id,
            type: "option",
            isrequest: user.role === "manager" ? true : false,
          })}
          value={" " + item}
        >
          {item}
        </Option>
      ));
    }
  };

  const onSelect = (option) => {
    let data = JSON.parse(option?.key);

    if (data?.type === "category") {
      setGuide("actions");
      setTarget(data);
      setValue("");
    } else if (data?.type === "text") {
      sendMessage(data, option?.value);
      setValue("");
    } else if (data?.type === "salesfeel" || data?.type === "manageropinion") {
      sendMessage(data, option?.value);
      setValue("");
    } else if (data?.type === "contact") {
      getContact();
      setGuide("contact");
      setValue("");
    } else if (data?.type === "other") {
      setContactList(data?.values);
      setGuide("other");
      setValue("");
    } else if (data?.type === "option") {
      sendMessage(data, "@" + option?.value);
      setValue("");
    } else if (data?.type === "reset") {
      setTarget(null);
      setValue("");
      setGuide("category");
    }
  };

  const sendMessage = async (reponse, note) => {
    setLoading(true);
    setTagWord(reponse.value);

    if (
      reponse.value !== "" &&
      reponse.value !== " " &&
      reponse.value !== null
    ) {
      try {
        const { data } = await axios.post(
          "/message/?opportunity_id=" +
            opportunity?._id +
            "&item_id=" +
            reponse?.itemId +
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

          setNewNotes([...newNotes, note]);
          setGuide("actions");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const renderOptions = (options) => {
    return options?.map((item) => (
      <Option
        value={" " + item?.name}
        key={JSON.stringify({
          itemId: Target?.question?._id,
          type: item?.type,
          values: item?.values,
        })}
      >
        <MoreOutlined className={classes.icon_success} /> {" " + item?.name}
      </Option>
    ));
  };

  return (
    <Card
      title={<div>NoteBook</div>}
      extra={
        <>
          <Tooltip title={"chat mode"}>
            <FaCommentDots
              className="action-icon"
              onClick={() => setMode("chat")}
              size={18}
            />
          </Tooltip>
          <Tooltip title={"Reset"}>
            <FaRedoAlt
              className="action-icon"
              onClick={() => {
                setTarget(null);
              }}
              size={18}
            />
          </Tooltip>
          {/* {darkMode ? (
            <Tooltip title={"Light Mode"}>
              <FaSun
                className="action-icon"
                onClick={() => setdarkMode(false)}
                size={18}
              />
            </Tooltip>
          ) : (
            <Tooltip title={"Dark Mode"}>
              <FaMoon
                className="action-icon"
                onClick={() => setdarkMode(true)}
                size={18}
              />
            </Tooltip>
          )} */}
        </>
      }
    >
      <Row
        className={
          classes.selectedCategory +
          " " +
          (darkMode ? classes.dark : classes.light)
        }
      >
        <Guidances opportunityId={opportunity?._id} tagWord={tagWord} />
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
          {loading && <Loader />}
          <Split
            // onDragEnd={(sizes) => setResizeDitect(sizes)}

            gutterSize={4}
            // sizes={layoutProcess === "horizontal"  ? [70, 30] : [100, 100]}
            sizes={[60, 40]}
            direction="horizontal"
            cursor="col-resize"
            className={"split-flex"} // You'll need to define this. check styles.css
          >
            <div>
              <>
                {Target && (
                  <>
                    <b>Category :</b> {Target?.category?.name}
                    <br />
                    <b>Item : </b> {Target?.question?.name}
                    {JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                      "manager" && (
                      <>
                        {Target?.question?.salesfeel === 0 && (
                          <Tooltip title="Not Done">
                            <CloseCircleFilled
                              className={classes.icon + " " + "icon_danger"}
                            />
                          </Tooltip>
                        )}
                        {Target?.question?.salesfeel === 1 && (
                          <Tooltip
                            title="In progress"
                            arrowPointAtCenter={false}
                          >
                            <MinusCircleFilled
                              className={classes.icon + " " + "icon_warning"}
                            />
                          </Tooltip>
                        )}
                        {Target?.question?.salesfeel === 2 && (
                          <Tooltip title="Done">
                            <CheckCircleFilled
                              className={classes.icon + " " + "icon_success"}
                            />
                          </Tooltip>
                        )}
                      </>
                    )}
                    {JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                      "sales" && (
                      <>
                        {Target?.question?.manageropinion === 0 && (
                          <Tooltip title="To be reviewed">
                            <DislikeOutlined
                              className={classes.icon + " " + "icon_danger"}
                            />
                          </Tooltip>
                        )}
                        {Target?.question?.manageropinion === 1 && (
                          <Tooltip
                            title="To be completed"
                            arrowPointAtCenter={false}
                          >
                            <MinusCircleOutlined
                              className={classes.icon + " " + "icon_warning"}
                            />
                          </Tooltip>
                        )}
                        {Target?.question?.manageropinion === 2 && (
                          <Tooltip title="Validated">
                            <LikeOutlined
                              className={classes.icon + " " + "icon_success"}
                            />
                          </Tooltip>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
              <Mentions
                autoSize
                placement="bottom"
                notFoundContent={<b key={"not_found"}>No found tags</b>}
                className={classes.mentionsInput}
                rows={1}
                ref={MentionsRef}
                loading={loading}
                style={{
                  fontSize: 16,
                  marginTop: 3,
                }}
                value={value}
                onChange={onChange}
                onSelect={onSelect}
                placeholder={"Type @ to start playing"}
                prefix={["@", Target && !value?.includes("@") && value]}
                split={"|"}
              >
                {user?.role && Target && (
                  <Option
                    key={JSON.stringify({
                      value: message?.replace("@", ""),
                      itemId: Target?.question?._id,
                      type: "text",
                      isrequest: user?.role === "manager" ? true : false,
                    })}
                    value={message?.replace("@", "")}
                  >
                    <b> message </b>: {message?.replace("@", "")}
                  </Option>
                )}
                {Target && (
                  <Option
                    key={JSON.stringify({
                      type: "reset",
                    })}
                    value={" home"}
                  >
                    <FaHome className={classes.icon_primary} />{" "}
                    <b className={classes.icon_primary}>Home</b>
                  </Option>
                )}
                {value?.includes("@") && mentionOptionRenderer()}
              </Mentions>
              &nbsp;
              <br />
              <Button onClick={() => setVisible(true)} type="primary">
                Save Notes
              </Button>
              <AddNotes
                getNotes={getNotes}
                visible={visible}
                setVisible={setVisible}
                notes={newNotes}
                userId={user?.originId}
                opportunityId={opportunity?.idorigin}
                setNewNotes={setNewNotes}
              />
            </div>
            <div>
              <History
                target=""
                playbook={processFlowData}
                category={Target?.category}
                question={Target?.question}
                activeKeyId={activeCategory}
              />
            </div>
          </Split>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Card>
  );
};

export default SmartProcessFlow;
