import React, { useEffect, useState } from "react";
//ANT DESIGN COMPONENTS
import { Card, Col, Row, Tooltip } from "antd";
//APP COMPONENTS
import DonutChart from "../charts/DonutChart/DonutChart";
import AngelCircleChart from "../charts/AngelCircleChart/AngelCircleChart";
import PieChart from "../charts/PieChart/PieChart";
import Badge from "../Badge/Badge";
//ICONS

import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../redux/Slices/Filter.slices";
import InfoCard from "../InfoCard/InfoCard";
import { ReloadOutlined } from "@ant-design/icons";
import * as classes from "./PipelineProgress.module.css";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";

const PipelineProgress = ({ open }) => {
  const dispatch = useDispatch();
  let filterData = useSelector((state) => state?.filter?.data || []);
  const [donutChartData, setDonutChartData] = useState([]);
  const [PieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [progressChart, setProgressChart] = useState({
    labels: [],
    categories: [],
  });
  const [coachingChart, setCoachingChart] = useState({
    labels: [],
    categories: [],
  });

  const opportunities = useSelector(
    (state) => state.opportunity?.filtredList || []
  );

  useEffect(() => {
    let very_risky = [];
    let risky = [];
    let healthy = [];
    let solid = [];

    let fast = [];
    let steady = [];
    let slow = [];

    let categoriesProgress = {};

    let categoriesCoching = {};

    opportunities?.forEach((item) => {
      if (item?.risk >= 0 && item?.risk < 25) {
        solid?.push(item);
      } else if (item?.risk >= 25 && item?.risk < 50) {
        healthy?.push(item);
      } else if (item?.risk >= 50 && item?.risk < 75) {
        risky?.push(item);
      } else if (item?.risk >= 75 && item?.risk <= 100) {
        very_risky?.push(item);
      }

      if (item?.dealprogress >= 0 && item?.dealprogress < 33) {
        slow?.push(item);
      } else if (item?.dealprogress >= 33 && item?.dealprogress < 66) {
        steady?.push(item);
      } else if (item?.dealprogress >= 66 && item?.dealprogress <= 100) {
        fast?.push(item);
      }

      item?.processflow?.categories?.forEach((CatItem) => {
        categoriesProgress[CatItem?.name] = Math.round(
          (categoriesProgress[CatItem?.name] || 0) +
            CatItem?.dealprogress / opportunities?.length
        );
      });
      item?.processflow?.categories?.forEach((CatItem) => {
        categoriesCoching[CatItem?.name] = Math.round(
          (categoriesCoching[CatItem?.name] || 0) +
            CatItem?.dealcoaching / opportunities?.length
        );
      });
    });

    let progressLabel = [];
    let progressData = [];

    for (const property in categoriesProgress) {
      progressLabel.push(property);
      progressData.push(categoriesProgress[property]);
    }

    let coachingLabel = [];
    let coachingData = [];

    for (const property in categoriesCoching) {
      coachingLabel.push(property);
      coachingData.push(categoriesCoching[property]);
    }

    setProgressChart({
      labels: progressLabel,
      categories: progressData,
    });

    setCoachingChart({
      labels: coachingLabel,
      categories: coachingData,
    });

    setPieChartData([
      Math.round((very_risky?.length / opportunities?.length) * 100 || 0),
      Math.round((risky?.length / opportunities?.length) * 100 || 0),
      Math.round((healthy?.length / opportunities?.length) * 100 || 0),
      Math.round((solid?.length / opportunities?.length) * 100 || 0),
    ]);

    setDonutChartData([
      Math.round((fast?.length / opportunities?.length) * 100 || 0),
      Math.round((steady?.length / opportunities?.length) * 100 || 0),
      Math.round((slow?.length / opportunities?.length) * 100 || 0),
    ]);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [opportunities]);

  const addChartFilter = (selectedPoint) => {
    // console.log({
    //   action: selectedPoint?.action,
    //   value: selectedPoint?.value,
    //   selected: filterData?.filter(
    //     (item) => item?.action === selectedPoint?.action
    //   ),
    // });

    dispatch(
      addFilter({
        action: selectedPoint?.action,
        value: selectedPoint?.value,
        selected:
          !filterData?.filter(
            (item) =>
              item?.action === selectedPoint?.action &&
              item?.value === selectedPoint?.value
          )?.length > 0,
      })
    );
  };
  return (
    <CollapsedCard
      open={open}
      align="right"
      color={"success"}
      title="PIPELINE PROGRESS"
      extra={
        <div className={classes.closeIcon}>
          <Tooltip title="remove filter" placement="bottom">
            <ReloadOutlined
              onClick={() => {
                setLoading(true);
                dispatch(
                  removeFilter({
                    action: "dealrisk",
                  })
                );
                dispatch(
                  removeFilter({
                    action: "velocity",
                  })
                );
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }}
            />
          </Tooltip>
        </div>
      }
    >
      <Row gutter={[10, 10]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 6 }}>
          <InfoCard
            lodaing={loading}
            title={"Meddicc Progress"}
            body={
              <AngelCircleChart
                addChartFilter={addChartFilter}
                data={{
                  labels: progressChart?.labels,
                  category: progressChart?.categories,
                }}
              />
            }
          ></InfoCard>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 6 }}>
          <InfoCard
            lodaing={loading}
            title={"Meddicc Coaching"}
            body={
              <AngelCircleChart
                addChartFilter={addChartFilter}
                data={{
                  labels: coachingChart?.labels,
                  category: coachingChart?.categories,
                }}
              />
            }
          ></InfoCard>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 6 }}>
          <InfoCard
            lodaing={loading}
            title={"Deal Velocity"}
            body={
              <>
                <DonutChart
                  addChartFilter={addChartFilter}
                  data={donutChartData}
                />
                <br />
              </>
            }
          ></InfoCard>
        </Col>

        {JSON.stringify(PieChartData) !== "{}" && (
          <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 6 }}>
            <InfoCard
              lodaing={loading}
              title={"Deal Risk"}
              body={
                <>
                  <PieChart
                    addChartFilter={addChartFilter}
                    data={PieChartData}
                  />
                  <br />
                </>
              }
            ></InfoCard>
          </Col>
        )}
      </Row>
    </CollapsedCard>
  );
};
export default PipelineProgress;
