import React, { useEffect, useState } from "react";

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
  List,
  Result,
  Tag,
  Dropdown,
  Space,
  Divider,
  Empty,
} from "antd";
//App components
import Badge from "../../Badge/Badge";
import AddProcsessFlow from "./AddProcessFlow";
import AddCategory from "./AddCategory";
import AddItem from "./AddItem";
import AddOption from "./AddOption";
import EditPlayBookModel from "./EditProcessFlowTemplateModel";
import EditCategoryModel from "./EditCategoryModel";
import EditQuestionModel from "./EditQuestionModel";
import EditOptionModel from "./EditOptionModel";
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

const ProcessFlowTemplateMenage = () => {
  const [processFlowList, setProcessFlowList] = useState([]);
  const [currentProcessFlow, setCurrentProcessFlow] = useState([]);
  const [addFormCollapsed, setAddFormCollapsed] = useState({
    category: undefined,
    question: undefined,
  });
  const [addProcessFlow, setAddProcessFlow] = useState({
    id: null,
    visible: null,
  });
  const [addCategory, setAddCategory] = useState({ id: null, visible: null });
  const [addQuestion, setAddQuestion] = useState({ id: null, visible: null });
  const [addOptions, setAddOptions] = useState({ id: null, visible: null });

  // const [visible, setVisible] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const getProcessFlow = async () => {
    try {
      const { data } = await axios.get("/processflowtemplate");
      setProcessFlowList(data.data);
      setCurrentProcessFlow(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const searshProcessFlow = (search) => {
    if (search === "" || search === " ") {
      setSearchWord("");
      setCurrentProcessFlow(processFlowList);
    } else {
      setSearchWord(search);
      setCurrentProcessFlow(
        processFlowList.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ) || []
      );
    }
  };
  const deleteProcessFlow = async (id) => {
    try {
      const { data } = await axios.delete("/processflowtemplate/" + id);
      if (data) {
        getProcessFlow();
        message.success(data.data.name + "deleted");
      } else {
        message.error("playbook does not deleted");
      }
    } catch (error) {
      message.error("playbook does not deleted");
    }
  };
  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete("/categorytemplate/" + id);
      if (data) {
        getProcessFlow();
        message.success(data.data.name + "deleted");
      } else {
        message.error("Category does not deleted");
      }
    } catch (error) {
      message.error("Category does not deleted");
    }
  };
  const deleteItem = async (id) => {
    try {
      const { data } = await axios.delete("/itemtemplate/" + id);
      if (data) {
        getProcessFlow();
        message.success(data.data.name + "deleted");
      } else {
        message.error("Item does not deleted");
      }
    } catch (error) {
      message.error("Item does not deleted");
    }
  };

  const deleteOption = async (id) => {
    try {
      const { data } = await axios.delete("/optiontemplate/" + id);
      if (data) {
        getProcessFlow();
        message.success(data.data.name + "deleted");
      } else {
        message.error("Option does not deleted");
      }
    } catch (error) {
      message.error("Option does not deleted");
    }
  };
  function cancel(e) {
    // message.error('Click on No');
  }

  useEffect(() => {
    getProcessFlow();
  }, []);

  return (
    <>
      <EditPlayBookModel
        visibility={addProcessFlow.visible}
        IdPlayBook={addProcessFlow.id}
        getProcessFlow={getProcessFlow}
      />
      <EditCategoryModel
        visibility={addCategory.visible}
        IdCategory={addCategory.id}
        getProcessFlow={getProcessFlow}
      />
      <EditQuestionModel
        visibility={addQuestion.visible}
        idItem={addQuestion.id}
        getProcessFlow={getProcessFlow}
      />
      <EditOptionModel
        visibility={addOptions.visible}
        idOption={addOptions.id}
        getProcessFlow={getProcessFlow}
      />

      <Row gutter={[5]}>
        {/* <Col
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
                        actions={[
                          item.isrequest ? (
                            <Tag color="red">Manager</Tag>
                          ) : (
                            <Tag color="green">Sales</Tag>
                          ),
                        ]}
                      >
                        <List.Item.Meta
                          title={
                            <Typography.Link href="#" id={item._id}>
                              {item.value}
                            </Typography.Link>
                          }
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
        </Col> */}

        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 18 }}
          xl={{ span: 16 }}
          xxl={{ span: 12 }}
          hidden={selectedDiscussion !== null ? true : false}
        >
          <Badge title={"process flow template"}>
            <Tabs defaultActiveKey={0}>
              <TabPane
                tab={
                  <span>
                    <OrderedListOutlined />
                    List
                  </span>
                }
                key={0}
              >
                <Row gutter={[50, 50]}>
                  <Col xs={{ span: 20 }} sm={{ span: 8 }} md={{ span: 8 }}>
                    <Input
                      placeholder="Search"
                      prefix={<SearchOutlined />}
                      onChange={(e) => searshProcessFlow(e.target.value)}
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
                <Collapse
                  bordered={false}
                  collapsible="header"
                  accordion={true}
                >
                  {currentProcessFlow?.map((item, i) => (
                    <Panel
                      key={i}
                      header={
                        <b>
                          {
                            <Highlighter
                              highlightClassName={"highlighter"}
                              searchWords={[searchWord]}
                              autoEscape={false}
                              textToHighlight={
                                item?.name +
                                " (" +
                                (item?.categoriestemplate?.length || 0) +
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
                                setAddProcessFlow({
                                  visible: !addProcessFlow.visible,
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
                              <DeleteOutlined
                                // onClick={() => setVisible(true)}
                                style={{ color: "red" }}
                              />
                            </Tooltip>
                          </Popconfirm>
                        </div>
                      }
                    >
                      {/* Category fetching */}

                      <Collapse
                        bordered={false}
                        collapsible="header"
                        accordion={true}
                      >
                        {item?.categoriestemplate?.length > 0 ? (
                          item.categoriestemplate?.map((category, j) => (
                            <Panel
                              key={j}
                              className={classes.panel_category}
                              header={
                                category?.name +
                                " (" +
                                (category?.itemstemplate?.length || 0) +
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
                                    <Typography.Link
                                      href="#"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <Space>
                                        <MoreOutlined
                                          className={classes.extra_icon}
                                        />
                                      </Space>
                                    </Typography.Link>
                                  </Dropdown>
                                </div>
                              }
                            >
                              <Collapse
                                bordered={false}
                                collapsible="header"
                                accordion={true}
                              >
                                {category.itemstemplate.length ? (
                                  category.itemstemplate?.map((question, k) => (
                                    <Panel
                                      key={k}
                                      header={question.name}
                                      extra={
                                        <div key={k}>
                                          <div>
                                            <Popover
                                              color={"#42424a"}
                                              placement="topLeft"
                                              content={
                                                <Typography.Text
                                                  style={{
                                                    color: "silver",
                                                  }}
                                                >
                                                  {question.description ||
                                                    "No description"}
                                                </Typography.Text>
                                              }
                                              title={
                                                <b
                                                  style={{
                                                    color: "#fff",
                                                  }}
                                                >
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
                                                    visible:
                                                      !addQuestion.visible,
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
                                                  // onClick={() =>
                                                  //   setVisible(true)
                                                  // }
                                                  style={{ color: "red" }}
                                                />
                                              </Tooltip>
                                            </Popconfirm>
                                          </div>
                                        </div>
                                      }
                                    >
                                      {question?.optionstemplate?.length ? (
                                        question.optionstemplate?.map(
                                          (option, g) => (
                                            <div
                                              key={g}
                                              className={classes.items_space}
                                            >
                                              <p align="right">
                                                <b>{g + 1}.&nbsp;&nbsp;</b>
                                                {option.name}
                                              </p>
                                              <div
                                                className={
                                                  classes.items_actions
                                                }
                                              >
                                                &nbsp;&nbsp;
                                                <Tooltip title="Edit">
                                                  <EditOutlined
                                                    onClick={() => {
                                                      setAddOptions({
                                                        visible:
                                                          !addOptions.visible,
                                                        id: option._id,
                                                      });
                                                    }}
                                                  />
                                                </Tooltip>
                                                &nbsp;&nbsp;
                                                <Popconfirm
                                                  title="Are you sure to delete this item ?"
                                                  onConfirm={() =>
                                                    deleteOption(option._id)
                                                  }
                                                  onCancel={cancel}
                                                  okText="Yes"
                                                  cancelText="No"
                                                >
                                                  <Tooltip title="Delete">
                                                    <DeleteOutlined
                                                      // onClick={() =>
                                                      //   setVisible(true)
                                                      // }
                                                      style={{
                                                        color: "red",
                                                      }}
                                                    />
                                                  </Tooltip>
                                                </Popconfirm>
                                              </div>
                                            </div>
                                          )
                                        )
                                      ) : (
                                        <Empty
                                          style={{ padding: 10 }}
                                          align="center"
                                          description="There is no option added to this item."
                                        />
                                      )}

                                      <Collapse
                                        ghost
                                        accordion={true}
                                        onChange={(e) =>
                                          setAddFormCollapsed({
                                            ...addFormCollapsed,
                                            option: e,
                                          })
                                        }
                                      >
                                        <Panel
                                          showArrow={false}
                                          header={
                                            <div align="left">
                                              <Button
                                                type="primary"
                                                size="small"
                                                icon={
                                                  addFormCollapsed.option ===
                                                  undefined ? (
                                                    <PlusOutlined />
                                                  ) : (
                                                    <MinusOutlined />
                                                  )
                                                }
                                                danger={
                                                  addFormCollapsed.option ===
                                                  undefined
                                                    ? false
                                                    : true
                                                }
                                              >
                                                Add Option
                                              </Button>
                                            </div>
                                          }
                                          key={"add_option"}
                                        >
                                          <AddOption
                                            getProcessFlow={getProcessFlow}
                                            questionId={question._id}
                                          />
                                        </Panel>
                                      </Collapse>
                                    </Panel>
                                  ))
                                ) : (
                                  <Empty
                                    style={{ padding: 10 }}
                                    align="center"
                                    description="There is no option added to this item."
                                  />
                                )}
                              </Collapse>
                              <Collapse
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
                                    <div align="left">
                                      <Button
                                        type="primary"
                                        size="small"
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
                                      >
                                        Add item
                                      </Button>
                                    </div>
                                  }
                                  key={1}
                                >
                                  <AddItem
                                    getProcessFlow={getProcessFlow}
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
                          ))
                        ) : (
                          <Empty
                            style={{ padding: 10 }}
                            align="center"
                            description="There is no category added to this process opportunity."
                          />
                        )}
                      </Collapse>

                      <Collapse
                        ghost
                        bordered={false}
                        accordion={true}
                        onChange={(e) =>
                          setAddFormCollapsed({
                            ...addFormCollapsed,
                            category: e,
                          })
                        }
                      >
                        <Panel
                          showArrow={false}
                          header={
                            <div align="left">
                              <Tooltip
                                title={
                                  addFormCollapsed.category === undefined
                                    ? "New Category"
                                    : "Cancel"
                                }
                              >
                                <Button
                                  type="primary"
                                  size="small"
                                  icon={
                                    addFormCollapsed.category === undefined ? (
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
                                >
                                  Add Category
                                </Button>
                              </Tooltip>
                            </div>
                          }
                          key="add_category"
                        >
                          <AddCategory
                            getProcessFlow={getProcessFlow}
                            playBookId={item._id}
                          />
                        </Panel>
                      </Collapse>
                    </Panel>
                  ))}
                </Collapse>
              </TabPane>
              <TabPane
                active={true}
                tab={
                  <span>
                    <PlusOutlined />
                    New
                  </span>
                }
                key={1}
              >
                <AddProcsessFlow getProcessFlow={getProcessFlow} />
              </TabPane>
            </Tabs>
          </Badge>
        </Col>
      </Row>
    </>
  );
};
export default ProcessFlowTemplateMenage;
