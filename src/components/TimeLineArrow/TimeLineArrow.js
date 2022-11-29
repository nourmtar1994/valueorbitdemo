import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import StagesList from "../Stages/StagesList";
import CategoryList from "../CategoryFilter/CategoryList";
import ManagerJudgmentList from "../ManagerJudgment/ManagerJudgmentList";
//ICONS
import { Col, Row, Typography } from "antd";

//CSS FILES
import * as classes from "../Filter/Filter.module.css";
const defaultCategory = [
  "Omitted",
  "Pipeline",
  "Best Case",
  "Commit",
  "Closed",
];
const { Text } = Typography;
//Slider marks
const TimeLineArrow = ({ open, totalOpportunity, role }) => {
  const [arraowData, setArraowData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [managerAdjList, setmanagerAdjList] = useState([]);

  const satgeList = useSelector((state) => state.stages?.data || []);
  const forecastCategory = useSelector((state) => state.forecastCategory?.data);

  const filterList = useSelector((state) => state?.filter?.data);

  useEffect(() => {
    getArrowdata();
    getCategoryData();
    getManagerAdjustmentdata(forecastCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalOpportunity]);

  // useEffect(() => {
  //   getArrowdata();
  // }, [satgeList]);

  // useEffect(() => {
  //   getArrowdata();
  // }, [satgeList]);

  const getArrowdata = () => {
    setArraowData(
      satgeList?.map((stageItem, index) => {
        return {
          nbr: totalOpportunity?.filter(
            (item) => item.stagename === stageItem.apiname
          ).length,
          title: stageItem.apiname,
          amount: totalOpportunity?.reduce((accumulator, object) => {
            return (
              accumulator +
              (stageItem.apiname === object.stagename ? object.amount : 0)
            );
          }, 0),
        };
      })
    );
  };

  const getCategoryData = async () => {
    if (totalOpportunity) {
      // const stagename = [
      //   ...new Set(totalOpportunity?.map((item) => item.stagename)),
      // ];
      // const forecastcategoryname = [
      //   ...new Set(totalOpportunity?.map((item) => item.forecastcategoryname)),
      // ];
      setCategoryData(
        defaultCategory?.map((categoryItem, index) => {
          return {
            nbr: totalOpportunity?.filter(
              (item) => item.forecastcategoryname === categoryItem
            ).length,
            title: categoryItem,
            amount: totalOpportunity?.reduce((accumulator, object) => {
              return (
                accumulator +
                (categoryItem === object.forecastcategoryname
                  ? object.amount
                  : 0)
              );
            }, 0),
          };
        })
      );
    }
  };

  const getManagerAdjustmentdata = () => {
    setmanagerAdjList(
      forecastCategory?.map((adj, index) => {
        return {
          nbr: totalOpportunity.filter(
            (item) => item.managerjudgment === adj.name
          ).length,
          title: adj.name,
          amount: totalOpportunity?.reduce((accumulator, object) => {
            return (
              accumulator +
              (adj.name === object.managerjudgment ? object.amount : 0)
            );
          }, 0),
        };
      })
    );
  };

  return (
    <Row gutter={[10, 10]} className={classes.container}>
      {/* <Col
        lg={{ span: 3 }}
        md={{ span: 4 }}
        sm={{ span: 24 }}
        xs={{ span: 24 }}
      >
        <Text ellipsis className={classes.description}>
          Stage
        </Text>
      </Col> */}
      <Col
        lg={{ span: role === "manager" ? 8 : 12 }}
        md={{ span: role === "manager" ? 8 : 12 }}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
      >
        <StagesList
          defaultValue={
            filterList?.filter((item) => item?.action === "stagename")?.[0] ||
            null
          }
          data={arraowData}
        />
      </Col>

      {/* <Col
        lg={{ span: 3 }}
        md={{ span: 4 }}
        sm={{ span: 24 }}
        xs={{ span: 24 }}
      >
        <Text ellipsis className={classes.description}>
          Category
        </Text>
      </Col> */}

      <Col
        lg={{ span: role === "manager" ? 8 : 12 }}
        md={{ span: role === "manager" ? 8 : 12 }}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
      >
        <CategoryList
          defaultValue={
            filterList?.filter(
              (item) => item?.action === "forecastcategory"
            )?.[0] || null
          }
          data={categoryData}
        />
      </Col>

      {JSON.parse(Cookies.get("VO_USER_AUTH"))?.role !== "sales" && (
        <>
          {/* <Col
            lg={{ span: 3 }}
            md={{ span: 4 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Text ellipsis className={classes.description}>
              M.Judgment
            </Text>
          </Col> */}
          <Col
            lg={{ span: role === "manager" ? 8 : 12 }}
            md={{ span: role === "manager" ? 8 : 12 }}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
          >
            <ManagerJudgmentList
              defaultValue={
                filterList?.filter(
                  (item) => item?.action === "managerJudgment"
                )?.[0] || null
              }
              data={managerAdjList}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default TimeLineArrow;
