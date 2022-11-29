import React, { useEffect, useState } from "react";
//ANT DESIGN COMPONENTS
import { Comment, Empty, Popconfirm, Spin, Tooltip, Typography } from "antd";
import * as classes from "./Signal.module.css";

import axios from "axios";
import moment from "moment";
import {
  FaExclamationTriangle,
  FaFlag,
  FaTrashAlt,
  FaWindowClose,
} from "react-icons/fa";
import Loader from "../Badge/Loader/Loader";
import { Loading3QuartersOutlined, LoadingOutlined } from "@ant-design/icons";

const Signal = ({ opportunityId }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [signalsList, setSignalsList] = useState([]);
  const [globalSignalsList, setGlobalSignalsList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    opportunitySignals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunityId]);

  // useEffect(() => {
  //   filterSignals();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedStatus]);

  const opportunitySignals = async () => {
    setLoading(true);
    if (opportunityId) {
      try {
        const { data } = await axios.get(
          "/signal_mr/by/go?category=opportunity&id=" + opportunityId
        );
        setLoading(false);

        if (data?.success) {
          setSignalsList(
            data?.data
              .filter((item) => item?.isDeleted === false)
              .sort(
                (a, b) =>
                  Number(b.isFlagged) - Number(a.isFlagged) ||
                  moment(b.createddate) - moment(a.createddate)
              )
          );
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const updateSignals = async (obj, id) => {
    setLoading(true);

    try {
      const { data } = await axios.put("/signal_mr/" + id, obj);
      if (data) {
        opportunitySignals();
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  return (
    <div style={{ maxHeight: "63vh", overflow: "auto" }}>
      <Spin
        size="large"
        spinning={loading}
        indicator={<LoadingOutlined spin />}
      >
        {signalsList?.length > 0 ? (
          signalsList?.map((item) => (
            <Comment
              actions={[
                <Tooltip title="Flag">
                  <FaFlag
                    onClick={() =>
                      updateSignals(
                        {
                          isFlagged: !item?.isFlagged,
                          isSnoozed: false,
                          isIgnored: false,
                          isDeleted: false,
                        },
                        item?._id
                      )
                    }
                    className={
                      classes.signalsIcon +
                      " " +
                      (item?.isFlagged ? classes.primary : classes.secondary)
                    }
                  />
                </Tooltip>,
                <Tooltip title="Snooze">
                  <FaExclamationTriangle
                    onClick={() =>
                      updateSignals(
                        {
                          isSnoozed: !item?.isSnoozed,
                          isFlagged: false,
                          isIgnored: false,
                          isDeleted: false,
                        },
                        item?._id
                      )
                    }
                    className={
                      classes.signalsIcon +
                      " " +
                      (item?.isSnoozed ? classes.primary : classes.secondary)
                    }
                  />
                </Tooltip>,
                <Tooltip title="Ignore">
                  <FaWindowClose
                    onClick={() =>
                      updateSignals(
                        {
                          isIgnored: !item?.isIgnored,
                          isSnoozed: false,
                          isFlagged: false,
                          isDeleted: false,
                        },
                        item?._id
                      )
                    }
                    className={
                      classes.signalsIcon +
                      " " +
                      (item?.isIgnored ? classes.primary : classes.secondary)
                    }
                  />
                </Tooltip>,
                <Tooltip title="Delete signal" placement="topRight">
                  <Popconfirm
                    title="Are you sure delete this signal?"
                    placement="bottomLeft"
                    onConfirm={() =>
                      updateSignals(
                        {
                          isIgnored: false,
                          isSnoozed: false,
                          isFlagged: false,
                          isDeleted: !item?.isDeleted,
                        },
                        item?._id
                      )
                    }
                  >
                    <FaTrashAlt
                      className={
                        classes.signalsIcon +
                        " " +
                        (item?.isDeleted ? classes.danger : classes.secondary)
                      }
                    />
                  </Popconfirm>
                </Tooltip>,
              ]}
              author={<a>{item?.type}</a>}
              content={
                <>
                  <p>{item?.signal}</p>

                  <Tooltip title={moment(item?.createddate)?.format("ll")}>
                    <span className="textDescription">
                      {moment(item?.createddate)?.fromNow()}
                    </span>
                  </Tooltip>
                </>
              }
              // datetime={

              // }
            />
          ))
        ) : (
          <Empty />
        )}
      </Spin>
    </div>
  );
};
export default Signal;
