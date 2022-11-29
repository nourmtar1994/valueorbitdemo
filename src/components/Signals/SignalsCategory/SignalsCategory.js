import {
  CheckCircleFilled,
  CloseCircleFilled,
  DislikeOutlined,
  InfoCircleOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Button, notification, Tooltip } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Loader from "../../Badge/Loader/Loader";

import ChatBox from "../../ChatBox/ChatBox";
import * as classes from "../../ProcessFlow/PlayBook.module.css";

const colorQuestion = {
  borderLeft: "3px solid red",
};
const SignalsCategory = ({
  oppId,
  categoryLabel,
  signalId,
  actionId,
  getSignals = null,
  setOppToUpdate = null,
  setLayoutSize,
}) => {
  const [opportunity, setopportunity] = useState(null);
  const [processflows, setprocessflows] = useState(null);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (oppId) {
      getOpportunity();
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oppId]);

  useEffect(() => {
    setLoading(true);

    processflows &&
      setCategory(
        processflows?.categories?.filter(
          (item) => item?.name?.toLowerCase() === categoryLabel?.toLowerCase()
        )?.[0]
      );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryLabel]);

  const getOpportunity = async () => {
    if (oppId) {
      try {
        const { data } = await axios.get("/opportunity/" + oppId);
        setLoading(false);

        if (data?.success) {
          setLoading(false);
          setopportunity(data?.data);
          setprocessflows(data?.data?.processflow);
          setCategory(
            data?.data?.processflow?.categories?.filter(
              (item) =>
                item?.name?.toLowerCase() === categoryLabel?.toLowerCase()
            )?.[0]
          );
        }
      } catch (error) {
        notification.error({
          message: "Process flow not be found",
          placement: "bottomRight",
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const updateActions = async () => {
    try {
      const { data } = await axios.put("/actions/" + actionId, {
        isDone: true,
      });
      if (data?.success) {
        getSignals && getSignals();
        // console.log("actions updated  ->>" + actionId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSignals = async () => {
    try {
      await axios.put("/signals/" + signalId, {
        isDone: true,
      });
      // if (data?.success) {
      //   console.log("signales updated  ->>" + signalId);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!loading ? (
        category?.items && (
          <div
            className={classes.collapse}
            style={{
              height: "auto",
              maxHeight: "80vh",
              overflow: "hidden auto",
              borderRadius: "1px solid #0000001a",
            }}
          >
            <div
              className={classes.panel}
              style={{
                background: "#fff",
                "&:hover": {
                  background: "#000",
                },
              }}
            >
              {category?.items?.length === 0
                ? "No items found "
                : category.items?.map((item, j) => (
                    <div key={j}>
                      <div
                        className="collapse_body"
                        style={j === 100 ? colorQuestion : {}}
                      >
                        <div className="question question-item">
                          {j + 1 + " - " + item.name}
                          <Tooltip title={item.description}>
                            &nbsp; &nbsp;
                            <InfoCircleOutlined
                              className={"icon icon-primary"}
                            />
                          </Tooltip>
                          <div
                            className={classes.status}
                            hidden={
                              JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                                "sales" && true
                            }
                          >
                            {item?.salesfeel === 0 ? (
                              <CloseCircleFilled
                                className={
                                  classes.icon + "  " + classes.icon_danger
                                }
                              />
                            ) : (
                              item?.salesfeel === 2 && (
                                <CheckCircleFilled
                                  className={
                                    classes.icon + "  " + classes.icon_success
                                  }
                                />
                              )
                            )}
                          </div>
                          <div
                            className={classes.status}
                            hidden={
                              JSON.parse(Cookies.get("VO_USER_AUTH")).role ===
                                "manager" && true
                            }
                          >
                            {item?.manageropinion === 0 ? (
                              <DislikeOutlined
                                className={
                                  classes.icon + "  " + classes.icon_danger
                                }
                              />
                            ) : (
                              item?.manageropinion === 2 && (
                                <LikeOutlined
                                  className={
                                    classes.icon + "  " + classes.icon_success
                                  }
                                />
                              )
                            )}
                          </div>
                        </div>

                        <div className="chat-box">
                          <ChatBox
                            item={item}
                            getOpportunity={getOpportunity}
                            accountid={opportunity?.accountid}
                            oppId={oppId}
                            ChildItem={item}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <br />
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
                loading={loading}
                onClick={() => {
                  updateActions();
                  updateSignals();
                }}
              >
                Validate
              </Button>
            </div>

            <br />
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SignalsCategory;
