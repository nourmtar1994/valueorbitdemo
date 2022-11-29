import {
  CheckCircleFilled,
  CloseCircleFilled,
  DislikeOutlined,
  LikeOutlined,
  MinusCircleFilled,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Collapse, Tooltip, Typography } from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import React from "react";
import { useState } from "react";
import {
  FaAngleRight,
  FaBookOpen,
  FaChessQueen,
  FaEdit,
  FaUserCircle,
} from "react-icons/fa";
import * as classes from "../OpportunityTextBook/OpportunityTextBook.module.css";

const Header = ({
  selectedAccount,
  selectedOpportunity,
  selectedPlaybook,
  selectedCategory,
  fieldToUpdate,
}) => {
  console.log(fieldToUpdate);
  return (
    <div className={classes.header}>
      {selectedAccount && (
        <div>
          {/* <Typography.Text strong>Account : </Typography.Text> */}
          <Typography.Text
            style={{ margin: 0 }}
            level={5}
            className="textPrimary"
          >
            <FaUserCircle className="icon" size={16} />
            &nbsp;
          </Typography.Text>
          {selectedAccount?.name}
        </div>
      )}
      {selectedOpportunity && (
        <div className={classes.subTitle}>
          {/* <Typography.Text strong>Opportunity : </Typography.Text> */}
          <FaChessQueen className="  icon_warning" size={16} />
          <Typography.Text>
            {" " + selectedOpportunity?.name}{" "}
          </Typography.Text>{" "}
        </div>
      )}
      {selectedPlaybook && (
        <div className={classes.subTitle}>
          {/* <Typography.Text strong>PlayBook : </Typography.Text> */}
          <Typography.Text className="textDescriptionX2">
            <FaBookOpen className="icon" size={16} />
          </Typography.Text>
          {" " + selectedPlaybook?.name}
        </div>
      )}

      {selectedCategory && (
        <div className={classes.subTitle}>
          <Typography.Text strong>Category : </Typography.Text>
          {selectedCategory?.category?.name}
          <br />
        </div>
      )}

      {selectedCategory && (
        <div className={classes.subTitle}>
          <Typography.Text strong>Item :</Typography.Text>{" "}
          {selectedCategory?.question?.name}
        </div>
      )}

      {fieldToUpdate && selectedOpportunity && (
        <div className={classes.subTitle}>
          <Typography.Text
            className="textSecondary"
            style={{ margin: 0 }}
            level={5}
          >
            <FaEdit className="icon" size={16} />
            <b> {fieldToUpdate?.label} : </b>
          </Typography.Text>

          {fieldToUpdate?.objname === "closedate"
            ? moment(fieldToUpdate?.value)?.format("ll")
            : fieldToUpdate?.value + ""}
        </div>
      )}
    </div>
  );
};
export default Header;
