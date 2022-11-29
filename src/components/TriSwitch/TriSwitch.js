import React, { useEffect } from "react";
// Cookies
import Cookies from "js-cookie";
//styles
import "./TriSwitch.css";
//ant design components
import { message, Slider } from "antd";
//icons
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import axios from "axios";
const marks = {
  0: <CloseCircleOutlined style={{ color: "red" }} />,
  50: <MinusSquareOutlined />,
  100: <CheckCircleOutlined style={{ color: "green" }} />,
};
const TriSwitch = ({ ChildItem }) => {
  const handleOpinion = async (opinion) => {
    if (JSON.parse(Cookies.get("VO_USER_AUTH")).role === "manager") {
      try {
        const { data } = await axios.put("/item/" + opinion.itemId, {
          manageropinion: opinion.value,
        });
        if (data.success) {
          if (opinion.value !== 50) {
            sendMessage({
              itemId: opinion.itemId,
              type: "manageropinion",
              value: opinion.value,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.info("only sales can make Smileys");
    }
  };

  const sendMessage = async (reponse) => {
    try {
      const { data } = await axios.post("/discussion/" + reponse.itemId, {
        value: reponse.value + "",
        type: reponse.type,
        isrequest: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Slider
      disabled={
        JSON.parse(Cookies.get("VO_USER_AUTH")).role === "manager"
          ? false
          : true
      }
      onChange={(e) =>
        handleOpinion({
          itemId: ChildItem._id,
          name: ChildItem._id,
          value: e,
          manageropinion: 1,
        })
      }
      tooltipVisible={false}
      marks={marks}
      step={50}
      included={false}
      defaultValue={ChildItem && ChildItem.manageropinion}
      style={{ width: "60px" }}
    />
  );
};
export default TriSwitch;
