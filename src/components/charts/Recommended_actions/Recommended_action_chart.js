import React from "react";
import ReactApexChart from "react-apexcharts";

const Recommended_action_chart = ({ data }) => {
  const state = {
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
        events: {
          dataPointSelection: (event, chartContext, config) => {},
        },
      },
      fill: {
        opacity: 0.8,
      },
      theme: {
        mode: "light",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      labels: data.labels,
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
  };

  return (
    <div>
      <div id="chart" align="center">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="pie"
          width={"350"}
        />
      </div>
    </div>
  );
};

export default Recommended_action_chart;
