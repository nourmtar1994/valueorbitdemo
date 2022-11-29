import React from "react";

import * as classes from "./BarStatistic.module.css";

const BarStatistic = ({ items }) => {
  return (
    <div className={classes.BarStatistic}>
      {items.map(
        (item, index) =>
          item?.percent > 0 && (
            <div
              className={classes.colum}
              style={{ width: item.percent + "%", background: item.color }}
              key={index}
            >
              <span className={classes.BarValue}> {item.percent + "%"}</span>

              <span className={classes.BarTitle}>{item.title}</span>
            </div>
          )
      )}
    </div>
  );
};

export default BarStatistic;
