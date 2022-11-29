import React from "react";
import Cookies from "js-cookie";
//ant design components
import { Button, Card, Collapse, Divider, Tooltip } from "antd";
//App components
import Charts from "../../charts/Charts";
import ChatBox from "../../ChatBox/ChatBox";
//Icons
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DislikeOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  TagsOutlined,
} from "@ant-design/icons";
//Css
import * as classes from "../PlayBook.module.css";

const colorQuestion = {
  borderLeft: "3px solid red",
};

const { Panel } = Collapse;
const ProcessFlowCategories = ({
  setMode,
  loading,
  getOpportunity,
  opportunity,
  setActiveCategory,
  activeCategory,
  data,
  getMessages,
}) => {
  return (
    <Card
      title={data?.name}
      loading={loading}
      extra={
        <Tooltip title={"Tags mode"}>
          <Button
            icon={<TagsOutlined style={{ fontSize: 20 }} />}
            type="link"
            onClick={() => setMode("tags")}
          />
        </Tooltip>
      }
    >
      {data ? (
        <>
          <Collapse
            activeKey={activeCategory}
            destroyInactivePanel={false}
            collapsible
            ghost
            className={classes.collapse}
          >
            {data.categories?.map((ParentItem, i) => (
              <Panel
                className={classes.panel}
                key={ParentItem.name}
                collapsible="header"
                header={
                  <b
                    className={classes.panelTitle}
                    onClick={() => {
                      if (!activeCategory.includes(ParentItem.name)) {
                        setActiveCategory([...activeCategory, ParentItem.name]);
                      } else {
                        setActiveCategory(
                          activeCategory.filter(
                            (item) => item !== ParentItem.name
                          )
                        );
                      }
                    }}
                  >
                    {ParentItem.name}
                  </b>
                }
              >
                {ParentItem.items.length === 0
                  ? "No items found "
                  : ParentItem.items?.map((ChildItem, j) => (
                      <div key={j}>
                        <div
                          className="collapse_body"
                          style={j === 100 ? colorQuestion : {}}
                        >
                          <div className="question question-item">
                            {j + 1 + " - " + ChildItem.name}
                            <Tooltip title={ChildItem.description}>
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
                              {ChildItem?.salesfeel === 0 ? (
                                <CloseCircleFilled
                                  className={
                                    classes.icon + "  " + classes.icon_danger
                                  }
                                />
                              ) : (
                                ChildItem?.salesfeel === 2 && (
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
                              {ChildItem?.manageropinion === 0 ? (
                                <DislikeOutlined
                                  className={
                                    classes.icon + "  " + classes.icon_danger
                                  }
                                />
                              ) : (
                                ChildItem?.manageropinion === 2 && (
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
                              getMessages={getMessages}
                              ChildItem={ChildItem}
                              getOpportunity={getOpportunity}
                              accountid={opportunity?.accountid}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
              </Panel>
            ))}
          </Collapse>
          <Divider style={{ margin: "0" }} />
        </>
      ) : (
        <>There are no assigned process flow to this opportunity</>
      )}
      <div align="center">
        <Charts />
      </div>
    </Card>
  );
};

export default ProcessFlowCategories;
