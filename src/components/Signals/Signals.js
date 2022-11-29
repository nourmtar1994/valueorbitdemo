import {
  CloseCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FlagOutlined,
  ReloadOutlined,
  SelectOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Col,
  Row,
  Table,
  Card,
  Select,
  Tooltip,
  Typography,
  Divider,
  Popconfirm,
  Affix,
  Button,
  Space,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Badge from "../Badge/Badge";
import * as classes from "./Signals.module.css";
import moment from "moment";
import Cookies from "js-cookie";
// import ActiondHeader from "../../template/Composants/ActiondHeader/ActiondHeader";
import Highlighter from "react-highlight-words";
import { NavLink } from "react-router-dom";
import UpdateOpportunity from "../UpdateOpportunity/UpdateOpportunity";
import { alphaMonths } from "../Services/Utils/Utils";
import SignalsCategory from "./SignalsCategory/SignalsCategory";
import RiskOpportunity from "./RiskOpportunity/RiskOpportunity";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import Slider from "../../template/NewDesign/Components/Slider/Slider";

const { Option } = Select;
const { Text } = Typography;

const DEFAUL_LAYOUT = {
  table: {
    md: 24,
    lg: 24,
  },
  category: {
    md: 0,
    lg: 0,
  },
};
const CUSTOM_LAYOUT = {
  table: {
    md: 18,
    lg: 18,
  },
  category: {
    md: 6,
    lg: 6,
  },
};

const Signals = () => {
  const [user, setUser] = useState(null);
  const [signalsList, setSignalsList] = useState([]);
  const [globalSignalsList, setGlobalSignalsList] = useState([]);
  const [loadingSignals, setloadingSignals] = useState([]);

  const [typeSignals, setTypeSignals] = useState("opportunity");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  // const [selectedSales, setSelectedSales] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [visible, setVisible] = useState(false);
  const [oppoToUpdate, setOppToUpdate] = useState({
    visible: false,
    opportuntiy: null,
    signalId: null,
  });
  const [showCategory, setShowCategory] = useState({
    visible: false,
    oppoId: null,
    category: null,
    signalId: null,
  });
  const [layoutSize, setLayoutSize] = useState(DEFAUL_LAYOUT);
  // const [filteredInfo, setFilteredInfo] = useState({});

  const [searchWord, setSearchWord] = useState("");

  const opportunities = useSelector(
    (state) => state.opportunity?.defaultList || []
  );

  const salesList = useSelector((state) => state.sales?.data || []);

  const Loadingopportunities = useSelector(
    (state) => state.opportunity?.loading
  );

  const reset = () => {
    setOppToUpdate({
      visible: false,
      opportuntiy: null,
      signalId: null,
    });

    setShowCategory({
      visible: false,
      oppoId: null,
      category: null,
      signalId: null,
    });
  };

  const columns = [
    {
      key: "salesuser",
      title: "Sales",
      dataIndex: "salesuser",

      render: (salesuser) =>
        salesuser?.firstname ? (
          <b>
            <NavLink
              className="text-capitalize"
              to={"/forecastintelligence/" + salesuser?._id}
              exact
              key={1}
            >
              <Highlighter
                highlightClassName={"highlighter"}
                searchWords={[searchWord]}
                autoEscape={false}
                textToHighlight={
                  salesuser?.firstname + " " + salesuser?.lastname
                }
              />
            </NavLink>
          </b>
        ) : (
          "-"
        ),
      hidden: typeSignals === "team" ? false : true,
      width: 100,
    },
    {
      key: "opportunity",
      title: "Deal",
      sorter: (a, b) =>
        a?.opportunity?.name?.localeCompare(b?.opportunity?.name),
      render: (row) => {
        return row?.opportunity?._id ? (
          <Typography.Link href={`/deal_intelligence/${row?.opportunity._id}`}>
            <b>{row?.opportunity?.name}</b>
            &nbsp;.&nbsp;
            <Typography.Text ellipsis className="textDescription">
              {row?.opportunity?.account?.name}
            </Typography.Text>
          </Typography.Link>
        ) : (
          "-"
        );
      },
      hidden: typeSignals !== "own" && typeSignals !== "team" ? false : true,
    },

    {
      key: "signal",
      title: "Signals",
      dataIndex: "signal",
      sorter: (a, b) => a?.signal?.localeCompare(b?.signal),
    },
    {
      key: "type",
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a?.type?.localeCompare(b?.type),
      onFilter: (value, record) => record?.type.includes(value),
      filters: [
        ...new Set(
          [
            ...new Set(
              [
                ...(signalsList?.global_signals || []),
                ...(signalsList?.manager_sig || []),
                ...(signalsList?.opp_signals || []),
                ...(signalsList?.sales_sig || []),
              ]?.map((item) => item.type)
            ),
          ]?.map((obj) => {
            return {
              text: obj,
              value: obj,
            };
          })
        ),
      ],

      filterSearch: true,
      render: (type) => (
        <Highlighter
          highlightClassName={"highlighter"}
          searchWords={[searchWord]}
          autoEscape={false}
          textToHighlight={type}
        />
      ),
    },
    {
      key: "quarter",
      title: "Quarter",
      dataIndex: "quarter",
      render: (quarter) => (quarter ? "Q" + quarter : "-"),
    },
    {
      key: "createddate",
      title: "Date",
      dataIndex: "createddate",
      render: (row) => moment(row).format("ll"),

      filters: [
        ...alphaMonths.map((item, index) => {
          return {
            text: item?.name,
            value: index,
          };
        }),
      ],
      onFilter: (value, record) => {
        return moment(record?.createddate).month() === value;
      },
    },
    {
      key: "Action",
      title: "Action",
      render: (row) =>
        row?.subType !== null && row?.subType === "revqual" ? (
          <Tooltip placement="bottom" title="Show risk">
            <Button
              size="middle"
              shape="round"
              onClick={() => setVisible(true)}
              icon={<WarningOutlined />}
            ></Button>
          </Tooltip>
        ) : row?.subType !== null ? (
          <Tooltip placement="bottom" title="Go to category">
            <Button
              size="middle"
              shape="round"
              onClick={() => {
                reset();
                setShowCategory({
                  visible: true,
                  oppoId: row?.opportunity?._id,
                  category: row?.subType,
                  signalId: row?._id,
                });
                setLayoutSize(CUSTOM_LAYOUT);
              }}
              icon={<SelectOutlined />}
            ></Button>
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" title="Update opportunity">
            <Button
              size="middle"
              shape="round"
              icon={<EditOutlined />}
              onClick={() => {
                setShowCategory();
                setOppToUpdate({
                  visible: true,
                  opportunity: row?.opportunity,
                  signalId: row?._id,
                });
                setLayoutSize(CUSTOM_LAYOUT);
              }}
            ></Button>
          </Tooltip>
        ),
      hidden: typeSignals === "global" ? true : false,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "",
      width: 120,

      render: (signal) => (
        <div align="center">
          <Tooltip title="Flag" placement="bottom">
            <FlagOutlined
              onClick={() =>
                updateSignals(
                  {
                    isFlagged: !signal?.isFlagged,
                    isSnoozed: false,
                    isIgnored: false,
                    isDeleted: false,
                  },
                  signal?._id
                )
              }
              className={
                classes.signalsIcon +
                " " +
                (signal?.isFlagged ? classes.primary : classes.secondary)
              }
            />
          </Tooltip>
          <Tooltip title="Snooze" placement="bottom">
            <WarningOutlined
              onClick={() =>
                updateSignals(
                  {
                    isSnoozed: !signal?.isSnoozed,
                    isFlagged: false,
                    isIgnored: false,
                    isDeleted: false,
                  },
                  signal?._id
                )
              }
              className={
                classes.signalsIcon +
                " " +
                (signal?.isSnoozed ? classes.primary : classes.secondary)
              }
            />
          </Tooltip>
          <Tooltip title="Ignore" placement="bottom">
            <CloseCircleOutlined
              onClick={() =>
                updateSignals(
                  {
                    isIgnored: !signal?.isIgnored,
                    isSnoozed: false,
                    isFlagged: false,
                    isDeleted: false,
                  },
                  signal?._id
                )
              }
              className={
                classes.signalsIcon +
                " " +
                (signal?.isIgnored ? classes.primary : classes.secondary)
              }
            />
          </Tooltip>
          <Tooltip title="Delete signal" placement="bottomLeft">
            <Popconfirm
              title="Are you sure delete this signal?"
              placement="bottomLeft"
              onConfirm={() =>
                updateSignals(
                  {
                    isIgnored: false,
                    isSnoozed: false,
                    isFlagged: false,
                    isDeleted: !signal?.isDeleted,
                  },
                  signal?._id
                )
              }
            >
              <DeleteOutlined
                className={
                  classes.signalsIcon +
                  " " +
                  (signal?.isDeleted ? classes.danger : classes.secondary)
                }
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ].filter((item) => !item.hidden);

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  useEffect(() => {
    if (user) {
      getSignals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, typeSignals]);

  // useEffect(() => {
  //   filterSignals();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedStatus]);

  // useEffect(() => {
  //   generalFilter();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedQuarter]);

  const getSignals = async () => {
    console.log(typeSignals);
    let userType = user?.role === "manager" ? "manager" : "sales";
    let link = "";
    // /action_mr/manager/go/62f4e6abadc3ff9678cd8bcc?category=sales
    if (typeSignals === "own") {
      link = "/signal_mr/by/go?category=" + userType + "&id=" + user?.id;
    } else if (typeSignals === "global") {
      link = "";
    } else if (typeSignals === "opportunity") {
      link =
        "/signal_mr/" + userType + "/go/" + user?.id + "?category=opportunity";
    } else if (typeSignals === "team") {
      link = "/signal_mr/manager/go/" + user?.id + "?category=sales";
    }

    setloadingSignals(true);
    try {
      const { data } = await axios.get(link);
      setloadingSignals(false);
      if (data?.success) {
        setSignalsList(data?.data?.sort((a, b) => b?.isFlagged - a?.isFlagged));
      }
    } catch (error) {
      setloadingSignals(false);
      console.log(error);
    }
  };

  const updateSignals = async (obj, id) => {
    try {
      const { data } = await axios.put("/signal_mr/" + id, obj);
      if (data) {
        getSignals();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generalFilter = () => {
    console.log(selectedStatus);
    console.log(selectedOpportunity);
    console.log(selectedQuarter);

    let filtredSignals = signalsList;
    //opportunity filter
    if (selectedOpportunity) {
      filtredSignals = filtredSignals?.filter(
        (item) => item?.opportunity?._id === selectedOpportunity
      );
    }
    //status filter
    if (selectedStatus) {
      filtredSignals =
        selectedStatus === "Done"
          ? filtredSignals?.filter((item) => item?.isDone === true)
          : filtredSignals;
      filtredSignals =
        selectedStatus === "Flagged"
          ? filtredSignals?.filter((item) => item?.isFlagged === true)
          : filtredSignals;
      filtredSignals =
        selectedStatus === "Snoozed"
          ? filtredSignals?.filter((item) => item?.isSnoozed === true)
          : filtredSignals;
      filtredSignals =
        selectedStatus === "Ignored"
          ? filtredSignals?.filter((item) => item?.isIgnored === true)
          : filtredSignals;
      filtredSignals =
        selectedStatus === "Deleted"
          ? filtredSignals?.filter((item) => item?.isDeleted === true)
          : filtredSignals;
    }

    //fiscal qurter filter
    if (selectedQuarter) {
      filtredSignals = filtredSignals?.filter(
        (item) => parseInt(item?.fiscalquarter) === parseInt(selectedQuarter)
      );
    }

    // //fiscal year filter
    // if (selectedYear) {
    //   filtredSignals = filtredSignals?.filter(
    //     (item) => parseInt(item?.fiscalyear) === parseInt(selectedYear)
    //   );
    // }
    // //fiscal month filter
    // if (selectedMonth) {
    //   filtredSignals = filtredSignals?.filter(
    //     (item) => parseInt(item?.fiscalmonth) === parseInt(selectedMonth)
    //   );
    // }

    return selectedStatus === "Deleted"
      ? filtredSignals?.filter((item) => item?.isDeleted === true)
      : filtredSignals?.filter((item) => item?.isDeleted === false);
  };

  return (
    <>
      <RiskOpportunity setVisible={setVisible} visible={visible} />
      <CollapsedCard bodyColor="#fff" title="Signals">
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Slider affixedTop={0}>
              <Select
                className="custom-select"
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={"own"}
                onChange={(e) => setTypeSignals(e)}
                value={typeSignals}
              >
                <Option value="global" disabled>
                  General
                </Option>
                <Option value="opportunity">Deal</Option>
                <Option value="own">Own</Option>
                {user?.role === "manager" && <Option value="team">Team</Option>}
              </Select>
              {user?.role === "manager" && (
                <Select
                  className="custom-select"
                  disabled={typeSignals === "team" ? false : true}
                  size="middle"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Sales list"
                  // onChange={(e) => setSelectedSales(e)}
                >
                  {salesList?.map((sales, index) => (
                    <Option key={index} value={sales?._id}>
                      {sales?.lastname + " " + sales?.firstname}
                    </Option>
                  ))}
                </Select>
              )}
              <Select
                className="custom-select"
                showSearch
                disabled={typeSignals === "opportunity" ? false : true}
                loading={Loadingopportunities}
                allowClear
                style={{ width: "100%" }}
                placeholder="Opportunity"
                onChange={(e) => setSelectedOpportunity(e)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {opportunities?.map((item, index) => (
                  <Option key={index} value={item?._id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
              <Select
                className="custom-select"
                showSearch
                allowClear
                style={{ width: "100px" }}
                placeholder="Quarter"
                onChange={(e) => setSelectedQuarter(e)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                <Option value={1}>Q1</Option>
                <Option value={2}>Q2</Option>
                <Option value={3}>Q3</Option>
                <Option value={4}>Q4 </Option>
              </Select>
              <Select
                className="custom-select"
                showSearch
                allowClear
                style={{ width: "150px" }}
                placeholder="Status"
                onChange={(e) => setSelectedStatus(e)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                <Option className={"textDescriptionX2"} value={"Done"}>
                  <FlagOutlined /> Done (
                  {signalsList?.filter((item) => item?.isDone)?.length})
                </Option>
                <Option value={"Flagged"}>
                  <FlagOutlined /> Flagged (
                  {signalsList?.filter((item) => item?.isFlagged)?.length})
                </Option>
                <Option value={"Snoozed"}>
                  <WarningOutlined /> Snoozed (
                  {signalsList?.filter((item) => item?.isSnoozed)?.length})
                </Option>
                <Option value={"Ignored"}>
                  <CloseCircleOutlined /> Ignored (
                  {signalsList?.filter((item) => item?.isIgnored)?.length}){" "}
                </Option>
                <Option value={"Deleted"}>
                  <Typography.Text type="danger">
                    <DeleteOutlined /> Deleted (
                    {signalsList?.filter((item) => item?.isDeleted)?.length})
                  </Typography.Text>
                </Option>
              </Select>
            </Slider>
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: layoutSize.table.md }}
            lg={{ span: layoutSize.table.lg }}
          >
            {/* <SignalsFilter /> */}

            <Table
              rowClassName={(record, index) => {
                return (
                  (record?._id === showCategory?.signalId ||
                    record?._id === oppoToUpdate?.signalId) &&
                  "highlight-table-row"
                );
              }}
              // showHeader={false}
              rowKey="_id"
              scroll={{ x: 800, y: "75vh" }}
              loading={loadingSignals}
              size="small"
              columns={columns}
              dataSource={generalFilter()}
            />
          </Col>

          {showCategory?.visible && (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: layoutSize.category.md }}
              lg={{ span: layoutSize.category.lg }}
            >
              <Affix offsetTop={50}>
                <Card
                  bodyStyle={{ padding: " 5px 3px", overflow: "hidden" }}
                  title={showCategory?.category}
                  extra={
                    <Tooltip title="close window">
                      <CloseOutlined
                        className={"action-icon"}
                        onClick={() => {
                          setShowCategory({
                            visible: false,
                            oppoId: null,
                            category: null,
                            signalId: null,
                          });
                          setLayoutSize(DEFAUL_LAYOUT);
                        }}
                      />
                    </Tooltip>
                  }
                >
                  <SignalsCategory
                    setOppToUpdate={() =>
                      setOppToUpdate({
                        visible: false,
                        opportuntiy: null,
                        signalId: null,
                      })
                    }
                    oppId={showCategory?.oppoId}
                    categoryLabel={showCategory?.category}
                    setLayoutSize={() => setLayoutSize(DEFAUL_LAYOUT)}
                  />
                </Card>
              </Affix>
            </Col>
          )}

          {oppoToUpdate?.visible && (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: layoutSize.category.md }}
              lg={{ span: layoutSize.category.lg }}
            >
              <Affix offsetTop={50}>
                <Card
                  bodyStyle={{
                    padding: " 5px 3px",
                    margin: "auto 5px",
                    overflow: "hidden",
                  }}
                  title={oppoToUpdate?.opportunity?.name}
                  extra={
                    <Tooltip title="close window">
                      <CloseOutlined
                        className={"action-icon"}
                        onClick={() => {
                          setOppToUpdate({
                            visible: false,
                            opportuntiy: null,
                            signalId: null,
                          });
                          setLayoutSize(DEFAUL_LAYOUT);
                        }}
                      />
                    </Tooltip>
                  }
                >
                  <UpdateOpportunity
                    opportunity={oppoToUpdate?.opportunity}
                    getSignals={getSignals}
                    signalId={oppoToUpdate?.signalId}
                    setOppToUpdate={() =>
                      setOppToUpdate({
                        visible: false,
                        opportuntiy: null,
                        signalId: null,
                      })
                    }
                    setLayoutSize={() => setLayoutSize(DEFAUL_LAYOUT)}
                  />
                </Card>
              </Affix>
            </Col>
          )}
        </Row>
      </CollapsedCard>
    </>
  );
};

export default Signals;
