import { Card, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaRedoAlt } from "react-icons/fa";
import Loader from "../Badge/Loader/Loader";
import HeatmapChart from "../charts/HeatmapChart/HeatmapChart";

export const DealProgress = ({
  resizeDitect,
  LayoutType,
  data,
  activeCategory,
  setActiveCategory,
  laodingDealProgress,
}) => {
  const [reload, setReload] = useState(true);

  useEffect(() => {
    setReload(false);
    setTimeout(() => {
      setReload(true);
    }, 0);
  }, []);

  useEffect(() => {
    setReload(false);
    setTimeout(() => {
      setReload(true);
    }, 0);
  }, [LayoutType]);

  useEffect(() => {
    setReload(false);
    setTimeout(() => {
      setReload(true);
    }, 0);
  }, [resizeDitect]);

  return (
    <Card
      title="Deal Progress"
      extra={
        <Tooltip title={"Reload"}>
          <FaRedoAlt
            onClick={() => {
              setReload(false);
              setTimeout(() => {
                setReload(true);
              }, 2000);
            }}
            className="action-icon"
            style={{ fontSize: 18 }}
          />
        </Tooltip>
      }
    >
      {reload ? (
        <>
          <HeatmapChart
            data={data}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            laodingDealProgress={laodingDealProgress}
          />
          {/* <AntHeatmapChart
            data={data}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            laodingDealProgress={laodingDealProgress}
          /> */}
        </>
      ) : (
        <Loader />
      )}
    </Card>
  );
};
