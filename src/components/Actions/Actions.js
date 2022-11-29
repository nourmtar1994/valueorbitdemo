import {
  CloseCircleOutlined,
  DeleteOutlined,
  FlagOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Col, Row, Table, Select, Tooltip, Popconfirm, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as classes from "./Actions.module.css";
import moment from "moment";
import Cookies from "js-cookie";
// import ActiondHeader from "../../template/Composants/ActiondHeader/ActiondHeader";
// import Highlighter from "react-highlight-words";
import { NavLink } from "react-router-dom";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import Slider from "../../template/NewDesign/Components/Slider/Slider";
// import Highlighter from "react-highlight-words";

// import ActionsFilter from "./ActionsFilter/ActionsFilter";
const { Option } = Select;

const Signals = () => {
  const [user, setUser] = useState(null);
  const [actionsList, setActionsList] = useState([]);
  const [loadingActions, setloadingActions] = useState([]);

  const [typeActions, setTypeActions] = useState("opportunity");
  const [selectedSales, setSelectedSales] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  // const [searchWord, setSearchWord] = useState("");

  const salesList = useSelector((state) => state.sales?.data || []);
  const opportunityList = useSelector(
    (state) => state.opportunity?.defaultList || []
  );

  const columns = [
    {
      key: 3,
      title: "Sales",
      dataIndex: "salesuser",
      render: (salesuser) => {
        return (
          <NavLink
            className="text-capitalize"
            to={"/forecastintelligence/" + salesuser?._id}
            exact
            key={salesuser?._id}
          >
            <b>{salesuser?.firstname + " " + salesuser?.lastname}</b>
          </NavLink>
        );
      },
      width: "100px",
      hidden:
        user?.role === "manager"
          ? typeActions === "team" || typeActions === "TeamOpportunity"
            ? false
            : true
          : true,
    },

    {
      key: "opportunity",
      title: "Deal",
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
      hidden: typeActions !== "own" && typeActions !== "team" ? false : true,
    },
    {
      key: 1,
      title: "Action",
      dataIndex: "action",
    },
    {
      key: 2,

      title: "Type",
      dataIndex: "type",
    },

    {
      key: 4,
      title: "Object",
      dataIndex: "object",
      hidden: true,
    },
    {
      key: 5,
      title: "Date",
      dataIndex: "createddate",
      render: (row) => moment(row).format("ll"),
      width: 120,
    },
    {
      key: 6,
      title: "Status",
      dataIndex: "",
      width: 120,

      render: (action) => (
        <div align="center" key={action?._id}>
          <Tooltip title="Flag">
            <FlagOutlined
              onClick={() =>
                updateActions(
                  {
                    isFlagged: !action?.isFlagged,
                    isSnoozed: false,
                    isIgnored: false,
                    isDeleted: false,
                  },
                  action?._id
                )
              }
              className={
                classes.actionsIcon +
                " " +
                (action?.isFlagged ? classes.primary : classes.secondary)
              }
            />
          </Tooltip>
          <Tooltip title="Snooze">
            <WarningOutlined
              onClick={() =>
                updateActions(
                  {
                    isSnoozed: !action?.isSnoozed,
                    isFlagged: false,
                    isIgnored: false,
                    isDeleted: false,
                  },
                  action?._id
                )
              }
              className={
                classes.actionsIcon +
                " " +
                (action?.isSnoozed ? classes.primary : classes.secondary)
              }
            />
          </Tooltip>
          <Tooltip title="Ignore">
            <CloseCircleOutlined
              onClick={() =>
                updateActions(
                  {
                    isIgnored: !action?.isIgnored,
                    isSnoozed: false,
                    isFlagged: false,
                    isDeleted: false,
                  },
                  action?._id
                )
              }
              className={
                classes.actionsIcon +
                " " +
                (action?.isIgnored ? classes.primary : classes.secondary)
              }
            />
          </Tooltip>
          <Tooltip title="Delete signal" placement="topRight">
            <Popconfirm
              title="Are you sure delete this signal?"
              placement="bottomLeft"
              onConfirm={() =>
                updateActions(
                  {
                    isIgnored: false,
                    isSnoozed: false,
                    isFlagged: false,
                    isDeleted: !action?.isDeleted,
                  },
                  action?._id
                )
              }
            >
              <DeleteOutlined
                className={
                  classes.actionsIcon +
                  " " +
                  (action?.isDeleted ? classes.danger : classes.secondary)
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
      getActions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, typeActions]);

  const getActions = async () => {
    setActionsList([]);
    console.log(typeActions);
    let userType = user?.role === "manager" ? "manager" : "sales";
    let link = "";
    // /action_mr/manager/go/62f4e6abadc3ff9678cd8bcc?category=sales
    if (typeActions === "own") {
      link = "/action_mr/by/go?category=" + userType + "&id=" + user?.id;
    } else if (typeActions === "global") {
      link = "";
    } else if (typeActions === "opportunity") {
      link =
        "/action_mr/" + userType + "/go/" + user?.id + "?category=opportunity";
    } else if (typeActions === "team") {
      link = "/action_mr/manager/go/" + user?.id + "?category=sales";
    }

    setloadingActions(true);
    try {
      const { data } = await axios.get(link);
      setloadingActions(false);
      if (data?.success) {
        setActionsList(data?.data?.sort((a, b) => b?.isFlagged - a?.isFlagged));
      }
    } catch (error) {
      setloadingActions(false);
      console.log(error);
    }
  };

  const updateActions = async (obj, id) => {
    try {
      const { data } = await axios.put("/action_mr/" + id, obj);
      if (data) {
        getActions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generalFilter = () => {
    let filtredActions = actionsList;
    //opportunity filter
    if (selectedOpportunity) {
      filtredActions = filtredActions?.filter(
        (item) => item?.opportunity?._id === selectedOpportunity
      );
    }
    //status filter
    if (selectedStatus) {
      filtredActions =
        selectedStatus === "Done"
          ? filtredActions?.filter((item) => item?.isDone === true)
          : filtredActions;
      filtredActions =
        selectedStatus === "Flagged"
          ? filtredActions?.filter((item) => item?.isFlagged === true)
          : filtredActions;
      filtredActions =
        selectedStatus === "Snoozed"
          ? filtredActions?.filter((item) => item?.isSnoozed === true)
          : filtredActions;
      filtredActions =
        selectedStatus === "Ignored"
          ? filtredActions?.filter((item) => item?.isIgnored === true)
          : filtredActions;
      filtredActions =
        selectedStatus === "Deleted"
          ? filtredActions?.filter((item) => item?.isDeleted === true)
          : filtredActions;
    }

    //fiscal qurter filter
    // if (selectedQuarter) {
    //   filtredActions = filtredActions?.filter(
    //     (item) => parseInt(item?.fiscalquarter) === parseInt(selectedQuarter)
    //   );
    // }

    // //fiscal year filter
    // if (selectedYear) {
    //   filtredActions = filtredActions?.filter(
    //     (item) => parseInt(item?.fiscalyear) === parseInt(selectedYear)
    //   );
    // }
    // //fiscal month filter
    // if (selectedMonth) {
    //   filtredActions = filtredActions?.filter(
    //     (item) => parseInt(item?.fiscalmonth) === parseInt(selectedMonth)
    //   );
    // }

    return selectedStatus === "Deleted"
      ? filtredActions?.filter((item) => item?.isDeleted === true)
      : filtredActions?.filter((item) => item?.isDeleted === false);
  };

  return (
    <CollapsedCard bodyColor="#fff" title="Actions">
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Slider affixedTop={0}>
            <Select
              className="custom-select"
              style={{ minWidth: "100px" }}
              placeholder="Please select"
              defaultValue={"own"}
              onChange={(e) => setTypeActions(e)}
              value={typeActions}
            >
              <Option value="own">Own</Option>

              <Option value={"opportunity"}>Deal</Option>

              {user?.role === "manager" && (
                <>
                  <Option value="team">Team</Option>
                  <Option value="TeamOpportunity" disabled>
                    Team Deals
                  </Option>
                </>
              )}
            </Select>

            {user?.role === "manager" && typeActions === "team" && (
              <>
                <Select
                  className="custom-select"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Sales list"
                  onChange={(e) => setSelectedSales(e)}
                >
                  {salesList?.map((sales, index) => (
                    <Option key={index} value={sales?._id}>
                      {sales?.lastname + " " + sales?.firstname}
                    </Option>
                  ))}
                </Select>
              </>
            )}

            {(typeActions === "ownOpportunity" ||
              typeActions === "TeamOpportunity") && (
              <>
                <Select
                  className="custom-select"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Deal list"
                  onChange={(e) => setSelectedOpportunity(e)}
                >
                  {opportunityList?.map((opp, index) => (
                    <Option key={index} value={opp?._id}>
                      {opp?.name}
                    </Option>
                  ))}
                </Select>
              </>
            )}

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
              <Option value={"Flagged"}>
                <FlagOutlined /> Flagged (
                {actionsList?.filter((item) => item?.isFlagged)?.length})
              </Option>
              <Option value={"Snoozed"}>
                <WarningOutlined /> Snoozed (
                {actionsList?.filter((item) => item?.isSnoozed)?.length})
              </Option>
              <Option value={"Ignored"}>
                <CloseCircleOutlined /> Ignored (
                {actionsList?.filter((item) => item?.isIgnored)?.length}){" "}
              </Option>
              <Option value={"Deleted"}>
                <Typography.Text type="danger">
                  <DeleteOutlined /> Deleted (
                  {actionsList?.filter((item) => item?.isDeleted)?.length})
                </Typography.Text>
              </Option>
            </Select>
          </Slider>
        </Col>

        <Col span={24}>
          {/* <ActionsFilter searchSignals={searchSignals} /> */}

          <Table
            rowKey="_id"
            scroll={{ x: 800, y: "75vh" }}
            loading={loadingActions}
            size="small"
            columns={columns}
            dataSource={generalFilter(actionsList)}
          />
        </Col>
      </Row>
    </CollapsedCard>
  );
};

export default Signals;
