import React, { useEffect, useState } from "react";
//ANT DESIGN COMPONENTS
import {
  Badge as AntBadge,
  Button,
  Col,
  message,
  notification,
  Popover,
  Progress,
  Row,
  Select,
  Tag,
  Table,
  Typography,
  Input,
  Divider,
  Tooltip,
  DatePicker,
} from "antd";

import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  FaPencilAlt,
  FaRegHandPointer,
  FaSearch,
  FaWifi,
} from "react-icons/fa";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { NumFormatter } from "../Services/Utils/Utils";
import { updateOpportunityItem } from "../../redux/Slices/Opportunity.slices";
// import * as classes from "./DealsDetails.module.css";
import { EditText, EditTextarea } from "react-edit-text";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import Slider from "../../template/NewDesign/Components/Slider/Slider";
import Highlighter from "react-highlight-words";

const { Option } = Select;

const DealsDetails = ({ open }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [updateloading, setUpdateLoading] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);

  const opportunities = useSelector(
    (state) => state.opportunity?.filtredList || []
  );
  const dealRisk = useSelector(
    (state) => state.opportunity?.aiOpportunity?.data || []
  );
  const forecastCategory = useSelector((state) => state.forecastCategory?.data);
  const forecastCategoryLoading = useSelector(
    (state) => state.forecastCategory?.loading
  );
  const satgeList = useSelector((state) => state.stages?.data || []);
  const loading = useSelector((state) => state.opportunity?.loading || false);
  const userActions = useSelector((state) => state.actions?.data || []);

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  const risckRenderDom = (risk) => {
    if (risk >= 0 && risk < 25) {
      return <AntBadge status="success" text={risk + "%"} />;
    } else if (risk >= 25 && risk < 50) {
      return <AntBadge status="processing" text={risk + "%"} />;
    } else if (risk >= 50 && risk < 75) {
      return <AntBadge status="warning" text={risk + "%"} />;
    } else if (risk >= 75 && risk < 100) {
      return <AntBadge status="error" text={risk + "%"} />;
    }
  };
  const MoreInfo = (row, risck) => {
    return (
      <Popover
        mouseEnterDelay={1}
        placement="left"
        trigger={["hover"]}
        title={<b className={"textDescriptionX2"}>Deal Overview</b>}
        content={
          <>
            <Row className="dealPopup">
              <Col span={24}>
                <Typography.Text className="textDescription">
                  Account
                </Typography.Text>
                <br />
                <div className="">
                  <Typography.Text className={"textPrimary"} strong>
                    {row?.account?.name || ""}
                  </Typography.Text>{" "}
                  -{" "}
                  <Typography.Text className={"textDescription"}>
                    {row?.account?.billingcountry}
                  </Typography.Text>
                </div>
                <Divider
                  plain
                  orientation="right"
                  style={{ margin: "7px 0 " }}
                />
              </Col>

              <Col span={12}>
                <Typography.Text className="textDescription">
                  Amount
                </Typography.Text>
                <br />
                <Typography.Title level={5} className="textDescriptionX2">
                  {row?.amount}
                </Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Text className="textDescription">
                  Risk Score
                </Typography.Text>
                <br />
                <Typography.Title
                  level={5}
                  className={
                    row?.risk > 75 ? "textDanger" : "textDescriptionX2"
                  }
                >
                  {row?.risk}%
                </Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Text className="textDescription">
                  Progress
                </Typography.Text>
                <br />
                <Progress
                  strokeColor={[
                    "#f74b49 ",
                    "#f74b49 ",
                    "#fb8c00",
                    "#43a047",
                    "#43a047",
                  ]}
                  steps={5}
                  strokeWidth={7}
                  percent={Math.round(row?.dealprogress)}
                />
              </Col>
              <Col span={12}>
                <Typography.Text className="textDescription">
                  Coaching
                </Typography.Text>
                <br />

                <Progress
                  strokeColor={[
                    "#f74b49 ",
                    "#f74b49 ",
                    "#fb8c00",
                    "#43a047",
                    "#43a047",
                  ]}
                  steps={5}
                  strokeWidth={7}
                  percent={Math.round(row?.dealcoaching)}
                />
              </Col>
            </Row>
          </>
        }
      >
        <Typography.Link href={`/deal_intelligence/${row._id}`}>
          <b>
            <Highlighter
              textToHighlight={row?.name || "-"}
              searchWords={[keyWord]}
            />
            {risck.filter((item) => item?.opp_id === row.idorigin).length ===
              1 && <ExclamationCircleOutlined className="turn-signals" />}
          </b>
          &nbsp;.&nbsp;
          <Typography.Text ellipsis className="textDescription">
            <Highlighter
              textToHighlight={row?.account?.name || "-"}
              searchWords={[keyWord]}
            />
          </Typography.Text>
          {updateloading?.id === row?._id && (
            <LoadingOutlined
              size={25}
              style={{ position: "absolute", right: 3, bottom: 5 }}
            />
          )}
        </Typography.Link>
      </Popover>
    );
  };

  const columns = [
    {
      key: 1,
      title: "Name",
      render: (record) => MoreInfo(record, dealRisk),
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      onFilter: (value, record) => record?.name.includes(value),
      filters: [
        ...opportunities?.map((item) => {
          return {
            text: item?.name,
            value: item?.name,
          };
        }),
      ],
      filterSearch: true,
      fixed: true,
      width: "150px",
    },
    {
      key: 4,
      title: "Sales Rep",
      sorter: (a, b) =>
        a?.salesuser?.lastname.localeCompare(b?.salesuser?.lastname),
      render: (record) => (
        <Typography.Link
          underline
          href={"/forecastintelligence/" + record?.salesuser?._id}
        >
          <Highlighter
            textToHighlight={
              record?.salesuser
                ? record?.salesuser?.lastname +
                  " " +
                  record?.salesuser?.firstname
                : "-"
            }
            searchWords={[keyWord]}
          />
        </Typography.Link>
      ),
      hidden: user?.role === "manager" ? false : true,
    },
    {
      key: 5,
      title: "Amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (record) => (
        <div className={"textEditableContainer"}>
          <EditText
            name="amount"
            placeholder="Amount"
            type="number"
            formatDisplayText={(e) => NumFormatter(e)}
            showEditButton
            editButtonContent={<FaPencilAlt />}
            defaultValue={parseInt(record?.amount)}
            onSave={(e) => {
              parseInt(e?.value) !== parseInt(e?.previousValue) &&
                updateOpportunity("amount", record?._id, {
                  amount: parseInt(e?.value),
                });
            }}
          />
        </div>
      ),
      width: "90px",
    },
    {
      key: 6,
      title: "Stage",
      sorter: (a, b) => a.stagename.localeCompare(b.stagename),
      onFilter: (value, record) => record?.stagename?.includes(value),
      filters: [
        ...satgeList?.map((item) => {
          return {
            text: item.apiname,
            value: item.apiname,
          };
        }),
      ],
      filterSearch: true,
      render: (record) => (
        <Select
          allowClear
          bordered={false}
          value={record.stagename}
          style={{ width: "100%" }}
          placeholder="Stage"
          size="small"
          onChange={(e) =>
            updateOpportunity("stage", record?._id, { stagename: e })
          }
        >
          {satgeList?.map((item, index) => (
            <Option key={index} value={item.apiname}>
              <Highlighter
                textToHighlight={item.apiname}
                searchWords={[keyWord]}
              />
            </Option>
          ))}
        </Select>
      ),
      width: "150px",
    },
    {
      key: 7,
      title: "Close date",
      sorter: (a, b) => moment(a?.closedate) - moment(b?.closedate),

      render: (record) => (
        <DatePicker
          allowClear={false}
          format={"ll"}
          value={moment(record.closedate)}
          bordered={false}
          onChange={(e) => {
            e?.value !== record.closedate &&
              updateOpportunity("closedate", record?._id, {
                closedate: moment(e?.value).format(),
              });
          }}
        />
      ),
      width: "150px",
    },
    {
      key: 8,
      title: <Tooltip title="AI Close Date">AI C-Date</Tooltip>,
      sorter: (a, b) =>
        moment(a?.estimatedCloseDate) - moment(b?.estimatedCloseDate),

      render: (record) => (
        <span>
          {record?.estimatedCloseDate
            ? moment(record?.estimatedCloseDate).format("ll")
            : "-"}
        </span>
      ),
      width: "6.5%",
    },
    {
      key: 9,
      title: <Tooltip title="AI Risk Score">Risk</Tooltip>,
      sorter: (a, b) => moment(a?.closedate) - moment(b?.closedate),
      render: (record) => risckRenderDom(record?.risk),
      width: "70px",
    },
    {
      key: 10,
      title: "Next Step",
      selector: (record) => record?.nextstep,
      render: (record) => (
        <EditTextarea
          className="edittext"
          name="nextstep"
          placeholder="Next step"
          editButtonContent={<FaPencilAlt />}
          type="date"
          rows={2}
          defaultValue={record?.nextstep}
          onSave={(e) =>
            e?.value !== e?.previousValue &&
            updateOpportunity("nextstep", record?._id, { nextstep: e?.value })
          }
          showEditButton
        />
      ),
      sortable: true,
      width: "150px",
    },
    {
      key: 11,
      title: <Tooltip title="Manager Judgement">Mgr Judgement</Tooltip>,
      onFilter: (value, record) => record?.managerjudgment?.includes(value),
      filters: [
        ...forecastCategory?.map((item) => {
          return {
            text: item.name,
            value: item.name,
          };
        }),
      ],
      filterSearch: true,
      render: (record) => (
        <>
          <Select
            loading={forecastCategoryLoading}
            value={record.managerjudgment}
            placeholder="Mgr Judgement"
            allowClear
            bordered={false}
            style={{ width: "100%" }}
            size="small"
            onChange={(e) =>
              updateOpportunity("managerjudgment", record?._id, {
                managerjudgment: e,
              })
            }
          >
            {forecastCategory?.map((item, index) => (
              <Option value={item?.name} key={index}>
                <Highlighter
                  textToHighlight={item?.name}
                  searchWords={[keyWord]}
                />
              </Option>
            ))}
          </Select>
        </>
      ),
      hidden: user?.role === "manager" ? false : true,
      width: "130px",
    },
    {
      key: 12,
      title: <Tooltip title="Forecast Category">F-Category</Tooltip>,

      onFilter: (value, record) =>
        record?.forecastcategoryname?.includes(value),
      filters: [
        ...forecastCategory?.map((item) => {
          return {
            text: item.name,
            value: item.name,
          };
        }),
      ],
      filterSearch: true,
      render: (record) => (
        <Highlighter
          textToHighlight={record.forecastcategoryname}
          searchWords={[keyWord]}
        />
      ),
      width: "100px",
    },
    {
      key: 13,
      title: "Deal Progress",
      selector: (record) => record.dealprogress,
      sorter: (a, b) => a?.dealprogress - b?.dealprogress,

      render: (record) => (
        <Progress
          strokeColor={[
            "#f74b49 ",
            "#f74b49 ",
            "#fb8c00",
            "#43a047",
            "#43a047",
          ]}
          strokeWidth={7}
          steps={5}
          percent={Math.round(record?.dealprogress)}
        />
      ),
    },
    {
      key: 14,
      title: "Deal Coaching",
      sorter: (a, b) => a?.dealcoaching - b?.dealcoaching,

      render: (record) => (
        <Progress
          strokeColor={[
            "#f74b49 ",
            "#f74b49 ",
            "#fb8c00",
            "#43a047",
            "#43a047",
          ]}
          steps={5}
          strokeWidth={7}
          percent={Math.round(record?.dealcoaching)}
        />
      ),
    },
    {
      key: 15,
      title: "Signals/Actions",
      render: (record) => (
        <div style={{ display: "flex", textAlign: "center" }}>
          <Tag style={{ minWidth: 45 }} color="green">
            <FaWifi /> <b> {record?.opportunitysignals?.length}</b>
          </Tag>
          &nbsp;
          <Tag style={{ minWidth: 45, textAlign: "center" }} color="blue">
            <FaRegHandPointer />{" "}
            <b>
              {
                userActions?.filter((item) => item?.opportunity === record?._id)
                  .length
              }
            </b>
          </Tag>
        </div>
      ),
    },
  ].filter((item) => !item?.hidden);

  const updateOpportunity = async (target = null, id, obj) => {
    setUpdateLoading({
      id: id,
      loading: true,
    });
    notification.destroy();
    let route = null;

    if (target === "stage") {
      route = "stagename/" + id + "/" + user?.originId;
    } else if (target === "closedate") {
      route = "closedate/" + id + "/" + user?.originId;
      obj = {
        ...obj,
        fiscalquarter: moment(obj.closedate).quarter(),
      };
    } else if (target === "amount") {
      route = "amount/" + id + "/" + user?.originId;
    } else if (target === "nextstep") {
      route = "nextstep/" + id + "/" + user?.originId;
    } else if (target === "managerjudgment") {
      route = "/" + id;
    }

    if (id && target) {
      dispatch(
        updateOpportunityItem({
          opportunityId: id,
          target,
          value: obj,
        })
      );
      try {
        const { data } = await axios.put("/opportunity/" + route, obj);
        setUpdateLoading(false);

        if (data?.success) {
          message.success(Object.keys(obj)[0] + " updated");
        }
      } catch (error) {
        setUpdateLoading(false);

        notification.error({
          placement: "bottomRight",
          message: "Deal cannot be updated",
          description: (
            <>
              <Button danger onClick={() => updateOpportunity(target, id, obj)}>
                Retry
              </Button>
            </>
          ),
        });
      }
    }
  };

  // const conditionalRowStyles = [
  //   {
  //     when: (row) =>
  //       dealRisk.filter((item) => item?.opp_id === row.idorigin).length === 1,
  //   },
  // ];
  const filtredOpportunityList = () => {
    let newArray = [];
    if (keyWord !== null) {
      newArray = opportunities?.filter((item) =>
        (
          item?.name +
          " " +
          item?.amount +
          " " +
          item?.forecastcategoryname +
          " " +
          item?.nextstep +
          " " +
          item?.managerjudgment +
          " " +
          item?.stagename +
          " " +
          item?.account?.name +
          " " +
          item?.account?.billingcountry +
          " " +
          item?.salesuser?.firstname +
          " " +
          item?.salesuser?.lastname
        )
          ?.toString()
          ?.toLocaleLowerCase()
          ?.includes(keyWord)
      );
    }
    if (selectedAccount) {
      newArray = newArray?.filter(
        (item) => item?.account?.name === selectedAccount
      );
    }

    return newArray;
  };

  return (
    <CollapsedCard
      description={[
        {
          title: "Total deal",
          value: opportunities?.length,
        },
      ]}
      bodyColor="#fff"
      open={open}
      count={opportunities?.length || "-"}
      title={"Pipeline details"}
      loading={"loading"}
      extra={"lkl"}
    >
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Slider affixedTop="-">
            <Input
              onPressEnter={(e) => setKeyWord(e.target.value?.toLowerCase())}
              onChange={(e) =>
                e.target.value === "" &&
                setKeyWord(e.target.value?.toLowerCase())
              }
              allowClear
              prefix={<FaSearch className="textDescriptionX2" />}
              className="custom-input"
              placeholder="Search"
            />
            <Select
              onChange={(e) => setSelectedAccount(e)}
              className="custom-select"
              showSearch
              allowClear
              placeholder="Account    "
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              style={{ maxWidth: 300, minWidth: 200 }}
            >
              {[
                ...new Set(opportunities.map((item) => item?.account?.name)),
              ]?.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Slider>
        </Col>
        <Col span={24}>
          <Table
            showSorterTooltip={false}
            size="large"
            tableLayout="fixed"
            loading={loading}
            scroll={{ x: 1600, y: "75vh" }}
            columns={columns}
            dataSource={filtredOpportunityList() || []}
          />
        </Col>
      </Row>
    </CollapsedCard>
  );
};
export default DealsDetails;
