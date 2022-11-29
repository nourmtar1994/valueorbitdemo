import React, { useEffect, useState } from "react";
//Ant Design Components
import {
  Col,
  Row,
  Tooltip,
  Typography,
  Select,
  message,
  notification,
  Button,
  DatePicker,
  Popover,
  Calendar,
} from "antd";
//App Components
import InfoCard from "../InfoCard/InfoCard";
//Ant desion icon
import { AppstoreOutlined, FieldTimeOutlined } from "@ant-design/icons";

// Plugin
import moment from "moment";
//redux tools
import { useDispatch, useSelector } from "react-redux";
// import * as classes from "./Predictions.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { NumFormatter } from "../Services/Utils/Utils";
import {
  FaChartLine,
  FaCheckDouble,
  FaDollarSign,
  FaExclamationTriangle,
  FaPencilAlt,
  FaRegCalendar,
  FaRegCalendarAlt,
  FaRegCalendarTimes,
  FaRoute,
  FaStepForward,
  FaUpload,
} from "react-icons/fa";
import StatisticCard from "../../template/NewDesign/Components/StatisticCard/StatisticCard";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import { EditText, EditTextarea } from "react-edit-text";
import { updateOpportunityItem } from "../../redux/Slices/Opportunity.slices";
const { Text } = Typography;
const { Option } = Select;

const Predicitions = ({ setData, data, quarterData }) => {
  const [user, setUser] = useState(null);

  const stages = useSelector((state) => state.stages?.data);
  const stagesLoading = useSelector((state) => state.stages?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  const updateOpportunity = async (target = null, id, obj) => {
    let route = null;

    if (target === "stage") {
      route = "stagename";
    } else if (target === "closedate") {
      route = "closedate";
    } else if (target === "amount") {
      route = "amount";
    } else if (target === "forecastcategory") {
      route = "forecastcategoryname";
    } else if (target === "nextstep") {
      route = "nextstep";
    } else if (target === "managerjudgment") {
      route = "";
    }
    console.log(target);
    console.log(route);

    if (id && route && target) {
      try {
        const { data } = await axios.put(
          "/opportunity/" + route + "/" + id + "/" + user?.originId,
          obj
        );
        if (data?.success) {
          message.success(Object.keys(obj)[0] + " updated");
          dispatch(
            updateOpportunityItem({
              opportunityId: id,
              target,
              value: obj,
            })
          );
        }
      } catch (error) {
        console.log(error);
        notification.error({
          placement: "bottomRight",
          message: "Deal cannot be updated ",
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

  return (
    data && (
      <CollapsedCard title={"Predictions"}>
        <Row gutter={[10, 10]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
            <InfoCard
              body={
                <div className="twelve">
                  <Typography.Title ellipsis>{data?.name}</Typography.Title>

                  <Typography.Title
                    level={5}
                    style={{ margin: "0", fontWeight: "inherit" }}
                    ellipsis
                  >
                    <Tooltip title="Account " placement="right">
                      {data?.account && data?.account?.name}
                      {data?.account?.billingcountry &&
                        " - " + data?.account?.billingcountry}{" "}
                    </Tooltip>
                  </Typography.Title>

                  <Tooltip title="Last update" placement="right">
                    <Text type="secondary">
                      <FieldTimeOutlined />{" "}
                      {moment(data.lastmodifieddate).format("ll") || "-"}
                    </Text>
                  </Tooltip>
                </div>
              }
            >
              {/* </Divider> */}
            </InfoCard>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
            <StatisticCard
              size={1}
              title={"Stage"}
              icon={<FaRoute />}
              type="secondary"
              data={[
                {
                  value: (
                    <Select
                      className="custom-select"
                      bordered={false}
                      defaultValue={data?.stagename}
                      size="small"
                      placeholder={"Stage"}
                      loading={stagesLoading}
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        updateOpportunity("stage", data?._id, { stagename: e })
                      }
                    >
                      {stages?.map((item, index) => (
                        <Option key={item?.apiname}>{item?.apiname}</Option>
                      ))}
                    </Select>
                  ),
                },
              ]}
            />
            {/* <InfoCard
              body={
                <>
                  <Text style={{ fontSize: "1em" }} underline strong>
                    Stage
                  </Text>
                  <Select
                    bordered={false}
                    defaultValue={data?.stagename}
                    size="small"
                    placeholder={"Stage"}
                    loading={stagesLoading}
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      updateOpportunity("stage", data?._id, { stagename: e })
                    }
                  >
                    {stages?.map((item, index) => (
                      <Option key={item?.apiname}>{item?.apiname}</Option>
                    ))}
                  </Select>
                </>
              }
            /> */}
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
            <StatisticCard
              size={1.1}
              title={"Category"}
              icon={<AppstoreOutlined />}
              type="secondary"
              data={[
                {
                  value: data?.forecastcategoryname,
                },
              ]}
            />
          </Col>

          <Col
            lg={{ span: 6 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={2}
          >
            <StatisticCard
              size={1.5}
              title={"Amount"}
              icon={<FaDollarSign />}
              type="primary"
              data={[
                {
                  value: (
                    <EditText
                      name="amount"
                      placeholder="Amount"
                      formatDisplayText={(e) => NumFormatter(e)}
                      // value={data?.amount}
                      showEditButton
                      editButtonContent={<FaPencilAlt size={14} />}
                      type="number"
                      defaultValue={data?.amount}
                      onSave={(e) => {
                        e?.value !== e?.previousValue &&
                          updateOpportunity("amount", data?._id, {
                            amount: parseInt(e?.value),
                          });
                      }}
                    />
                  ),
                },
              ]}
            />
          </Col>

          <Col
            lg={{ span: 6 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={4}
          >
            <StatisticCard
              size={1.5}
              type="success"
              title="Progress"
              icon={<FaChartLine />}
              color="black"
              data={[
                {
                  value: Math.round(data?.dealprogress) + "%" || 0,
                },
              ]}
            />
          </Col>

          <Col
            lg={{ span: 6 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={9}
          >
            <StatisticCard
              size={1.5}
              title={"Coaching"}
              icon={<FaCheckDouble />}
              type="info"
              data={[
                {
                  value: (Math.round(data?.dealcoaching) || 0) + "%",
                },
              ]}
            />
          </Col>

          <Col
            lg={{ span: 6 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={6}
          >
            <StatisticCard
              size={1.5}
              title={"AI Risk Score"}
              icon={<FaExclamationTriangle />}
              type="danger"
              data={[
                {
                  value: (data?.risk || 0) + "%",
                },
              ]}
            />
          </Col>

          <Col
            lg={{ span: 6 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={5}
          >
            <StatisticCard
              size={1.3}
              title={"Close date"}
              icon={<FaRegCalendarTimes />}
              type="secondary"
              data={[
                {
                  value: (
                    <Popover
                      trigger={"click"}
                      title={
                        <Typography.Text type="secondary" strong>
                          Change close date
                        </Typography.Text>
                      }
                      content={
                        <div style={{ width: 300 }}>
                          <Calendar
                            defaultValue={
                              data.closedate ? moment(data.closedate) : null
                            }
                            onChange={(e) => {
                              setData({
                                data: {
                                  ...data,
                                  closedate: moment(e).format(),
                                },
                              });
                              updateOpportunity("closedate", data?._id, {
                                closedate: moment(e).format(),
                              });
                            }}
                            fullscreen={false}
                            mode="month"
                          />
                        </div>
                      }
                    >
                      <span className="_G0k44">
                        {moment(data.closedate)?.format("ll")}
                        &nbsp;
                      </span>
                      <FaPencilAlt size={14} />
                    </Popover>
                  ),
                },
              ]}
            />
          </Col>

          <Col
            lg={{ span: 6 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={7}
          >
            <StatisticCard
              size={1.3}
              title={"AI close date"}
              icon={<FaRegCalendar />}
              type="secondary"
              data={[
                {
                  value: moment(data.estimatedCloseDate).format("ll") || "-",
                },
              ]}
            />
          </Col>

          <Col
            lg={{ span: 4 }}
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={8}
          >
            <StatisticCard
              size={1}
              title={"days in stage"}
              icon={<FaRegCalendarAlt />}
              type="secondary"
              data={[
                {
                  value: data?.laststagechangedate
                    ? moment(data?.laststagechangedate).fromNow()
                    : "-",
                },
              ]}
            />
          </Col>

          <Col
            lg={{ span: 4 }}
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={3}
          >
            <StatisticCard
              size={1.5}
              title={"Push count"}
              icon={<FaUpload />}
              type="secondary"
              data={[
                {
                  value: parseFloat(data.pushcount) || 0,
                },
              ]}
            />
          </Col>

          <Col
            lg={{ span: 4 }}
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={10}
          >
            <StatisticCard
              size={1}
              title={"Next Step"}
              icon={<FaStepForward />}
              // icon={false}
              type="secondary"
              data={[
                {
                  value: (
                    <EditTextarea
                      rows={1}
                      name="nextstep"
                      placeholder="Next Step"
                      formatDisplayText={(e) => e}
                      showEditButton
                      editButtonContent={<FaPencilAlt size={14} />}
                      type="text"
                      defaultValue={data.nextstep}
                      onSave={(e) => {
                        data.nextstep = e;
                        updateOpportunity("nextstep", data?._id, {
                          nextstep: e?.value,
                        });
                      }}
                    />
                  ),
                },
              ]}
            />
          </Col>

          {/* <Col span={24} key={10}>
          <Card
          loading={
            data.predictions.win_data_point.length === 0 ? false : false
          }
          title="AI WIN RATE"
          >
          <LineCharts data={{ ...data.predictions.win_data_point }} />
          </Card>
        </Col> */}
        </Row>
      </CollapsedCard>
    )
  );
};

export default Predicitions;
