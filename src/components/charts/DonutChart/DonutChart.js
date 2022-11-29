import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch } from "react-redux";
import { addFilter } from "../../../redux/Slices/Filter.slices";

const DonutChart = ({ data, addChartFilter }) => {
  const dispatch = useDispatch();

  const [chartConfig, setChartConfig] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            dispatch(
              addFilter({
                action: "velocity",
                value: config.w.config.labels[config.dataPointIndex],
                selected: true,
              })
            );
          },
        },
      },
      // fill: {
      //   type: "gradient",
      // },

      // title: {
      //   text: "Deal Velocity",
      //   align: "left",
      //   floating: false,
      //   style: {
      //     fontSize: "15px",
      //     fontWeight: "bold",
      //     fontFamily: "inherit",
      //     color: "#00417e",
      //     letterSpacing: "10px",
      //   },
      // },

      labels: ["High", "Average", "Low"],

      colors: ["#52c41a", "#fb8c00", "#dc3545"],

      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: "bottom",
        horizontalAlign: "left",
        floating: false,
        fontSize: "12px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 600,
        formatter: undefined,
        inverseOrder: false,
        width: "100%",
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
      },
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       legend: {
      //         position: "bottom",
      //       },
      //     },
      //   },
      // ],
    },
  });

  useEffect(() => {
    setChartConfig({
      ...chartConfig,
      series: data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div id="chart" align="center">
      <ReactApexChart
        options={chartConfig.options}
        series={chartConfig.series}
        type="donut"
        height={300}
      />
    </div>
  );
};

export default DonutChart;
