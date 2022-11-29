import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Progress, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfoCard from "../InfoCard/InfoCard";
import * as classes from "./Synchronize.module.css";

const Synchronize = () => {
  const [success, setSuccess] = useState(false);
  const [loadingPercent, setloadingPercent] = useState(false);

  const SynchronizeGo = async () => {
    setloadingPercent(10);
    setTimeout(() => {
      setloadingPercent(20);
    }, 5000);
    setTimeout(() => {
      setloadingPercent(25);
    }, 5000);

    try {
      setTimeout(() => {
        setloadingPercent(30);
      }, 10000);
      const { data } = await axios.post(
        "https://valueorbit-vvv.herokuapp.com/v1/redshift/opportunity/synchronization/go/"
      );
      if (data.success) {
        setloadingPercent(100);
        setSuccess(data);
      }
    } catch (error) {
      console.log(error);
      setloadingPercent(0);
      setSuccess(undefined);
    }
  };

  useEffect(() => {
    SynchronizeGo();
  }, []);

  return (
    <InfoCard
      title={<Typography.Title level={3}>Synchronize data</Typography.Title>}
      body={
        <div className={classes.synchronizeContainer}>
          {success ? (
            <Alert
              showIcon
              message="Data successfully Synchronized "
              type="success"
              closable
              description={
                <>
                  There are &nbsp;<b>{success.report.totalTodoOpportunities}</b>
                  &nbsp; opportunities synchronized .
                </>
              }
            />
          ) : success === undefined ? (
            <Alert
              showIcon
              message="Failed to synchronize data"
              type="error"
              closable
              description="Verify your connexion !"
            />
          ) : (
            <>
              <Typography>
                <Typography.Paragraph type="secondary" align="center" strong>
                  Waiting for data synchronization
                  <br />
                  <LoadingOutlined
                    style={{ color: "#00417e", fontSize: "2em" }}
                  />
                </Typography.Paragraph>
              </Typography>
              <Progress
                trailColor="#cde3f7f5"
                showInfo
                strokeColor={"#01417ee3"}
                percent={loadingPercent}
                status="normal"
                type="line"
              />
            </>
          )}
        </div>
      }
    ></InfoCard>
  );
};

export default Synchronize;
