import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FaMoon } from "react-icons/fa";
const HeatmapChart = ({ data, activeCategory, setActiveCategory }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig({
      series: [
        {
          name: "Coaching",
          data: data.coaching,
        },
        {
          name: "Progress",

          data: data.completed,
        },
      ],
      options: {
        plotOptions: {
          heatmap: {
            radius: 7,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 25,
                  color: "#777474",
                  name: "low",
                },
                {
                  from: 26,
                  to: 50,
                  color: "#00417e",
                  name: "medium",
                },
                {
                  from: 51,
                  to: 75,
                  color: "#ff9c07",
                  name: "high",
                },
                {
                  from: 76,
                  to: 100,
                  color: "#52c41a",
                  name: "very high",
                },
              ],
            },
          },
        },
        chart: {
          events: {
            dataPointSelection: (event, chartContext, config) => {
              if (
                !activeCategory.includes(
                  config.w.config.labels[config.dataPointIndex]
                )
              ) {
                setActiveCategory([
                  config.w.config.labels[config.dataPointIndex],
                ]);
              } else {
                setActiveCategory(
                  activeCategory.filter(
                    (item) =>
                      item !== config.w.config.labels[config.dataPointIndex]
                  )
                );
              }
            },
          },
          height: 100,
          type: "heatmap",
          toolbar: {
            show: true,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (value, opts) {
            return value.toFixed(0) + "%";
          },
        },
        xaxis: {
          type: "text",
          tickAmount: undefined,
          tickPlacement: "between",
          position: "bottom",
          labels: {
            show: true,
            rotate: -45,
            hideOverlappingLabels: true,
            maxHeight: 120,
          },
        },
        // title: {
        //     text: 'HeatMap Chart (Single color)'
        // },
        labels: data.category,
        tooltip: {
          y: {
            title: {
              formatter: function (value) {
                return '<p class="tooltipTitle"> <b>' + value + " </b></p>";
              },
            },
            formatter: function (series, seriesIndex, dataPointIndex, w) {
              return tooltipRender(
                seriesIndex?.dataPointIndex,
                seriesIndex?.seriesIndex
              );
            },
          },
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function tooltipRender(index = 0, x = 0) {
    const managerSymbole = ["👎", "➖", "👍"];
    const salesSymbole = ["❌", "➖", "✅"];
    let dom = "";

    data?.categoriesItem[index]?.items?.forEach((title, i) => {
      dom =
        dom +
        ("<p class='tooltipInfo'> " +
          title +
          " : " +
          (x === 0
            ? managerSymbole[
                parseInt(data?.categoriesItem[index]?.manageropinion[i])
              ] + "</li>"
            : salesSymbole[
                parseInt(data?.categoriesItem[index]?.salesfeel[i])
              ]) +
          "</p>");
    });

    dom?.toString().replace(",", "");

    return '<div class="tooltipBubble"> ' + dom + "</div>";
  }

  return (
    <div id="chart">
      {config !== null && (
        <ReactApexChart
          options={config.options}
          series={config.series}
          type="heatmap"
          height={"200"}
        />
      )}
    </div>
  );
};

export default HeatmapChart;
