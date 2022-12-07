import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import BubbleChart from "../charts/BubbleChart/BubbleChart";
import { useSelector } from "react-redux";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";

const DealsProgress = ({ open }) => {
  const [data, setData] = useState([]);
  const opportunities = useSelector((state) => state.opportunity?.filtredList);

  const conditionalColors = (category) => {
    return category === "Omitted"
      ? "#e92630"
      : category === "Pipeline"
      ? "#52c41a"
      : category === "Best Case"
      ? "#00417e"
      : category === "Commit"
      ? "#ff9c07"
      : category === "Closed"
      ? "#20a6df"
      : "#999";
  };

  useEffect(() => {
    let newDataChart = [];
    opportunities &&
      opportunities?.forEach((element) => {
        newDataChart.push({
          name: element?.name,

          color: conditionalColors(element?.forecastcategoryname),
          data: [
            [
              new Date(element?.closedate).getTime(),
              element?.dealprogress,
              element?.amount,
            ],
          ],
        });
      });

    setData(newDataChart);
  }, [opportunities]);
  return (
    <CollapsedCard open={open} title="Pipeline map">
      <Card>
        <Row gutter={[10, 30]}>
          <Col span={24}>
            <BubbleChart data={data} />
          </Col>
        </Row>
      </Card>
    </CollapsedCard>
  );
};

export default DealsProgress;
