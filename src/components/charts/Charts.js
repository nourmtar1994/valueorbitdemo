import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Charts = ({ data }) => {
  const [chartConfig, setChartConfig] = useState({
    series: [],
    options: {
      labels: [],
      chart: {
        type: "polarArea",
        id: "qualificationChart",
      },
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    setChartConfig(chartConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    chartConfig.series.reduce((partial_sum, a) => partial_sum + a, 0) > 0 && (
      <ReactApexChart
        options={chartConfig.options}
        series={chartConfig.series}
        type="polarArea"
        width={500}
      />
    )
  );
};

export default Charts;
