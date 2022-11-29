import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Empty } from "antd";

const AngelCircleChart = ({ data }) => {
  const [chartConfig, setchartConfig] = useState({
    series: [],
    options: {
      chart: {
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          inverseOrder: false,
          startAngle: 0,
          endAngle: 360,
          offsetX: 0,
          offsetY: 0,
          hollow: {
            margin: 0,
            size: "25%",
            background: "transparent",
            image: undefined,
            imageWidth: 150,
            imageHeight: 150,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: true,
            position: "front",
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },

          dataLabels: {
            name: {
              fontSize: "18px",
            },
            value: {
              fontSize: "14px",
            },
            total: {
              show: true,
              label: "Total",
              color: "#000",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return (
                  Math.round(
                    w?.config?.series?.reduce(
                      (partialSum, a) => partialSum + a,
                      0
                    ) / w?.config?.series?.length || 0
                  ) + " %"
                );
              },
            },
          },
        },
      },
      labels: [
        "Metrics",
        "Champions",
        "implicate the pain",
        "Category 4",
        "Champions 2",
      ],
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
        inverseOrder: false,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
      fill: {
        type: "gradient",
      },
      colors: [
        "#00417e",
        "#52c41a",
        "#526079",
        "#dc3545",
        "#2691fd",

        "#fb8c00",
      ],
    },
  });
  useEffect(() => {
    setchartConfig({
      ...chartConfig,
      series: data?.category,
      options: {
        ...chartConfig?.options,
        labels: data?.labels,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div id="chart" align="center">
      {chartConfig?.series?.length > 0 ? (
        <ReactApexChart
          options={chartConfig.options}
          series={chartConfig.series}
          type="radialBar"
          height={330}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};
export default AngelCircleChart;
