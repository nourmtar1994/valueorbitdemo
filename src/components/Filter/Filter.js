import { Affix, Col, Row } from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import DealsFilter from "../DealsFilter/DealsFilter";
import Quatile from "../Quatile/Quatile";
import TimeLineArrow from "../TimeLineArrow/TimeLineArrow";
import * as classes from "./Filter.module.css";

const Filter = ({ open }) => {
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [opportunitiesForStages, setopportunitiesForStages] = useState([]);
  const opportunities = useSelector((state) => state.opportunity || []);
  const filterData = useSelector((state) => state?.filter?.data);

  useEffect(() => {
    const filterOpportunities = () => {
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

      setopportunitiesForStages(
        opportunities?.defaultList?.filter((item) => {
          if (
            filterOption?.fiscalyear !== undefined &&
            parseInt(item?.fiscalyear) !== parseInt(filterOption?.fiscalyear)
          ) {
            return false;
          }
          if (
            filterOption?.fiscalquarter !== undefined &&
            parseInt(item?.fiscalquarter) !==
              parseInt(filterOption?.fiscalquarter)
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
          return true;
        })
      );
    };
    opportunities && filterOpportunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunities]);

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  return (
    <Affix
      offsetTop={0}
      style={{ zIndex: 999 }}
      onChange={(e) => user?.role === "manager" && setCollapsed(!e)}
    >
      {/* <Badge
        open={open}
        title={
          <>
            Filter &nbsp;
      
          </>
        }
        extra={
          <div style={{ width: "200px" }}>
            <div className={classes.moyen}>
              <span className={classes.opportunity}>
                {NumFormatter(reports?.statistics?.total_amount || 0, true)} (
                {reports?.statistics?.total_number || 0})
              </span>
              <span className={classes.table}>
                {NumFormatter(
                  defaultRreports?.statistics?.total_amount || 0,
                  true
                )}
                ({defaultRreports?.statistics?.total_number || 0})
              </span>
            </div>
          </div>
        }
      > */}
      <Row className={classes.filterContainer}>
        <Col xs={{ span: 24 }} md={{ span: user?.role === "manager" ? 12 : 8 }}>
          <Quatile
            role={user?.role}
            open={true}
            data={opportunities?.filtredList || null}
          />
        </Col>

        <Col xs={{ span: 24 }} md={{ span: user?.role === "manager" ? 12 : 8 }}>
          <DealsFilter role={user?.role} open={true} />
        </Col>

        <>
          <Col
            xs={{ span: 24 }}
            md={{ span: user?.role === "manager" ? 24 : 8 }}
            style={{ display: collapsed ? "block" : "none" }}
          >
            <TimeLineArrow
              role={user?.role}
              open={false}
              totalOpportunity={opportunitiesForStages}
            />
          </Col>
        </>

        {user?.role === "manager" && (
          <Col span={24} align="center">
            {collapsed ? (
              <FaAngleUp
                rotate={"45deg"}
                cursor={"pointer"}
                onClick={() => setCollapsed(!collapsed)}
                style={{ display: "block" }}
                size={20}
                className={"icon_primary"}
              />
            ) : (
              <FaAngleDown
                rotate={"45deg"}
                cursor={"pointer"}
                onClick={() => setCollapsed(!collapsed)}
                style={{ display: "block" }}
                size={20}
                className={"icon_primary"}
              />
            )}
          </Col>
        )}
      </Row>
    </Affix>
  );
};

export default Filter;
