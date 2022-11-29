import { Col, Collapse, Row, Timeline, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaChessQueen, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as classes from "./History.module.css";
import QuestionItem from "./QuestionItem";
const { Panel } = Collapse;

const History = ({ activeKeyId, playbook, category, question = null }) => {
  const [activeKeys, setActiveKeys] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setActiveKeys([category?.id]);
  }, [category]);
  useEffect(() => {
    !category &&
      setActiveKeys([
        categories?.filter((item) => item?.name === activeKeyId[0])?.[0]?._id,
      ]);
  }, [activeKeyId]);

  useEffect(() => {
    setCategories(playbook?.categories);
  }, [playbook]);

  // useEffect(() => {
  //   if (category) {
  //     setCategories(
  //       playbook?.categories?.filter((item) => item?._id === category?.id)
  //     );
  //   } else {
  //     setCategories(playbook?.categories);
  //   }
  // }, [category]);

  return (
    <div className={classes.historyContainer}>
      <Collapse
        accordion
        activeKey={activeKeys}
        ghost
        onChange={(e) => setActiveKeys(e)}
      >
        {categories
          ?.filter((item) => (category?.id ? item?._id === category?.id : item))
          ?.map((item, index) => (
            <Panel
              header={
                <Typography.Text
                  style={{ margin: 0 }}
                  level={5}
                  className="textPrimary"
                >
                  <b> {item?.name}</b>
                </Typography.Text>
              }
              key={item?._id}
            >
              <QuestionItem
                questions={item?.items?.filter((item) =>
                  question?._id ? item?._id === question?._id : item
                )}
              />
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};
export default History;
