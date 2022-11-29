import React, { useEffect, useState } from "react";
//Cookies
import Cookies from "js-cookie";
//axios
import axios from "axios";
//ant design components
import {
  Row,
  Col,
  Tabs,
  Typography,
  Collapse,
  Button,
  Tooltip,
  Popconfirm,
  message,
  Input,
  Popover,
  Alert,
  List,
  Result,
  Tag,
  Dropdown,
  Space,
  Divider,
} from "antd";
//App components
import Badge from "../../Badge/Badge";
import AddPlaybook from "./AddPlaybook";
import AddCategory from "./AddCategory";
import AddQuestion from "./AddQuestion";
import EditPlayBookModel from "./EditPlayBookModel";
import EditCategoryModel from "./EditCategoryModel";
import EditQuestionModel from "./EditQuestionModel";
import Highlighter from "react-highlight-words";
//style
import * as classes from "./PB_Menage.module.css";
//icons
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  InfoCircleOutlined,
  MinusOutlined,
  MoreOutlined,
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import ScrollableFeed from "react-scrollable-feed";

const { Panel } = Collapse;

const { TabPane } = Tabs;

const PlayBookMenage = () => {
  const componentAuthRole = ["manager", "admin"];
  const [comunicationsList, setComunications] = useState([]);
  const [currentComunicationsList, setCurrentComunications] = useState([]);
  const [addFormCollapsed, setAddFormCollapsed] = useState({
    category: undefined,
    question: undefined,
  });
  const [addPlayBook, setAddPlayBook] = useState({ id: null, visible: null });
  const [addCategory, setAddCategory] = useState({ id: null, visible: null });
  const [addQuestion, setAddQuestion] = useState({ id: null, visible: null });

  // const [visible, setVisible] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const getComunications = async () => {
    try {
      const { data } = await axios.get("/processflow");
      setComunications(data.data);
      setCurrentComunications(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDiscussion = async (idSales, manager, discussion) => {
    if (idSales) {
      try {
        const { data } = await axios.get("/sales/" + idSales);
        if (data.success) {
          setSelectedDiscussion({
            sales: data.data,
            manager,
            discussion,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const searshComunications = (search) => {
    if (search === "" || search === " ") {
      setSearchWord("");
      setCurrentComunications(comunicationsList);
    } else {
      setSearchWord(search);
      setCurrentComunications(
        comunicationsList.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ) || []
      );
    }
  };

  const deleteProcessFlow = async (id) => {
    try {
      const { data } = await axios.delete("/processflow/" + id);
      if (data) {
        getComunications();
        message.success(data.data.name + "deleted");
      } else {
        message.error("Playbook does not deleted");
      }
    } catch (error) {
      message.error("Playbook does not deleted");
    }
  };

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete("/category/" + id);
      if (data) {
        getComunications();
        message.success(data.data.name + "deleted");
      } else {
        message.error("Category  does not deleted");
      }
      t;
    } catch (error) {
      message.error("Category  does not deleted");
    }
  };

  const deleteItem = async (id) => {
    try {
      const { data } = await axios.delete("/item/" + id);
      if (data) {
        getComunications();
        message.success(data.data.name + "deleted");
      } else {
        message.error("Item does not deleted");
      }
    } catch (error) {
      message.error("Item does not deleted");
    }
  };

  function cancel(e) {
    // message.error('Click on No');
  }

  useEffect(() => {
    getComunications();
  }, []);

  if (
    componentAuthRole.find(
      (item) => JSON.parse(Cookies.get("VO_USER_AUTH")).role === item
    ) === undefined
  ) {
    return null;
  }

  return (
    <>
      <EditPlayBookModel
        visibility={addPlayBook.visible}
        IdPlayBook={addPlayBook.id}
      />
      <EditCategoryModel
        visibility={addCategory.visible}
        IdCategory={addCategory.id}
      />
      <EditQuestionModel
        visibility={addQuestion.visible}
        idItem={addQuestion.id}
      />
      <Row gutter={[5]}>
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 18 }}
          xl={{ span: 16 }}
          xxl={{ span: 12 }}
          hidden={selectedDiscussion === null ? true : false}
        >
          <Badge
            title={
              <>
                <ArrowLeftOutlined
                  onClick={() => setSelectedDiscussion(null)}
                />{" "}
                &nbsp; &nbsp;
                {selectedDiscussion !== null &&
                  selectedDiscussion.manager.username +
                    " " +
                    selectedDiscussion.manager.lastname}
              </>
            }
          >
            {selectedDiscussion !== null ? (
              <div style={{ height: "500px", overflow: "auto" }}>
                <ScrollableFeed>
                  <List
                    loading={selectedDiscussion === null ? true : false}
                    itemLayout="horizontal"
                    dataSource={
                      selectedDiscussion !== null &&
                      selectedDiscussion.discussion
                    }
                    renderItem={(item) => (
                      <List.Item
                        about="kjkj"
                        actions={[
                          item.isrequest ? (
                            <Tag color="red">Manager</Tag>
                          ) : (
                            <Tag color="green">Sales</Tag>
                          ),
                        ]}
                      >
                        <List.Item.Meta
                          title={<a id={item._id}>{item.value}</a>}
                          description={moment(item.createdate).format(
                            "ddd, h:mm A"
                          )}
                        />
                      </List.Item>
                    )}
                  />
                </ScrollableFeed>
              </div>
            ) : (
              <>
                <Result title="Your operation has been executed" />
              </>
            )}
          </Badge>
        </Col>

        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 18 }}
          xl={{ span: 16 }}
          xxl={{ span: 12 }}
          hidden={selectedDiscussion !== null ? true : false}
        >
          <Badge title={"process flow"}>
            <Tabs defaultActiveKey={0}>
              <TabPane
                active={true}
                tab={
                  <span>
                    <PlusOutlined />
                    New
                  </span>
                }
                key={0}
              >
                <AddPlaybook getComunications={getComunications} />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <OrderedListOutlined />
                    List
                  </span>
                }
                key={1}
              >
                <Row gutter={[50, 50]}>
                  <Col xs={{ span: 20 }} sm={{ span: 8 }} md={{ span: 8 }}>
                    <Input
                      placeholder="Search"
                      prefix={<SearchOutlined />}
                      onChange={(e) => searshComunications(e.target.value)}
                    />
                  </Col>
                  <Col
                    xs={{ span: 4 }}
                    sm={{ span: 8, push: 8 }}
                    md={{ span: 8, push: 8 }}
                    align="right"
                  >
                    <Tooltip title="Filter">
                      <Button size="middle" icon={<FilterOutlined />} />
                    </Tooltip>
                  </Col>
                </Row>
                <br />
                <Collapse collapsible="header" accordion={true}>
                  {currentComunicationsList?.map((item, i) => (
                    <>
                      <Panel
                        key={i}
                        header={
                          <b>
                            {
                              <Highlighter
                                highlightClassName={classes.highlighter}
                                searchWords={[searchWord]}
                                autoEscape={false}
                                textToHighlight={
                                  item.name +
                                  " (" +
                                  (item.categories.length || 0) +
                                  ")"
                                }
                              />
                            }
                          </b>
                        }
                        className={classes.panel_playbook}
                        extra={
                          <div className={classes.extra_playbook}>
                            <Popover
                              color={"#42424a"}
                              placement="topLeft"
                              content={
                                <Typography.Text style={{ color: "silver" }}>
                                  {item.description || "No description"}
                                </Typography.Text>
                              }
                              title={
                                <b style={{ color: "#fff" }}> {item.name}</b>
                              }
                            >
                              <InfoCircleOutlined />
                            </Popover>
                            &nbsp;&nbsp;
                            <Tooltip title="Edit">
                              <EditOutlined
                                onClick={() => {
                                  setAddPlayBook({
                                    visible: !addPlayBook.visible,
                                    id: item._id,
                                  });
                                }}
                              />
                            </Tooltip>
                            &nbsp;&nbsp;
                            <Popconfirm
                              title="Are you sure to delete this proxess flow ? All sub category and item will be deleted"
                              onConfirm={() => deleteProcessFlow(item._id)}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Tooltip title="Delete">
                                <DeleteOutlined style={{ color: "red" }} />
                              </Tooltip>
                            </Popconfirm>
                          </div>
                        }
                      >
                        {/* Category fetching */}
                        {item.categories.length > 0 ? (
                          <Collapse collapsible="header" accordion={true}>
                            {item.categories?.map((category, j) => (
                              <Panel
                                key={j}
                                className={classes.panel_category}
                                header={
                                  category.name +
                                  " (" +
                                  (category.items.length || 0) +
                                  ")"
                                }
                                extra={
                                  <div className={classes.extra_category}>
                                    <Dropdown
                                      trigger={["click"]}
                                      overlay={
                                        <div className={classes.extra_menu}>
                                          <div className={classes.menu_item}>
                                            <Popover
                                              color={"#42424a"}
                                              placement="topLeft"
                                              content={
                                                <Typography.Text
                                                  style={{ color: "silver" }}
                                                >
                                                  {category.description ||
                                                    "No description"}
                                                </Typography.Text>
                                              }
                                              title={
                                                <b style={{ color: "#fff" }}>
                                                  {" "}
                                                  {item.name}
                                                </b>
                                              }
                                            >
                                              <InfoCircleOutlined /> More
                                            </Popover>
                                          </div>
                                          <div
                                            className={classes.menu_item}
                                            onClick={() => {
                                              setAddCategory({
                                                visible: !addCategory.visible,
                                                id: category._id,
                                              });
                                            }}
                                          >
                                            <EditOutlined /> Edit
                                          </div>
                                          <div
                                            className={classes.menu_item}
                                            style={{ color: "red" }}
                                          >
                                            <Popconfirm
                                              title="Are you sure to delete this category ? All sub item will be deleted "
                                              onConfirm={() =>
                                                deleteCategory(category._id)
                                              }
                                              onCancel={cancel}
                                              okText="Yes"
                                              cancelText="No"
                                            >
                                              <DeleteOutlined />
                                              Delete
                                            </Popconfirm>
                                          </div>
                                        </div>
                                      }
                                    >
                                      <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                          <MoreOutlined
                                            className={classes.extra_icon}
                                          />
                                        </Space>
                                      </a>
                                    </Dropdown>
                                  </div>
                                }
                              >
                                {category.items.length ? (
                                  category.items?.map((question, k) => (
                                    <div
                                      key={k}
                                      className={classes.items_space}
                                      onClick={() =>
                                        getDiscussion(
                                          question.salesuser,
                                          item.manageruser,
                                          question.discussions
                                        )
                                      }
                                    >
                                      <p align="right">
                                        <b>{k + 1}.&nbsp;&nbsp;</b>{" "}
                                        {question.name}{" "}
                                      </p>
                                      <div className={classes.items_actions}>
                                        <Popover
                                          color={"#42424a"}
                                          placement="topLeft"
                                          content={
                                            <Typography.Text
                                              style={{ color: "silver" }}
                                            >
                                              {question.description ||
                                                "No description"}
                                            </Typography.Text>
                                          }
                                          title={
                                            <b style={{ color: "#fff" }}>
                                              {" "}
                                              {item.name}
                                            </b>
                                          }
                                        >
                                          <InfoCircleOutlined />
                                        </Popover>
                                        &nbsp;&nbsp;
                                        <Tooltip title="Edit">
                                          <EditOutlined
                                            onClick={() => {
                                              setAddQuestion({
                                                visible: !addQuestion.visible,
                                                id: question._id,
                                              });
                                            }}
                                          />
                                        </Tooltip>
                                        &nbsp;&nbsp;
                                        <Popconfirm
                                          title="Are you sure to delete this item ?"
                                          onConfirm={() =>
                                            deleteItem(question._id)
                                          }
                                          onCancel={cancel}
                                          okText="Yes"
                                          cancelText="No"
                                        >
                                          <Tooltip title="Delete">
                                            <DeleteOutlined
                                              style={{ color: "red" }}
                                            />
                                          </Tooltip>
                                        </Popconfirm>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <Alert
                                    message="Empty"
                                    description="There is no item added to this category."
                                    type="warning"
                                    showIcon
                                    closable
                                  />
                                )}
                                <Collapse
                                  collapsible="header"
                                  accordion={true}
                                  onChange={(e) =>
                                    setAddFormCollapsed({
                                      ...addFormCollapsed,
                                      question: e,
                                    })
                                  }
                                  ghost
                                >
                                  <Panel
                                    showArrow={false}
                                    header={
                                      <div
                                        align="center"
                                        className={classes.btn_question_show}
                                      >
                                        <Tooltip
                                          title={
                                            addFormCollapsed.question ===
                                            undefined
                                              ? "New Question"
                                              : "Cancel"
                                          }
                                        >
                                          <Button
                                            type="primary"
                                            danger={
                                              addFormCollapsed.question ===
                                              undefined
                                                ? false
                                                : true
                                            }
                                            icon={
                                              addFormCollapsed.question ===
                                              undefined ? (
                                                <PlusOutlined />
                                              ) : (
                                                <MinusOutlined />
                                              )
                                            }
                                          ></Button>
                                        </Tooltip>
                                      </div>
                                    }
                                    key={1}
                                  >
                                    <AddQuestion
                                      getComunications={getComunications}
                                      idMetric={category._id}
                                      salesList={
                                        (item.manageruser &&
                                          item.manageruser.salesusers) ||
                                        []
                                      }
                                    />
                                  </Panel>
                                </Collapse>
                              </Panel>
                            ))}
                          </Collapse>
                        ) : (
                          <Alert
                            message="Empty"
                            description="There is no category added to this process opportunity."
                            type="warning"
                            showIcon
                            closable
                          />
                        )}
                        <Collapse
                          accordion={true}
                          onChange={(e) =>
                            setAddFormCollapsed({
                              ...addFormCollapsed,
                              category: e,
                            })
                          }
                          ghost
                        >
                          <Panel
                            showArrow={false}
                            header={
                              <div align="center">
                                <Tooltip
                                  title={
                                    addFormCollapsed.category === undefined
                                      ? "New Category"
                                      : "Cancel"
                                  }
                                >
                                  <Button
                                    type="primary"
                                    size="middle"
                                    icon={
                                      addFormCollapsed.category ===
                                      undefined ? (
                                        <PlusOutlined />
                                      ) : (
                                        <MinusOutlined />
                                      )
                                    }
                                    danger={
                                      addFormCollapsed.category === undefined
                                        ? false
                                        : true
                                    }
                                  />
                                </Tooltip>
                              </div>
                            }
                            key="1"
                          >
                            <AddCategory
                              getComunications={getComunications}
                              playBookId={item._id}
                            />
                          </Panel>
                        </Collapse>
                      </Panel>
                      <Divider />
                    </>
                  ))}
                </Collapse>
              </TabPane>
            </Tabs>
          </Badge>
        </Col>
      </Row>
    </>
  );
};
export default PlayBookMenage;
