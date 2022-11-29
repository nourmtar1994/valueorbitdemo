import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const BubbleChart = ({ data = null }) => {
  const [series, setSeries] = useState(data || []);

  useEffect(() => {
    setSeries(data);
  }, [data]);

  const date = (date, days) => {
    var result = new Date(date);
    result = result.setDate(result.getDate() + days);
    return result;
  };

  const options = {
    chart: {
      height: 350,
      type: "bubble",
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1.0,
    },
    title: {
      text: undefined,
    },
    xaxis: {
      type: "datetime",
      max: date(
        data
          ?.map((item) => item?.data[0][0])
          .sort((date1, date2) => date1 - date2)[data?.length - 1],
        2
      ),
      min: date(
        data
          ?.map((item) => item?.data[0][0])
          .sort((date1, date2) => date1 - date2)[0],
        -2
      ),
      title: {
        text: "Close Date",
      },
      labels: {
        rotate: 90,
      },
      // min: this.dates.length - 5,
      // max: this.dates.length,
    },

    yaxis: {
      tickAmount: 4,
      min: 0,
      max: 100,
      title: {
        text: "Progress",
      },
      labels: {
        formatter: (value) => {
          return value + "%";
        },
      },
    },
    plotOptions: {
      bubble: {
        minBubbleRadius: 7,
        maxBubbleRadius: 40,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 50,
          borderColor: "#000",
          label: {
            show: true,
            text: "Progress",
            style: {
              color: "#fff",
              background: "#52c41a",
            },
          },
        },
      ],
      xaxis: [
        {
          x: new Date().getTime(),
          borderColor: "#000",
          yAxisIndex: 0,
          label: {
            show: true,
            text: "Today",
            style: {
              color: "#fff",
              background: "#00417e",
            },
          },
        },
      ],
    },

    legend: {
      show: false,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="tooltipBubble"> ' +
          "<p class='tooltipTitle'>" +
          w.globals.seriesNames[seriesIndex] +
          "</p>" +
          "<p class='tooltipInfo'> " +
          "<b>Days to close : </b>" +
          moment(w.globals.seriesX[seriesIndex][0]).fromNow() +
          "</p>" +
          "<p class='tooltipInfo'> " +
          "<b>Close Date : </b>" +
          moment(w.globals.seriesX[seriesIndex][0]).format("ll") +
          "</p>" +
          "<p class='tooltipInfo'>" +
          "<b>Progress : </b>" +
          series[seriesIndex][dataPointIndex] +
          "%</p>" +
          "<p class='tooltipInfo'>" +
          "<b>Amount : </b>" +
          w.globals.seriesZ[seriesIndex][0] +
          "</p>" +
          "</div>"
        );
      },
    },
    // colors: ["#83a9ba", "#00417e"],

    // colors: [
    //   function ({ series, seriesIndex, dataPointIndex, w }) {
    //     console.log(series, seriesIndex, dataPointIndex, w);
    //     if (series) {
    //       return "#7E36AF";
    //     } else {
    //       return "#D9534F";
    //     }
    //   },
    // ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bubble"
        height={300}
      />
    </div>
  );
};
export default BubbleChart;
