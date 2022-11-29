import React, { useEffect, useState } from "react";

//Router dom
import { useHistory, useParams } from "react-router-dom";
//ANTD DESIGN
import { Col, DatePicker, Row, Select } from "antd";
//APP COMPONENTS
import Badge from "../Badge/Badge";
//Redux toolkit
import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "../../redux/Slices/Filter.slices";
//utils
import moment from "moment";
//CSS MODULES
import * as classes from "../Filter/Filter.module.css";
import Cookies from "js-cookie";
import { addForecastParametres } from "../../redux/Slices/ForecastParametres";
import axios from "axios";
const { Option } = Select;

const Quatile = ({ open, role }) => {
  let { id } = useParams();
  let history = useHistory();
  // const [colSize, setColSize] = useState(12);

  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState("");
  const [quarterMonth, setQuarterMonth] = useState(null);
  const dispatch = useDispatch();
  const forecastParametres = useSelector((state) => state?.forecastParametres);
  const sales = useSelector((state) => state.sales?.data || []);

  useEffect(() => {
    // dispatch(setLoading(true))
    if (
      forecastParametres?.fiscalyear?.value &&
      forecastParametres?.fiscalyear?.selected
    ) {
      setYear(moment().year(forecastParametres?.fiscalyear?.value));
    }
    if (
      forecastParametres?.fiscalquarter?.value &&
      forecastParametres?.fiscalquarter?.selected
    ) {
      setQuarter(forecastParametres?.fiscalquarter?.value + "");
    }
    if (
      forecastParametres?.fiscalmonth?.value &&
      forecastParametres?.fiscalmonth?.selected
    ) {
      setMonth(moment().month(forecastParametres?.fiscalmonth?.value - 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forecastParametres]);

  useEffect(() => {
    getQuarterMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getQuarterMonth = async () => {
    try {
      const { data } = await axios.get("/fiscalyear");
      setQuarterMonth(data?.data);

      dispatch(
        addForecastParametres({
          action: "fiscalyear",
          value:
            moment()?.month() + 1 <= data?.data?.startmonth
              ? moment().year() - 1
              : moment().year(),
          selected: true,
        })
      );
      dispatch(
        addForecastParametres({
          action: "fiscalmonth",
          value: moment()?.month() + 1,
          selected: true,
        })
      );
      dispatch(
        addForecastParametres({
          action: "fiscalquarter",
          value: getQuarter(data?.data?.startmonth),
          selected: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getQuarter = (startmonth) => {
    let quarter = parseInt((moment().month() + 1 - startmonth) / 3 + 1);
    if (moment().month() + 1 - startmonth < 0) {
      quarter = 4;
    }
    if (moment().month() + 1 - startmonth === 0) {
      quarter = 1;
    }
    return quarter;
  };

  return (
    <Row className={classes.container} gutter={[10, 10]}>
      {/* Sales filter */}
      {JSON.parse(Cookies.get("VO_USER_AUTH")).role === "manager" && (
        <>
          <Col
            lg={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Select
              className="custom-select"
              placeholder={"sales filter"}
              style={{ width: "100%" }}
              allowClear
              showSearch
              value={id}
              onChange={(e) => {
                dispatch(
                  addFilter({
                    action: "salesuser",
                    value: e,
                    selected: e ? true : false,
                  })
                );
                history.push(e ? `/forecastintelligence/${e}` : "/");
              }}
            >
              {sales?.map((item, index) => (
                <Option
                  className="text-capitalize"
                  key={index}
                  value={item?._id}
                >
                  {item?.firstname + " " + item?.lastname}
                </Option>
              ))}
            </Select>
          </Col>
        </>
      )}

      {/* Period filter */}
      <Col
        lg={{ span: role === "manager" ? 16 : 24 }}
        md={{ span: role === "manager" ? 16 : 24 }}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
      >
        <DatePicker
          className="custom-input"
          size="small"
          style={{ width: "33.33%" }}
          value={year}
          picker="year"
          placeholder="Fiscal year"
          onChange={(e) => {
            setYear(e);
            dispatch(
              addFilter({
                action: "fiscalyear",
                value: e ? e.get("year") : null,
                selected: e !== null ? true : false,
              })
            );
            dispatch(
              addForecastParametres({
                action: "fiscalyear",
                value: e ? e.get("year") : null,
                selected: e !== null ? true : false,
              })
            );
          }}
        />
        <Select
          className="custom-select"
          size="small"
          defaultActiveFirstOption
          value={quarter}
          placeholder="Fiscal quarter"
          style={{ width: "33%", marginLeft: "0.33%", textAlign: "left" }}
          allowClear
          showSearch
          onChange={(e) => {
            setQuarter(e);
            dispatch(
              addFilter({
                action: "fiscalmonth",
                value: parseInt(e) * 3 - 3 + quarterMonth?.startmonth,
                selected: e !== undefined ? true : false,
              })
            );
            dispatch(
              addForecastParametres({
                action: "fiscalmonth",
                value: parseInt(e) * 3 - 3 + quarterMonth?.startmonth,
                selected: e !== undefined ? true : false,
              })
            );
            // e !== undefined && setMonth(moment().month(e));

            dispatch(
              addFilter({
                action: "fiscalquarter",
                value: e,
                selected: e !== undefined ? true : false,
              })
            );
            dispatch(
              addForecastParametres({
                action: "fiscalquarter",
                value: e,
                selected: e !== undefined ? true : false,
              })
            );
          }}
        >
          <Option key={1} value="1">
            Q1
          </Option>
          <Option key={2} value="2">
            Q2
          </Option>
          <Option key={3} value="3">
            Q3
          </Option>
          <Option key={4} value="4">
            Q4
          </Option>
        </Select>
        <DatePicker
          className="custom-input"
          size="small"
          style={{ width: "33%", marginLeft: "0.33%" }}
          disabledDate={(current) => {
            if (quarter) {
              let date = moment().set({
                year: quarterMonth?.fiscalyear,
                month: quarterMonth?.startmonth - 1,
                date: 1,
              });
              return (
                current <= date.add(quarter * 3 - 3, "M") ||
                current >= date.add(2, "M")
              );
            }
          }}
          value={month}
          picker="month"
          format={"MMM"}
          placeholder="Fiscal month"
          onChange={(e) => {
            setMonth(e);

            dispatch(
              addFilter({
                action: "fiscalmonth",
                value: e ? moment(e).format("M") : null,
                selected: e !== null ? true : false,
              })
            );
            dispatch(
              addForecastParametres({
                action: "fiscalmonth",
                value: e ? moment(e).format("M") : null,
                selected: e !== null ? true : false,
              })
            );
          }}
        />
        {/* <div className={classes.actionsbutton}>
            <Button
              size="small"
              icon={
                <Tooltip title="remove filter">
                  <FaRedoAlt className={"action-icon"} />
                </Tooltip>
              }
              type="link"
              onClick={() => {
                setMonth(null);
                setYear(null);
                setQuarter(null);
                dispatch(
                  addFilter({
                    action: "fiscalquarter",
                    value: null,
                    selected: false,
                  })
                );
                dispatch(
                  addFilter({
                    action: "fiscalyear",
                    value: null,
                    selected: false,
                  })
                );
                dispatch(
                  addFilter({
                    action: "fiscalmonth",
                    value: null,
                    selected: false,
                  })
                );
              }}
            />
          </div> */}
      </Col>
    </Row>
  );
};

export default Quatile;
