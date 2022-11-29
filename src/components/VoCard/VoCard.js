import {
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  InteractionOutlined,
  MenuOutlined,
  SelectOutlined,
  TableOutlined,
  UpOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  message,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { FaSearch } from "react-icons/fa";
import Loader from "../Badge/Loader/Loader";
import * as classes from "./VoCard.module.css";

const { Option } = Select;

const { Meta } = Card;

const VoCard = (props) => {
  let {
    isAction = false,
    title = false,
    hoverable = false,
    loading,
    data = false,
    hasOption = false,
    goToAction,
    setGoToAction = () => message.info("no action to do "),
  } = props;

  const [collapse, setCollapse] = useState(true);
  const [sortBy, setSortBy] = useState("datedesc");
  const [searchWord, setSearchWord] = useState("");

  const [itemDisplay, setItemDisplay] = useState("horizontal");

  const actionLink = (item, type) => {
    let title = (
      <div className={classes.descriptionLink}>
        <Tooltip title="Action">
          <InteractionOutlined className="textInfo" />
        </Tooltip>
        <Highlighter
          textToHighlight={" " + item?.action + "."}
          searchWords={[searchWord]}
        />
        <span className={classes.descriptionLinkIcon}>
          <SelectOutlined />
        </span>
      </div>
    );

    if (hasOption) {
      if (type === "button") {
        return (
          <div className={classes.options}>
            {item?.opportunitysignals?.subType !== null &&
            item?.opportunitysignals?.subType === "revqual" ? (
              <Tooltip placement="bottom" title="Show risk">
                <Button
                  type="primary"
                  size="small"
                  icon={<SelectOutlined />}
                ></Button>
              </Tooltip>
            ) : item?.opportunitysignals?.subType !== null ? (
              <Tooltip placement="bottom" title="Go to category">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    setGoToAction({
                      ...goToAction,
                      visible: true,
                      type: "UPDATE_CATEGORY",
                      information: {
                        oppoId: item?.opportunity?._id,
                        category: item?.opportunitysignals?.subType,
                        signalId: item?.opportunitysignals?._id,
                        actionId: item?._id,
                      },
                    });
                  }}
                  icon={<SelectOutlined />}
                ></Button>
              </Tooltip>
            ) : (
              <Tooltip placement="bottom" title="Update opportunity">
                <Button
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setGoToAction({
                      ...goToAction,
                      visible: true,
                      type: "UPDATE_OPPORTUNITY",
                      information: {
                        opportunity: item?.opportunity,
                        signalId: item?.opportunitysignals?._id,
                        actionId: item?._id,
                      },
                    });
                  }}
                ></Button>
              </Tooltip>
            )}
          </div>
        );
      } else if (type === "text") {
        return item?.opportunitysignals?.subType !== null &&
          item?.opportunitysignals?.subType === "revqual" ? (
          <div>{title}.</div>
        ) : item?.opportunitysignals?.subType !== null ? (
          <div
            onClick={() => {
              setGoToAction({
                ...goToAction,
                visible: true,
                type: "UPDATE_CATEGORY",
                information: {
                  oppoId: item?.opportunity?._id,
                  category: item?.opportunitysignals?.subType,
                  signalId: item?.opportunitysignals?._id,
                  actionId: item?._id,
                },
              });
            }}
          >
            {title}
          </div>
        ) : (
          <div
            onClick={() => {
              setGoToAction({
                ...goToAction,
                visible: true,
                type: "UPDATE_OPPORTUNITY",
                information: {
                  opportunity: item?.opportunity,
                  signalId: item?.opportunitysignals?._id,
                  actionId: item?._id,
                },
              });
            }}
          >
            {title}
          </div>
        );
      }
    }
    return;
  };

  const sortRenderer = (data) => {
    // date asc
    if (sortBy === "dateasc") {
      return data.sort(
        (a, b) => moment(a?.createddate) - moment(b?.createddate)
      );
    }
    // date desc
    if (sortBy === "datedesc") {
      return data.sort(
        (a, b) => moment(b?.createddate) - moment(a?.createddate)
      );
    }
    // risk asc
    if (sortBy === "riskasc") {
      return data.sort((a, b) => a?.opportunity?.risk - b.opportunity?.risk);
    }
    //risk desc
    if (sortBy === "riskdesc") {
      return data.sort((a, b) => b?.opportunity?.risk - a.opportunity?.risk);
    }

    return data;
  };

  return (
    <Card
      bodyStyle={{
        padding: "5px!important",
        backgroundColor: "black!important",
      }}
      headStyle={{ padding: "0 13px" }}
      title={false}
      className={classes.voCard}
      bordered={false}
      hoverable={hoverable}
    >
      <div className={classes.actionsHeader}>
        <div align="left">
          {!isAction && (
            <Input
              onChange={(e) => e.target.value === "" && setSearchWord("")}
              onPressEnter={(e) => setSearchWord(e.target.value?.toLowerCase())}
              prefix={<FaSearch className="textDescriptionX2" />}
              allowClear
              size="middle"
              placeholder="Search"
              style={{ width: 150 }}
              className="custom-search"
            />
          )}
        </div>

        {!isAction && (
          <Select
            style={{ width: 130 }}
            size="middle"
            className="custom-select"
            placeholder="Sort By"
            onChange={(e) => setSortBy(e)}
            defaultValue="datedesc"
          >
            <Option value="datedesc">Date Desc</Option>
            <Option value="dateasc">Date Asc</Option>
            <Option value="riskdesc">Risk Desc</Option>
            <Option value="riskasc">Risk Asc</Option>
          </Select>
        )}
      </div>

      {title ? (
        <div className={classes.header}>
          <Typography.Text className={classes.title} strong>
            {isAction
              ? goToAction?.information?.opportunity?.name || "Update Category"
              : title + " (" + data?.length + ")"}
          </Typography.Text>
          <div className={classes.extra}>
            {itemDisplay === "vertical" ? (
              <MenuOutlined
                onClick={() => setItemDisplay("horizontal")}
                className={classes.collapseIcon}
              />
            ) : (
              <TableOutlined
                onClick={() => setItemDisplay("vertical")}
                className={classes.collapseIcon}
              />
            )}
            &nbsp;
            {collapse ? (
              <UpOutlined
                onClick={() => setCollapse(false)}
                className={classes.collapseIcon}
              />
            ) : (
              <DownOutlined
                onClick={() => setCollapse(true)}
                className={classes.collapseIcon}
              />
            )}
            &nbsp;
            {isAction && (
              <CloseOutlined
                className={classes.collapseIcon}
                onClick={() =>
                  setGoToAction({
                    ...goToAction,
                    visible: false,
                    information: null,
                  })
                }
              />
            )}
          </div>
        </div>
      ) : (
        false
      )}
      {collapse && (
        <>
          {loading ? (
            <Loader />
          ) : data ? (
            <Row gutter={[10, 10]} className={classes.container}>
              {sortRenderer(data)?.map(
                (item, index) =>
                  (item?.opportunity?.name
                    ?.toLowerCase()
                    ?.includes(searchWord) ||
                    item?.action?.toLowerCase()?.includes(searchWord) ||
                    item?.opportunitysignals?.signal
                      ?.toLowerCase()
                      ?.includes(searchWord)) && (
                    <Col
                      key={index}
                      className={classes.voCardItemContainer}
                      span={itemDisplay === "vertical" ? 12 : 24}
                    >
                      {actionLink(item, "button")}
                      <Card
                        className={
                          classes.voCardItem +
                          " " +
                          (goToAction?.information?.actionId === item?._id &&
                            classes.selected)
                        }
                        bodyStyle={{ padding: "5px!important" }}
                      >
                        <Meta
                          title={false}
                          description={
                            <>
                              <div className={classes.itemHeader}>
                                <div className={classes.title}>
                                  <Typography.Link
                                    strong
                                    href={
                                      "/deal_intelligence/" +
                                      item?.opportunity?._id
                                    }
                                  >
                                    <Highlighter
                                      searchWords={[searchWord]}
                                      textToHighlight={item?.opportunity?.name}
                                    />
                                  </Typography.Link>
                                  <label className="textDescription">
                                    {" . " + item?.opportunity?.account?.name}
                                  </label>
                                </div>

                                <div className={classes.extra}>
                                  <span className="textSuccess">
                                    Progress :{" "}
                                    {Math.round(
                                      item?.opportunity?.dealprogress
                                    ) + "%"}
                                  </span>{" "}
                                  |{" "}
                                  <span className="textDanger">
                                    Risk :{" "}
                                    {Math.round(item?.opportunity?.risk) + "%"}
                                  </span>
                                </div>
                              </div>
                              {/* <Avatar src="https://joeschmoe.io/api/v1/random" /> */}
                              {
                                <div className={classes.description}>
                                  {actionLink(item, "text")}

                                  <Divider style={{ margin: "10px 0" }} />
                                  <Tooltip title="Signal">
                                    <WifiOutlined className="textWarning" />
                                  </Tooltip>
                                  <Highlighter
                                    searchWords={[searchWord]}
                                    textToHighlight={
                                      " " +
                                      item?.opportunitysignals?.signal +
                                      "."
                                    }
                                  />

                                  <br />
                                  <br />
                                </div>
                              }
                            </>
                          }
                        />

                        <div className={classes.footerInfo}>
                          {moment(item?.createddate).format("ll")}
                        </div>
                      </Card>
                    </Col>
                  )
              )}
            </Row>
          ) : (
            props.children
          )}
        </>
      )}
    </Card>
  );
};

export default VoCard;
