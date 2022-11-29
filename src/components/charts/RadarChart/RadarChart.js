import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const RadarChart = ({ data }) => {
  const [chartConfig, setChartConfig] = useState({
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20],
      },
    ],
    options: {
      chart: {
        type: "radar",
        toolbar: {
          show: false,
        },
      },
      fill: {
        type: "outline",
      },
      title: {
        text: "Qualification",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
  return (
    <div id="chart">
      {

        chartConfig.series.length > 0 &&
        <ReactApexChart
          options={chartConfig.options}
          series={chartConfig.series}
          type="radar"
          width={"100%"}
        />
      }
    </div>
  );
};
export default RadarChart;
