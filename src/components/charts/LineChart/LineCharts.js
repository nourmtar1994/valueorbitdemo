import { Alert } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FaSadCry } from "react-icons/fa";
import { NumFormatter } from "../../Services/Utils/Utils";

const LineCharts = ({ data, annotationValue = null, height = 200 }) => {
  let chartRef = useRef();
  const [dataCharts, setDataCharts] = useState(null);

  var options = {
    chart: {
      height: 380,
      width: "100%",
      type: "line",
      stacked: false,

      animations: {
        initialAnimation: {
          enabled: false,
        },
      },
      // dropShadow: {
      //   enabled: true,
      //   color: "#000",
      //   top: 18,
      //   left: 7,
      //   blur: 10,
      //   opacity: 0.2,
      // },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val, opts) {
        return NumFormatter(val);
      },
      style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 200,
        color: "black",
      },
      background: {
        enabled: false,
      },
    },
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shadeIntensity: 1,
    //     inverseColors: false,
    //     // opacityFrom: 0.45,
    //     // opacityTo: 0.05,
    //   },
    // },
    grid: {
      show: false,
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },

    stroke: {
      curve: "smooth", //straight,
    },

    title: {
      // text: "My Team Performance",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "#263238",
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        style: {
          fontSize: "10px",
          fontWeight: "normal",
          fontFamily: "Poppins",
          color: "#9699a2",
        },
      },
      forceNiceScale: true,
    },

    yaxis: {
      title: {
        // text: "Vines/Day (000)",
        style: {
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "Poppins",
        },
      },

      forceNiceScale: true,
      labels: {
        formatter: (value) => NumFormatter(value),
      },
    },

    legend: {
      show: true,
      horizontalAlign: "center",
      position: "top",
      offsetX: 100,
      offsetY: 10,
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
      offsetX: 20,
      offsetY: 4,
      fontSize: "12px",
      fontFamily: "Poppins",
      markers: {
        width: 12,
        height: 12,

        radius: 3,
      },
    },

    annotations: {
      position: "back",
      yaxis: annotationValue
        ? [
            {
              y: annotationValue,
              borderColor: "#777777",
              label: {
                text: "Target",
                orientation: "horizontal",
                style: {
                  color: "#fff",
                  background: "#58c235",
                },
              },
            },
          ]
        : [],
    },
    // tooltip: {
    //   custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //     return (
    //       '<div class="tooltipBubble"> ' +
    //       "<p align='center' class='tooltipTitle'> " +
    //       w?.globals?.seriesNames?.[seriesIndex] +
    //       "</p>" +
    //       "<p class='tooltipInfo'>" +
    //       "Amount : " +
    //       NumFormatter(series?.[seriesIndex]?.[dataPointIndex]) +
    //       "</p>" +
    //       "<p class='tooltipInfo'>" +
    //       "Comment : " +
    //       comments?.[dataPointIndex] +
    //       "</p>" +
    //       "</div>"
    //     );
    //   },
    // },

    colors: ["#09427c", "#e92630", "#ff9c07", "#4E569C", "#C34E4E", "#D8B65E"],

    theme: {
      mode: "light",
    },
  };

  useEffect(() => {
    try {
      setDataCharts({
        options: options,
        series: data,
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div id="chart">
      {data && dataCharts ? (
        <ReactApexChart
          ref={chartRef}
          options={options}
          series={dataCharts?.series}
          width={"99%"}
          height={height}
          type="line"
        />
      ) : (
        <div style={{ width: "100%", textAlign: "center" }}>
          <p align="center">
            <br />
            <FaSadCry className="textDescriptionX2" size={50} />
            <br />
            Not found history
          </p>
        </div>
      )}
    </div>
  );
};
export default LineCharts;
