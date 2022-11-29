import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch } from "react-redux";
import { addFilter } from "../../../redux/Slices/Filter.slices";

const PieChart = ({ data, addChartFilter }) => {
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
                action: "dealrisk",
                value: config.w.config.labels[config.dataPointIndex],
                selected: true,
              })
            );
          },
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
          borderRadius: "10px",
        },
      },
      labels: ["Critical", "High", "Moderate", "Low"],
      colors: ["#e92630", "#fb8c00", "#2691fd", "#52c41a"],
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
    },
  });
  useEffect(() => {
    setChartConfig({
      ...chartConfig,
      series: data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  console.log(data);

  return data?.length > 0 ? (
    <div id="chart" align="center">
      <ReactApexChart
        options={chartConfig.options}
        series={chartConfig.series}
        type="pie"
        height={300}
      />
    </div>
  ) : (
    <Empty />
  );
};
export default PieChart;
