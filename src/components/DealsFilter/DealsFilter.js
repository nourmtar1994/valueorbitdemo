import React, { useEffect, useState } from "react";
//ANTD DESIGN
import { Button, Col, InputNumber, message, Row, Select, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
//Redux toolkit
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../redux/Slices/Filter.slices";
import { addOpprtunityFilter } from "../../redux/Slices/Opportunity.slices";
//utils
import moment from "moment";
import { NumFormatter } from "../Services/Utils/Utils";
//CSS MODULES
import * as classes from "../Filter/Filter.module.css";
import Cookies from "js-cookie";
const { Option } = Select;

const DealsFilter = ({ open, role }) => {
  const [amountMin, setAmountMin] = useState(null);
  const [amountMax, setAmountMax] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    amountMin && setIsChanged(true);
  }, [amountMin]);
  useEffect(() => {
    amountMax && setIsChanged(true);
  }, [amountMax]);

  const [country, setCountry] = useState(null);
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state?.filter?.data || []);
  const opportunities = useSelector(
    (state) => state.opportunity?.defaultList || []
  );

  const Country = useSelector((state) => state?.country?.data);
  const dealBand = useSelector((state) => state?.dealBand?.data);

  useEffect(() => {
    message.destroy();
    if (amountMin > amountMax && amountMax !== null) {
      message.error("amount (max) should be greater than " + amountMin);
    }
  }, [amountMin, amountMax]);

  useEffect(() => {
    filterOpportunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  useEffect(() => {
    filterOpportunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunities]);

  const filterOpportunities = () => {
    // if (opportunities?.?.length === 0 || filterData?.length) {
    //   return;
    // }

    let newFiltredData = [];
    let filterOption = {};

    filterData?.map((item) => {
      if (item.selected) {
        if (item.action === "amount") {
          return (filterOption[item.action] = item.range);
        } else {
          return (filterOption[item.action] = item.value);
        }
      }
      return false;
    });

    newFiltredData = opportunities.filter((item) => {
      if (
        filterOption?.fiscalyear !== undefined &&
        parseInt(item?.fiscalyear) !== parseInt(filterOption?.fiscalyear)
      ) {
        return false;
      }
      if (
        filterOption?.fiscalquarter !== undefined &&
        parseInt(item?.fiscalquarter) !== parseInt(filterOption?.fiscalquarter)
      ) {
        return false;
      }
      if (
        filterOption?.fiscalmonth !== undefined &&
        parseInt(moment(item?.closedate).month()) + 1 !==
          parseInt(filterOption?.fiscalmonth)
      ) {
        return false;
      }
      if (
        filterOption?.stagename !== undefined &&
        item?.stagename !== filterOption?.stagename
      ) {
        return false;
      }

      if (
        filterOption?.forecastcategory !== undefined &&
        item?.forecastcategoryname !== filterOption?.forecastcategory
      ) {
        return false;
      }

      if (
        filterOption?.managerJudgment !== undefined &&
        item?.managerjudgment !== filterOption?.managerJudgment
      ) {
        return false;
      }

      if (
        filterOption?.amountMin !== undefined &&
        filterOption?.amountMin !== null &&
        item?.amount < filterOption?.amountMin
      ) {
        return false;
      }

      if (
        filterOption?.amountMax !== undefined &&
        filterOption?.amountMax !== null &&
        item?.amount > filterOption?.amountMax
      ) {
        return false;
      }
      if (
        filterOption?.salesuser !== undefined &&
        item?.salesuser?._id !== filterOption?.salesuser
      ) {
        return false;
      }

      if (
        filterOption?.country !== undefined &&
        item?.account?.billingcountry !== filterOption?.country
      ) {
        return false;
      }

      if (filterOption?.velocity !== undefined) {
        if (filterOption?.velocity === "Low" && item?.dealprogress > 33) {
          return false;
        } else if (
          filterOption?.velocity === "Average" &&
          (item?.dealprogress < 33 || item?.dealprogress > 66)
        ) {
          return false;
        } else if (
          filterOption?.velocity === "High" &&
          item?.dealprogress < 66
        ) {
          return false;
        }
      }

      if (filterOption?.dealrisk !== undefined) {
        if (filterOption?.dealrisk === "Low" && item?.risk > 25) {
          return false;
        } else if (
          filterOption?.dealrisk === "Moderate" &&
          (item?.risk <= 25 || item?.risk >= 50)
        ) {
          return false;
        } else if (
          filterOption?.dealrisk === "High" &&
          (item?.risk < 50 || item?.risk >= 75)
        ) {
          return false;
        } else if (filterOption?.dealrisk === "Critical" && item?.risk < 75) {
          return false;
        }
      }

      return true;
    });

    dispatch(addOpprtunityFilter(newFiltredData));

    // setTimeout(() => {
    //   dispatch(setLoading(false));

    // }, 3000);
  };

  return (
    <Row className={classes.container} gutter={[10, 10]}>
      {JSON.parse(Cookies.get("VO_USER_AUTH"))?.role === "manager" && (
        <>
          {/*  country filter  */}
          {/* <Col
            md={{ span: role === "manager" ? 3 : 4 }}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
          >
            <Text className={classes.description} ellipsis>
              Country
            </Text>
          </Col> */}

          <Col
            md={{ span: role === "manager" ? 8 : 8 }}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
          >
            <Select
              className="custom-select"
              size="small"
              allowClear
              showSearch
              placeholder="Country"
              style={{ width: "100%" }}
              value={country}
              onChange={(e) => {
                setCountry(e);
                dispatch(
                  addFilter({
                    action: "country",
                    value: e,
                    selected: e !== undefined ? true : false,
                  })
                );
              }}
            >
              {Country?.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Col>
          {/* <Col>
            <Tooltip title="remove filter">
              <Button
                size="small"
                icon={<ReloadOutlined className={classes.amountIcon} />}
                type="link"
                onClick={() => {
                  dispatch(
                    removeFilter({
                      action: "country",
                    })
                  );
                  setCountry(null);
                }}
              />
            </Tooltip>
          </Col> */}
        </>
      )}

      {/* amount filter */}
      {/* <Col md={{ span: 4 }} sm={{ span: 24 }} xs={{ span: 24 }}>
        <Text ellipsis className={classes.description}>
          Amount
        </Text>
      </Col> */}
      <Col
        md={{ span: role === "manager" ? 16 : 24 }}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        align="center"
      >
        <Select
          className="custom-select"
          allowClear
          style={{ width: "33.33%", textAlign: "left" }}
          placeholder="Amount"
          onChange={(e) => {
            if (e) {
              setAmountMin(JSON?.parse(e?.value)?.min || null);
              setAmountMax(JSON?.parse(e?.value)?.max || null);
            } else {
              setAmountMin(null);
              setAmountMax(null);
            }
          }}
          labelInValue={true}
          value={
            amountMin !== null || amountMax !== null
              ? JSON.stringify({
                  min: amountMin || 0,
                  max: amountMax,
                })
              : undefined
          }
          r
        >
          {dealBand?.map((item, index) => (
            <Option
              key={index}
              value={JSON.stringify({
                min: item?.min,
                max: item?.max,
              })}
            >
              {NumFormatter(item?.min)} - {NumFormatter(item?.max)}
            </Option>
          ))}
        </Select>
        <InputNumber
          className="custom-input"
          style={{ width: "33%", marginLeft: "0.33%" }}
          decimalSeparator=","
          placeholder="Min"
          min={0}
          onChange={(e) => setAmountMin(e)}
          value={amountMin || (amountMax && 0)}
        />
        <InputNumber
          className="custom-input"
          style={{ width: "33%", marginLeft: "0.33%" }}
          decimalSeparator=","
          placeholder="Max"
          onChange={(e) => setAmountMax(e)}
          min={0}
          value={amountMax}
        />

        <div
          className={classes.actionContainer}
          hidden={
            (amountMin === null || amountMin === 0) &&
            (amountMax === null || amountMax === 0)
          }
        >
          <Tooltip title="Add Filter" placement="bottomRight">
            <Button
              size="small"
              type="link"
              disabled={
                (amountMin > amountMax && amountMax !== null) || !isChanged
              }
              onClick={() => {
                setIsChanged(false);
                dispatch(
                  addFilter({
                    action: "amountMin",
                    value: amountMin,
                    selected: true,
                  })
                );

                dispatch(
                  addFilter({
                    action: "amountMax",
                    value: amountMax,
                    selected: true,
                  })
                );
              }}
              icon={<CheckOutlined className={classes.amountIcon} />}
            />
          </Tooltip>
          <Tooltip title="remove filter" placement="bottomRight">
            <Button
              size="small"
              icon={
                <CloseOutlined
                  className={classes.amountIcon + " icon_danger"}
                />
              }
              type="link"
              onClick={() => {
                dispatch(
                  removeFilter({
                    action: "amountMin",
                  })
                );
                dispatch(
                  removeFilter({
                    action: "amountMax",
                  })
                );
                setAmountMin(null);
                setAmountMax(null);
              }}
            />
          </Tooltip>
        </div>
      </Col>
    </Row>
  );
};

export default DealsFilter;
