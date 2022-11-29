import { Tooltip } from "antd";

export const NumFormatter = (num, withTooltip = false) => {
  let returned;
  if (num > 999 && num < 1000000) {
    returned = (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    returned = (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    returned = num; // if value < 1000, nothing to do
  }
  if (withTooltip) {
    return (
      <Tooltip title={num?.toLocaleString("en-US") || 0}>{returned}</Tooltip>
    );
  } else {
    return returned;
  }
};

export const alphaMonths = [
  {
    abbreviation: "Jan",
    name: "January",
  },
  {
    abbreviation: "Feb",
    name: "February",
  },
  {
    abbreviation: "Mar",
    name: "March",
  },
  {
    abbreviation: "Apr",
    name: "April",
  },
  {
    abbreviation: "May",
    name: "May",
  },
  {
    abbreviation: "Jun",
    name: "June",
  },
  {
    abbreviation: "Jul",
    name: "July",
  },
  {
    abbreviation: "Aug",
    name: "August",
  },
  {
    abbreviation: "Sep",
    name: "September",
  },
  {
    abbreviation: "Oct",
    name: "October",
  },
  {
    abbreviation: "Nov",
    name: "November",
  },
  {
    abbreviation: "Dec",
    name: "December",
  },
];
