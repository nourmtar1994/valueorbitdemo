import React, { useState } from "react";
import {
  Col,
  Row,
  Input,
  Space,
  Table,
  Typography,
  Tag,
  Progress,
  Popover,
  Badge as AntBadge,
  Tooltip,
} from "antd";
import Highlighter from "react-highlight-words";
import {
  FaAngleDown,
  FaAngleRight,
  FaChessQueen,
  FaExternalLinkAlt,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import * as classes from "./AccountIntelligence.module.css";
import { NumFormatter } from "../Services/Utils/Utils";
import Cookies from "js-cookie";
import moment from "moment-timezone";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";

const AccountIntelligence = ({ open = true }) => {
  //Ref
  //States
  const [user, setUser] = useState(null);

  const [expended, setExpended] = useState();
  const [keyWord, setKeyWord] = useState("");
  //Redux States
  const accountsList = useSelector((state) => state?.accounts?.data || []);
  const contactsList = useSelector((state) => state?.accounts?.contacts || []);
  const LoadingaccountsList = useSelector((state) => state?.accounts?.loading);

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  const expend = (index) => {
    if (expended === index) setExpended(undefined);
    else setExpended(index);
  };
  const totalcoaching = (opportunities) => {
    let total = 0;
    opportunities?.map((row) => (total = total + row.dealcoaching));
    return Math.round(total / opportunities.length) || 0;
  };
  const totalprogress = (opportunities) => {
    let total = 0;
    opportunities.map((row) => (total = total + row.dealprogress));
    return Math.round(total / opportunities.length) || 0;
  };
  const totalAmount = (opportunities) => {
    let total = 0;
    opportunities.map((row) => (total = total + row.amount));
    return Math.round(total / opportunities.length) || 0;
  };
  const totalWin = (opportunities) => {
    return opportunities.filter(({ iswon }) => iswon === "true").length;
  };
  const getContacts = (id) => {
    return contactsList?.[accountsList.findIndex((el) => el._id === id)] || 0;
  };
  const totalRisk = (opportunities) => {
    let total = 0;
    opportunities.map((row) => (total = total + row.risk));
    total = Math.round(total / opportunities.length) || 0;

    return total;
  };
  const getLastTouch = (opportunities) => {
    let lastTouch =
      opportunities?.length > 0
        ? new Date(
            Math.max(...opportunities.map((e) => new Date(e.lastmodifieddate)))
          )
        : null;
    return lastTouch;
  };
  const filtredAccountList = () => {
    let newArray = [];
    if (keyWord !== null) {
      newArray = accountsList?.filter((item) =>
        (item?.name + " " + item?.billingcountry + " " + item?.owner)
          ?.toString()
          ?.toLocaleLowerCase()
          ?.includes(keyWord)
      );
    }

    return newArray;
  };
  const columns = [
    {
      title: "Name",
      key: "name",
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      onFilter: (value, record) => record?.name.includes(value),
      filters: [
        ...accountsList?.map((item) => {
          return {
            text: item?.name,
            value: item?.name,
          };
        }),
      ],
      filterSearch: true,

      render: (row) => (
        <>
          <Popover
            placement="right"
            overlayStyle={{ maxWidth: "50%" }}
            title={row.name}
            content={
              <>
                <Typography.Text className="textDescription">
                  {row?.description === ""
                    ? "No Description"
                    : row?.description}
                </Typography.Text>
                <br />
                <Typography.Link
                  target={"_blank"}
                  href={row?.website}
                  align="center"
                >
                  Go to Website &nbsp; <FaExternalLinkAlt autoReverse />
                </Typography.Link>
              </>
            }
          >
            <Typography.Text strong>
              <Highlighter
                textToHighlight={row.name || ""}
                searchWords={[keyWord]}
              />
            </Typography.Text>
            <br />
            <Typography.Text className={"textDescription"}>
              <Highlighter
                textToHighlight={row.billingcountry || ""}
                searchWords={[keyWord]}
              />
            </Typography.Text>
          </Popover>
        </>
      ),
    },
    {
      title: "Owner",
      key: "owner",
      sorter: (a, b) => a?.owner?.localeCompare(b?.owner),
      render: (record) => (
        <Typography.Link underline>
          <Highlighter
            textToHighlight={record?.owner || ""}
            searchWords={[keyWord]}
          />
        </Typography.Link>
      ),
      hidden: user?.role === "sales",
    },
    {
      title: "Total Deals",
      key: "totaldeals",
      render: (row, _1, index) => (
        <Tag
          style={{ cursor: "pointer" }}
          onClick={() => row?.opportunities?.length > 0 && expend(row?._id)}
          color="default"
          icon={<FaChessQueen className="icon_warning" />}
        >
          <>
            {" "}
            &nbsp;<b> {row?.opportunities.length} </b> Deal(s) &nbsp;
            {row?.opportunities?.length > 0 ? (
              expended === row?._id ? (
                <MinusOutlined onClick={(e) => expend(row?._id)} />
              ) : (
                <PlusOutlined onClick={(e) => expend(row?._id)} />
              )
            ) : (
              false
            )}
          </>
        </Tag>
      ),
      sorter: (a, b) => a.opportunities.length - b.opportunities.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Amount",
      key: "totalamount",
      sorter: (a, b) =>
        totalAmount(a.opportunities) - totalAmount(b.opportunities),
      render: (row) => (
        <b> {NumFormatter(totalAmount(row?.opportunities), true)}</b>
      ),
    },
    {
      title: "Total Risk",
      key: "totalrisk",
      sorter: (a, b) =>
        totalRisk(a?.opportunities) - totalRisk(b?.opportunities),
      sortDirections: ["descend", "ascend"],
      render: (row) => {
        let total = totalRisk(row?.opportunities);
        if (total >= 0 && total < 25) {
          return <AntBadge status="success" text={total + "%"} />;
        } else if (total >= 25 && total < 50) {
          return <AntBadge status="processing" text={total + "%"} />;
        } else if (total >= 50 && total < 75) {
          return <AntBadge status="warning" text={total + "%"} />;
        } else if (total >= 75 && total < 100) {
          return <AntBadge status="error" text={total + "%"} />;
        }
      },
    },
    {
      title: "Total Win",
      key: "totalwin",
      render: (row) => totalWin(row?.opportunities),
      sorter: (a, b) => totalWin(a?.opportunities) - totalWin(b?.opportunities),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Progress",
      key: "address",
      sorter: (a, b) =>
        totalcoaching(a?.opportunities) - totalcoaching(b?.opportunities),
      sortDirections: ["descend", "ascend"],
      render: (row) => (
        <div style={{ width: "fit-content" }}>
          <Progress
            strokeColor={[
              "#f74b49 ",
              "#f74b49 ",
              "#fb8c00",
              "#43a047",
              "#43a047",
            ]}
            strokeWidth={7}
            percent={totalcoaching(row?.opportunities)}
            steps={5}
          />
        </div>
      ),
    },
    {
      title: "Total Coaching",
      key: "TotalCoaching",
      sorter: (a, b) =>
        totalprogress(a?.opportunities) - totalprogress(b?.opportunities),
      sortDirections: ["descend", "ascend"],
      render: (row) => (
        <Progress
          type="line"
          strokeColor={[
            "#f74b49 ",
            "#f74b49 ",
            "#fb8c00",
            "#43a047",
            "#43a047",
          ]}
          strokeWidth={7}
          percent={totalprogress(row?.opportunities)}
          steps={5}
        />
      ),
    },
    {
      title: "Last Touch",
      key: "last_touch",

      // ...getColumnSearchProps("address"),

      sortDirections: ["descend", "ascend"],
      render: (row) => (
        <Typography.Text
          style={{ width: "fit-content", minWidth: "90px", display: "block" }}
        >
          {getLastTouch(row?.opportunities)
            ? moment(getLastTouch(row?.opportunities))?.format("ll")
            : "-"}
        </Typography.Text>
      ),
    },
    {
      title: "Total Contacts",
      key: "total_ontacts",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (row) => (
        <>
          <Tag color="default" icon={<FaUsers className="icon_primary" />}>
            &nbsp; <b>{getContacts(row?._id)} </b>Contact(s)
          </Tag>
        </>
      ),
    },
  ].filter((item) => !item?.hidden);

  const expandedRowRender = (opportunities) => {
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
    const childcolumns = [
      {
        key: "opponame",
        title: "Name",
        render: (record) => (
          <Typography.Link
            strong
            underline
            href={`/deal_intelligence/${record._id}`}
          >
            {record?.name}
          </Typography.Link>
        ),
      },
      {
        key: "oppoowner",
        title: "Owner",
        dataIndex: "owner",
        // render: (record) => record.name,
      },
      {
        key: "oppoamount",
        title: "Amount",
        // dataIndex: "amount",
        render: (record) => <b>{NumFormatter(record?.amount || 0, true)}</b>,
      },
      {
        key: "opporisk",
        title: "Risk",
        render: (record) => risckRenderDom(record.risk),
      },
      {
        key: "stagename",
        title: "Stage name",
        render: (record) => record.stagename,
      },
      {
        key: "oppodealprogress",
        title: "Progress",
        render: (record) => Math.round(record.dealprogress) + "%",
      },
      {
        key: "oppodealcoaching",
        title: "Coaching",
        render: (record) => Math.round(record.dealcoaching) + "%",
      },
      {
        key: "oppolasttouch",
        title: "Last Touch",
        render: (record) => moment(record.lastmodifieddate).format("ll"),
      },
    ];
    return (
      <div className={classes.subTable}>
        <Table
          columns={childcolumns}
          dataSource={opportunities}
          pagination={false}
        />
      </div>
    );
  };

  return (
    <CollapsedCard
      open={open}
      description={[
        {
          title: "Total account",
          value: accountsList?.length,
        },
      ]}
      title={"Account details"}
      loading={false}
      bodyColor="#fff"
    >
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Space style={{ padding: "10px 10px 0px 10px" }}>
            <Input
              allowClear
              prefix={<FaSearch className="textDescriptionX2" />}
              className="custom-input"
              type="text"
              placeholder="Search"
              onPressEnter={(e) => setKeyWord(e.target.value?.toLowerCase())}
              onChange={(e) =>
                e.target.value === "" &&
                setKeyWord(e.target.value?.toLowerCase())
              }
            />
          </Space>
        </Col>
        <Col span={24}>
          <Table
            siz
            scroll={{ x: 1300, y: "75vh" }}
            expandIcon={({ expanded, onExpand, record }) =>
              record?.opportunities?.length > 0 ? (
                expanded ? (
                  <Tooltip title="Hide Deals">
                    <FaAngleDown
                      cursor={"pointer"}
                      onClick={(e) => expend(record?._id, e)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Show Deals">
                    <FaAngleRight
                      cursor={"pointer"}
                      onClick={(e) => expend(record?._id, e)}
                    />{" "}
                  </Tooltip>
                )
              ) : (
                false
              )
            }
            rowKey={(record) => record?._id}
            expandable={{
              expandedRowRender: (record) =>
                expandedRowRender(record?.opportunities),
              // rowExpandable: (record) => record.key % 2,

              expandedRowKeys: [expended],
            }}
            loading={LoadingaccountsList}
            columns={columns}
            dataSource={filtredAccountList()}
          />
        </Col>
      </Row>
    </CollapsedCard>
  );
};

export default AccountIntelligence;
