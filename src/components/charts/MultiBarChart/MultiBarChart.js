import React from "react";
import ReactApexChart from "react-apexcharts";

const MultiBarChart = () => {
  const chartConfig = {
    series: [
      {
        name: "ai close date",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
      {
        name: "close date",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40",
          endingShape: "rounded",
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      stroke: {
        show: true,
        width: 10,
        colors: ["transparent"],
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val;
          },
        },
      },
      // title: {
      //     text: 'Monthly Inflation in Argentina, 2002',
      //     floating: true,
      //     offsetY: 0,
      //     align: 'center',
      //     style: {
      //         color: '#444'
      //     }
      // }
    },
  };

  return (
    <div id="chart" align="center">
      {chartConfig.series.length > 0 && (
        <ReactApexChart
          options={chartConfig.options}
          series={chartConfig.series}
          type="bar"
          height={"300px"}
        />
      )}
    </div>
  );
};
export default MultiBarChart;
