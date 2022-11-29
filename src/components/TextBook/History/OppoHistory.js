import { Alert, Col, Collapse, Row, Timeline, Typography } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as classes from "./History.module.css";
import OpportunityHistoryItem from "./OpportunityHistoryItem";
import Loader from "../../SmartProcessFlow/Loader/Loader";
const { Panel } = Collapse;

const OppoHistory = ({
  opportunities,
  target,
  account,
  opportunity,
  playbook,
  category,
  newUpdates,
}) => {
  const [DefaultHistory, setDefaultHistory] = useState({});
  const [historyData, setHistoryData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeKeys, setActiveKeys] = useState([]);
  const [user, setUser] = useState(JSON.parse(Cookies.get("VO_USER_AUTH")));

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    if (account) {
      setHistoryData({
        [account?.id]: historyData[account?.id],
      });
      setActiveKeys([0]);
    } else {
      setHistoryData(DefaultHistory);
    }
  }, [account]);

  const getHistory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/redshift/opportunityhistorylog/");
      setLoading(false);
      if (data?.success) {
        let groupedByAccount;
        groupedByAccount = data?.data
          ?.filter((item) => item?.createdbyid === user?.originId)
          ?.sort((a, b) => moment(b?.createddate) - moment(a?.createddate))
          ?.reduce(
            (a, c) => ((a[c.account] = (a[c.account] || []).concat(c)), a),
            {}
          );

        setDefaultHistory(groupedByAccount);
        setHistoryData(groupedByAccount);
        // account
        //   ? setHistoryData({
        //       [account?.id]: groupedByAccount[account?.id],
        //     })
        //   : setHistoryData(DefaultHistory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PanelRender = () => {
    var accountsPanel = Object.keys(historyData).map((key, index) => {
      if (key !== "null") {
        return (
          (!account?.id || account?.id === key) && (
            <Panel
              // extra={"pp"}
              header={
                <Typography.Text
                  style={{ margin: 0 }}
                  level={5}
                  className="textPrimary"
                >
                  <FaUserCircle className="icon" size={18} />{" "}
                  <b>{getAccountName(key)?.account?.name}</b>
                  <label className="textDescription">
                    {" | "} {getAccountName(key)?.account?.billingcountry}
                  </label>
                </Typography.Text>
              }
              key={index}
            >
              {historyData[key] ? (
                <OpportunityHistoryItem
                  accountId={key}
                  opportunities={opportunities}
                  data={historyData[key]}
                  opportunity={opportunity}
                  newUpdates={newUpdates}
                />
              ) : (
                <Alert
                  message="Not Found History"
                  type="warning"
                  showIcon
                  closable
                />
              )}
            </Panel>
          )
        );
      }
    });
    return accountsPanel;
  };
  const getAccountName = (accountID) => {
    return opportunities?.filter(
      (item) => item?.account?._id === accountID
    )?.[0];
  };
  return (
    <div className={classes.historyContainer}>
      {loading && <Loader />}
      <Collapse
        accordion
        activeKey={activeKeys}
        onChange={(e) => setActiveKeys([e])}
        ghost
      >
        {PanelRender()}
      </Collapse>
    </div>
  );
};
export default OppoHistory;
