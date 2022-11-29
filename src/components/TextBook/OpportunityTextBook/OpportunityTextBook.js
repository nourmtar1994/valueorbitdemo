import {
  CheckCircleFilled,
  CloseCircleFilled,
  DislikeOutlined,
  LikeOutlined,
  Loading3QuartersOutlined,
  MinusCircleFilled,
  MinusCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  message as messageNotif,
  notification,
  Row,
  Typography,
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarTimes,
  FaChessQueen,
  FaCommentDots,
  FaDollarSign,
  FaHome,
  FaLayerGroup,
  FaStepForward,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateOpportunityItem } from "../../../redux/Slices/Opportunity.slices";
import Loader from "../../SmartProcessFlow/Loader/Loader";
import AddNotes from "../../Notes/AddNotes";
import OppoHistory from "../History/OppoHistory";

import History from "../../SmartProcessFlow/History/History";

import * as classes from "./OpportunityTextBook.module.css";
import Mentions from "rc-mentions";
import Header from "../Header/Header";
import Split from "react-split";
import { useRef } from "react";

const { Option } = Mentions;

const OpportunityTextBook = ({ setIsOpen, isOpen }) => {
  const mentionsRef = useRef(null);
  const dispatch = useDispatch();
  const opportunities = useSelector(
    (state) => state.opportunity?.defaultList || []
  );
  const stagenameList = useSelector((state) => state.stages?.data || []);

  const [user, setUser] = useState(null);
  const [newNotes, setNewNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [guide, setGuide] = useState("account");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedPlaybook, setselectedPlaybook] = useState(null);
  const [opportunityList, setopportunityList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fieldToUpdate, setFieldToUpdate] = useState();
  const [contactList, setContactList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newUpdates, setNewUpdates] = useState(null);
  const [loadingPlayBook, setLoadingPlayBook] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      mentionsRef?.current.focus();
    }, 10);
  }, [isOpen]);

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  useEffect(() => {
    setAccountList([
      ...new Set(opportunities.map((item) => item.account && item.account)),
    ]);
  }, [opportunities]);

  useEffect(() => {
    if (selectedAccount) {
      setopportunityList(
        opportunities?.filter(
          (item) => item?.account?._id === selectedAccount?.id
        )
      );
    }
  }, [selectedAccount]);

  useEffect(() => {
    !selectedOpportunity && setNewNotes([]);
  }, [selectedOpportunity]);

  const stringDetector = (string) => {
    // setFieldToUpdate({
    //   name: value + "" || "",
    //   value: selectedOpportunity?.values[data?.name] + "",
    //   objname: data?.name,
    // });
    if (selectedAccount && selectedOpportunity) {
      if (string.includes("@amount")) {
        setselectedPlaybook(null);
        setSelectedCategory(null);
        setGuide("oppoActions");
        setFieldToUpdate({
          name: value + "" || "",
          value: selectedOpportunity?.values["amount"] + "",
          objname: "amount",
          label: "Amount",
          type: "fieldValue",
        });
      }

      if (string.includes("@stagename")) {
        setselectedPlaybook(null);
        setSelectedCategory(null);
        setGuide("oppoActions");
        setGuide("stageNameList");
        setFieldToUpdate({
          name: value + "" || "",
          value: selectedOpportunity?.values["stagename"] + "",
          objname: "stagename",
          label: "Stage Name",
          type: "fieldValue",
        });
      }

      if (string.includes("@nextstep")) {
        setselectedPlaybook(null);
        setGuide("oppoActions");

        setFieldToUpdate({
          value: selectedOpportunity?.values["nextstep"] + "",
          objname: "nextstep",
          label: "Next Step",
          type: "fieldValue",
        });
      }
      if (string.includes("@closedate")) {
        setselectedPlaybook(null);
        setGuide("oppoActions");
        setFieldToUpdate({
          value: selectedOpportunity?.values["closedate"] + "",
          objname: "closedate",
          label: "Close Date",
          type: "fieldValue",
        });
      }
    }
  };

  const smartInfoText = () => {
    if (guide === "account") {
      return "Type @ to show accounts list.";
    }
    if (guide === "opportunity") {
      return "Type @ to show opportunities list.";
    }
    if (guide === "oppoAction") {
      return "Type @ to show actions.";
    }
    if (guide === "oppoActions") {
      return (
        <>
          Type ( @amount | @stagename | @nextstep | @closedate ) to update
          opportunity.
          <br />
          Type @playbook to enter the playbook.
        </>
      );
    }
    if (guide === "playbook") {
      return "Type @ to show Category/Question List.";
    }
    if (guide === "playbookActions") {
      return "Type @ to show PlayBook actions.";
    }
  };

  const getProcessFlow = async (id, reponse = null) => {
    setLoadingPlayBook(true);
    try {
      const { data } = await axios.get("/opportunity/" + id);
      setcategoryList(data?.data?.processflow);
      setLoadingPlayBook(false);
      setselectedPlaybook({
        id: data?.data?.processflow?._id,
        name: data?.data?.processflow?.name,
      });
      reponse &&
        setSelectedCategory({
          ...selectedCategory,
          question: {
            ...selectedCategory?.question,
            [reponse?.isrequest ? "manageropinion" : "salesfeel"]:
              reponse?.value,
          },
        });
    } catch (error) {
      setLoadingPlayBook(false);
    }
  };

  const getContact = async () => {
    try {
      const { data } = await axios.get(
        "/contact/names/account/" + selectedOpportunity?.values?.accountid
      );
      if (data?.success) {
        setContactList(data?.data?.map((item) => item?.name));
      }
    } catch (error) {
      console?.log(error);
    }
  };

  const updateOpportunity = async (target = null, id, obj, value) => {
    setLoading(true);
    notification.destroy();
    let route = null;
    let noteType = null;
    let noteBody =
      Object.keys(obj)[0] + " changed to " + obj[Object.keys(obj)[0]];
    setNewNotes([...newNotes, noteBody]);

    if (target === "stagename") {
      route = "stagename";
      noteType = "UpdateStage";
    } else if (target === "closedate") {
      route = "closedate";
      noteType = "UpdateCloseDate";
    } else if (target === "amount") {
      route = "amount";
      obj[Object.keys(obj)[0]] = parseInt(obj[Object.keys(obj)[0]]);
      noteType = "UpdateAmount";
    } else if (target === "nextstep") {
      route = "nextstep";
      noteType = "UpdateNextStep";
    } else if (target === "managerjudgment") {
      route = "";
    }
    if (id && target) {
      try {
        const { data } = await axios.put(
          "/opportunity/" + route + "/" + id + "/" + user?.originId,
          obj
        );
        if (data?.success) {
          setNewUpdates({
            createddate: Date.now(),
            description: noteType,
            id: "Id" + Date?.now(),
            lastvalue: selectedOpportunity?.values?.[target] || "",
            newvalue: obj[Object.keys(obj)[0]],
            opportunity: selectedOpportunity?.id,
            opportunityid: selectedOpportunity?.values?.ownerid,
            resource: "",
            stage: "",
          });
          messageNotif.success(Object.keys(obj)[0] + "updated");

          dispatch(
            updateOpportunityItem({
              opportunityId: id,
              target,
              value: obj,
            })
          );

          setSelectedOpportunity({
            ...selectedOpportunity,
            values: {
              ...selectedOpportunity.values,
              ...obj,
            },
          });
          // addNotes(
          //   selectedOpportunity?.id,
          //   noteType,
          //   noteBody,
          //   selectedOpportunity?.values[fieldToUpdate],
          //   obj[Object.keys(obj)[0]]
          // );
          setFieldToUpdate({
            ...fieldToUpdate,
            value: value,
          });
          // resetMentions();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);

        notification.error({
          placement: "bottomRight",
          message: "Deal cannot be updated",
          description: (
            <>
              <Button
                danger
                onClick={() => updateOpportunity(target, id, obj, value)}
              >
                Retry
              </Button>
            </>
          ),
        });
      }
    }
  };

  const sendMessage = async (reponse, note) => {
    setNewNotes([...newNotes, note]);

    setLoadingPlayBook(true);
    if (
      reponse.value !== "" &&
      reponse.value !== " " &&
      reponse.value !== null
    ) {
      try {
        const { data } = await axios.post(
          "/message/?opportunity_id=" +
            selectedOpportunity?.id +
            "&item_id=" +
            reponse?.itemId +
            "&user_id=" +
            user?.originId,
          {
            value:
              (reponse?.type === "text"
                ? reponse.value?.replace(/"/g, '\\"')
                : reponse.value) + "",
            type: reponse.type,
            isrequest: reponse.isrequest,
            note: reponse?.note,
          }
        );
        // setUpdateDetector(Date.now());
        getProcessFlow(selectedOpportunity?.id);
        // setSelectedCategory({
        //   ...selectedCategory,
        //   question: {
        //     ...selectedCategory?.question,
        //     message: selectedCategory?.question?.message.push({
        //       value: reponse.value + "",
        //       type: reponse.type,
        //       isrequest: reponse.isrequest,
        //       note: reponse?.note,
        //       createddate: Date.now(),
        //     }),
        //   },
        // });
        setLoadingPlayBook(false);
      } catch (error) {
        setLoadingPlayBook(false);
      }
    }
  };

  const playbookActions = () => {
    if (
      selectedCategory &&
      JSON.parse(Cookies.get("VO_USER_AUTH")).role === "sales"
    ) {
      return (
        <>
          <Option
            value=" Not Done"
            key={JSON.stringify({
              salesfeel: 0,
              value: 0,
              itemId: selectedCategory?.question?._id,
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
              itemId: selectedCategory?.question?._id,
              type: "salesfeel",
              isrequest: false,
            })}
          >
            <MinusCircleFilled className={classes.icon_warning} /> In progress
          </Option>
          <Option
            value=" Done"
            key={JSON.stringify({
              salesfeel: 2,
              value: 2,
              itemId: selectedCategory?.question?._id,
              type: "salesfeel",
              isrequest: false,
            })}
          >
            <CheckCircleFilled className={classes.icon_success} /> Done
          </Option>
          {renderOptions(selectedCategory?.options)}
        </>
      );
    } else if (
      selectedCategory &&
      JSON.parse(Cookies.get("VO_USER_AUTH")).role === "manager"
    ) {
      return (
        <>
          <Option
            value=" To be reviewed"
            key={JSON.stringify({
              manageropinion: 0,
              value: 0,
              itemId: selectedCategory?.question?._id,
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
              itemId: selectedCategory?.question?._id,
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
              itemId: selectedCategory?.question?._id,
              type: "manageropinion",
              isrequest: true,
            })}
          >
            <LikeOutlined className={classes.icon_success} /> Validated
          </Option>
          {renderOptions(selectedCategory?.options)}
        </>
      );
    }
  };

  const onChange = (newvalue) => {
    // let array = newvalue?.split('@') ;
    setValue(newvalue);

    if (newvalue[newvalue?.length - 1] === "@") {
      setValue(newvalue + " ");
      setTimeout(() => {
        setValue(newvalue.replace(" ", ""));
      }, 300);
      return;
    }

    if (
      guide === "stageNameList" &&
      !newvalue?.toLowerCase()?.includes("@stageNameList")
    ) {
      setGuide("oppoActions");
      setFieldToUpdate(null);
    }

    if (
      fieldToUpdate &&
      !newvalue?.toLowerCase()?.includes("@amount") &&
      !newvalue?.toLowerCase()?.includes("@nextstep") &&
      !newvalue?.toLowerCase()?.includes("@closedate")
    ) {
      setFieldToUpdate(null);
    }
    // fieldToUpdate?.objname;

    if (
      guide === "updateAmount" ||
      guide === "updateNextStep" ||
      guide === "updateCloseDate" ||
      guide === "updateStageName" ||
      guide === "updateForecastCategoryName"
    ) {
      setValue(newvalue.replace("@", ""));
      setValue(newvalue.replace("=", ""));
      setValue(newvalue.replace(":", ""));
    }

    const arrayOfTags = newvalue.split("|");
    // if (fieldToUpdate.name === newvalue) {
    //   return;
    // }
    setValue(newvalue);

    if (guide === "playbookActions") {
      setMessage(arrayOfTags[arrayOfTags?.length - 1]);
    }
    if (newvalue === "@" && value === "") {
      setValue("@" + " ");
      setTimeout(() => {
        setValue(newvalue.replace(" ", ""));
      }, 300);
    }
    if (guide !== "account") {
      stringDetector(newvalue);
    }
  };

  const onSelect = (option) => {
    let data = JSON.parse(option?.key);
    let value = option?.value;

    console.log(data?.type);
    if (data?.type === "setfield") {
      stringDetector("@" + data?.name);
      if (data?.name === "stagename") {
        setValue("@" + data?.name);

        return;
      }

      setValue("@" + data?.name + ":   ");
      stringDetector("@" + data?.name);
    }

    if (data?.type === "selectField") {
      setGuide("oppoActions");
      setFieldToUpdate(null);
      setValue("");
    }

    if (data?.type === "reset") {
      setGuide("account");
      setValue("");
      setSelectedAccount(null);
      setSelectedOpportunity(null);
      setSelectedCategory(null);
      setFieldToUpdate(null);
      setselectedPlaybook(null);
    }

    if (data?.type === "account") {
      setValue("");
      setSelectedAccount({
        id: data?.accountId,
        name: data?.name,
      });
      setGuide("opportunity");
    }
    if (data?.type === "opportunity") {
      setValue("");
      setSelectedOpportunity({
        id: data?.oppotunityId,
        name: data?.name,
        values: data?.values,
      });
      setSelectedCategory("");
      setGuide("oppoActions");
    }
    if (data?.type === "playbook") {
      setFieldToUpdate(null);
      setValue("");
      getProcessFlow(data?.oppotunityId);
      setGuide("playbook");
      setSelectedCategory(null);
    }
    if (data?.type === "category") {
      setFieldToUpdate(null);
      setValue("");
      setSelectedCategory(data);
      setGuide("playbookActions");
    }
    if (data.type === "manageropinion" || data?.type === "salesfeel") {
      setValue("");
      sendMessage(data, option?.value);
      setGuide("playbookActions");
    }
    if (data?.type === "text") {
      setValue("");
      sendMessage(data, option?.value);
      setGuide("playbookActions");
    }
    if (
      data?.type === "updateAmount" ||
      data?.type === "updateNextStep" ||
      data?.type === "updateCloseDate"
    ) {
      setTimeout(() => {
        setValue("");
      }, 10);

      setFieldToUpdate({
        label: value + "" || "",
        value: selectedOpportunity?.values[data?.name] + "",
        objname: data?.name,
      });
      setGuide("setValue");
    } else if (data?.type === "updateForecastCategoryName") {
      setFieldToUpdate({
        label: value + "" || "",
        value: selectedOpportunity?.values[data?.name] + "",
        objname: data?.name,
      });
      setGuide("forecastCategoryList");
      setValue("");
    } else if (data?.type === "updateStageName") {
      setFieldToUpdate({
        label: value + "" || "",
        value: selectedOpportunity?.values[data?.name] + "",
        objname: data?.name,
      });
      setGuide("stageNameList");
      setValue("");
    } else if (data?.type === "contact") {
      getContact();
      setGuide("contact");
      setValue("");
    } else if (data?.type === "other") {
      setValue("");
      setContactList(data?.values);
      setGuide("other");
    } else if (data?.type === "option") {
      setValue("");
      sendMessage(data, "@option:" + option?.value);
      setGuide("playbookActions");
    } else if (data?.type === "fieldValue") {
      setValue("");
      updateOpportunity(
        data?.objname,
        selectedOpportunity?.id,
        {
          [data?.objname]: data?.value,
        },
        data?.value
      );
      setGuide("oppoActions");
    } else if (data?.type === "back") {
      setGuide(data?.guide);
      setValue("");
      if (data?.guide === "account") {
        setSelectedAccount(null);
        setSelectedOpportunity(null);
        setselectedPlaybook(null);
        setFieldToUpdate(null);
      }
      if (data?.guide === "opportunity") {
        setSelectedOpportunity(null);
        setselectedPlaybook(null);
        setFieldToUpdate(null);
      }
      if (data?.guide === "playbook") {
        setSelectedCategory(null);
      }
      if (data?.guide === "oppoActions") {
        setSelectedCategory(null);
        setselectedPlaybook(null);
      }
    }
  };

  const mentionOptionRenderer = () => {
    if (guide === "account") {
      return accountList?.map((item, index) => (
        <Option
          key={JSON.stringify({
            id: index,
            name: item?.name,
            accountId: item?._id,
            type: "account",
          })}
          value={" " + item?.name}
        >
          <FaUserCircle className={classes.icon_primary} /> {item?.name}
        </Option>
      ));
    }

    if (guide === "opportunity") {
      return opportunityList?.map((item, index) => (
        <React.Fragment key={index}>
          <Option
            key={JSON.stringify({
              index: index,
              name: item?.name,
              oppotunityId: item?._id,
              type: "opportunity",
              values: item,
            })}
            value={" " + item?.name}
          >
            <FaChessQueen className={classes.icon_warning} /> {item?.name}
          </Option>
        </React.Fragment>
      ));
    }

    if (guide === "oppoActions" && selectedOpportunity) {
      return (
        <>
          <Option
            key={JSON.stringify({
              index: 1,
              name: "amount",
              oppotunityId: selectedOpportunity?.id,
              type: "setfield",
            })}
            value={" Amount"}
          >
            <FaDollarSign className={classes.icon_secondary} /> Amount
          </Option>
          <Option
            key={JSON.stringify({
              index: 2,
              name: "stagename",
              oppotunityId: selectedOpportunity?.id,
              type: "setfield",
            })}
            value={" StageName"}
          >
            <FaLayerGroup className={classes.icon_secondary} /> Stage Name
          </Option>

          <Option
            key={JSON.stringify({
              index: 4,
              name: "nextstep",
              oppotunityId: selectedOpportunity?.id,
              type: "setfield",
            })}
            value={" Next Step"}
          >
            <FaStepForward className={classes.icon_secondary} /> Next Step
          </Option>
          <Option
            key={JSON.stringify({
              index: 5,
              name: "closedate",
              oppotunityId: selectedOpportunity?.id,
              type: "setfield",
            })}
            value={" Close date"}
          >
            <FaCalendarTimes className={classes.icon_secondary} /> Close date
          </Option>
          <Option
            key={JSON.stringify({
              index: 5,
              name: "playbook",
              oppotunityId: selectedOpportunity?.id,
              type: "playbook",
            })}
            value={" Playbook"}
          >
            <FaBookOpen className={classes.icon_secondary} /> Playbook
          </Option>
        </>
      );
    }

    if (guide === "playbook") {
      return (
        <>
          {categoryList?.categories?.map((categoryItem, Xindex) => {
            return categoryItem?.items?.map((optionItem, Yindex) => {
              return (
                <>
                  <Option
                    key={JSON.stringify({
                      key: Xindex + Yindex,
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
          })}
        </>
      );
    }
    if (guide === "playbookActions") {
      return (
        <>
          <Option
            key={JSON.stringify({
              value: message.replace("@", ""),
              itemId: selectedCategory?.question?._id,
              type: "text",
              isrequest: user?.role === "manager" ? true : false,
            })}
            value={message.replace("@", "")}
          >
            <FaCommentDots className={classes.icon_secondary} />{" "}
            <b className={classes.icon_secondary}>Message</b> :{" "}
            {message.replace("@", "")}
          </Option>
          {value?.includes("@") && playbookActions()}
        </>
      );
    }

    if (guide === "stageNameList") {
      return (
        <>
          {stagenameList?.map((item, index) => (
            <Option
              value={" " + item?.apiname}
              key={JSON.stringify({
                index: index,
                type: "fieldValue",
                value: item?.apiname,
                objname: "stagename",
              })}
            >
              {item?.apiname}
            </Option>
          ))}
        </>
      );
    }
    if (guide === "contact" || guide === "other") {
      return (
        <>
          {contactList?.length > 0 ? (
            contactList?.map((item) => (
              <Option
                key={JSON.stringify({
                  value: item,
                  itemId: selectedCategory?.question?._id,
                  type: "option",
                  isrequest: user.role === "manager" ? true : false,
                })}
                value={" " + item}
              >
                {item}
              </Option>
            ))
          ) : (
            <Option disabled value={"Not Found Options "}>
              Not Found Options
            </Option>
          )}
        </>
      );
    }
  };

  const renderOptions = (options) => {
    return (
      <>
        {options?.map((item, index) => (
          <Option
            value={" " + item?.name}
            key={JSON.stringify({
              index: index,
              itemId: selectedCategory?.question?._id,
              type: item?.type,
              values: item?.values,
            })}
          >
            <MoreOutlined className={classes.icon_success} /> {item?.name}
          </Option>
        ))}
      </>
    );
  };

  return (
    <Row className={classes.container + " " + classes.light}>
      {loading && <Loader />}
      {/* <hr /> */}
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
        <Split
          // onDragEnd={(sizes) => setResizeDitect(sizes)}

          gutterSize={5}
          // sizes={layoutProcess === "horizontal"  ? [70, 30] : [100, 100]}
          sizes={[60, 40]}
          direction="horizontal"
          cursor="col-resize"
          className={"split-flex"} // You'll need to define this. check styles.css
        >
          <div style={{ paddingRight: 10, position: "relative" }}>
            <div className={classes?.topLoader}>
              {loadingPlayBook && (
                <Loading3QuartersOutlined className="icon_primary" spin />
              )}
            </div>
            <Header
              selectedAccount={selectedAccount}
              selectedOpportunity={selectedOpportunity}
              selectedPlaybook={selectedPlaybook}
              selectedCategory={selectedCategory}
              fieldToUpdate={fieldToUpdate}
            />
            <Mentions
              ref={mentionsRef}
              autoFocus={true}
              onResize={{ minRows: 2, maxRows: 6 }}
              autoSize
              placement="bottom"
              className={classes.mentionsInput}
              style={{
                fontSize: 16,
              }}
              value={value + ""}
              onChange={onChange}
              onSelect={onSelect}
              placeholder={"Type @ to start playing"}
              prefix={[
                "@",
                "|",
                "@amount",
                "@stagename",
                "@nextstep",
                "@closedate",
                guide === "setValue" && fieldToUpdate && value + "",
                guide === "playbookActions" && !value?.includes("@") && value,
              ]}
              split={"|"}
              notFoundContent={
                <div>
                  {guide === "stageNameList"
                    ? "Press @ to show stage list"
                    : "Not found suggestion "}
                </div>
              }
            >
              {guide !== "account" && value?.includes("@") && (
                <Option
                  key={JSON.stringify({
                    type: "back",
                    guide:
                      guide === "opportunity"
                        ? "account"
                        : guide === "oppoActions"
                        ? "opportunity"
                        : guide === "setValue" ||
                          guide === "stageNameList" ||
                          guide === "forecastCategoryList" ||
                          guide === "playbook"
                        ? "oppoActions"
                        : guide === "playbookActions"
                        ? "playbook"
                        : guide === "contact"
                        ? "playbookActions"
                        : "oppoActions",
                  })}
                  value={" back"}
                >
                  <FaArrowLeft className={classes.icon_secondary} />{" "}
                  <b className={classes.icon_secondary}>Back</b>
                </Option>
              )}

              {fieldToUpdate &&
                selectedOpportunity &&
                guide !== "stageNameList" &&
                guide !== "forecastCategoryList" && (
                  <>
                    <Option
                      key={JSON.stringify({
                        id: Date.now(),
                        type: fieldToUpdate?.type,
                        objname: fieldToUpdate?.objname,
                        value: value
                          ?.replace(fieldToUpdate?.objname, "")
                          ?.replace("@@", "")
                          ?.replace("@", "")
                          ?.replace(":", "")
                          ?.replace(/[^\w\s]/gi, ""),
                      })}
                      value={value + ""}
                    >
                      <b className={classes.icon_secondary}>
                        {fieldToUpdate?.label} :
                      </b>
                      {value
                        ?.replace(fieldToUpdate?.objname, "")
                        ?.replace("@@", "")
                        ?.replace("@", "")
                        ?.replace(":", "")
                        ?.replace(/[^\w\s]/gi, "")}
                    </Option>
                  </>
                )}

              {/* {guide === "setValue" && fieldToUpdate && (
          <>
            <Option
              key={JSON.stringify({
                id: Date.now(),
                type: "fieldValue",
                objname: fieldToUpdate?.objname,
                value: value,
              })}
              value={value + ""}
            >
              <b className={classes.icon_secondary}>{fieldToUpdate?.name} : </b>
              {value + ""}
            </Option>
          </>
        )} */}
              {selectedAccount && !fieldToUpdate && value?.includes("@") && (
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
              {mentionOptionRenderer()}
            </Mentions>

            <Typography.Paragraph
              ellipsis
              className="textPrimary"
              style={{ fontSize: "11px" }}
            >
              {smartInfoText()}
            </Typography.Paragraph>
            {newNotes?.length > 0 ? (
              <Badge dot>
                <Button
                  disabled={
                    !selectedAccount || !selectedOpportunity ? true : false
                  }
                  onClick={() => setVisible(true)}
                  align="right"
                  type="primary"
                >
                  Save Notes
                </Button>
              </Badge>
            ) : (
              <Button
                disabled={
                  !selectedAccount || !selectedOpportunity ? true : false
                }
                onClick={() => setVisible(true)}
                align="right"
                type="primary"
              >
                Save Notes
              </Button>
            )}
          </div>

          <div>
            {selectedPlaybook ? (
              <History
                playbook={categoryList}
                category={selectedCategory?.category}
                question={selectedCategory?.question}
                categoryToOpen={selectedCategory?.question?._id}
              />
            ) : (
              <OppoHistory
                newUpdates={newUpdates}
                opportunities={opportunities}
                target="opportunity"
                account={selectedAccount}
                opportunity={selectedOpportunity}
                playbook={selectedAccount}
                category={selectedCategory}
              />
            )}
          </div>
        </Split>
      </Col>

      <AddNotes
        visible={visible}
        setVisible={setVisible}
        notes={newNotes}
        userId={user?.originId}
        opportunityId={selectedOpportunity?.values?.idorigin}
        setNewNotes={setNewNotes}
      />
    </Row>
  );
};

export default OpportunityTextBook;
