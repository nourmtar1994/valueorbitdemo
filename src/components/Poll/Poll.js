import React, { useEffect, useState } from "react";
//Ant design components
import { Button, Drawer, Space } from "antd";
//CSS Modules
import * as classes from "./Poll.module.css";
//BS icons
import {
  BsEmojiFrownFill,
  BsEmojiExpressionlessFill,
  BsEmojiSmileFill,
  BsEmojiLaughingFill,
} from "react-icons/bs";
import { CloseOutlined } from "@ant-design/icons";
const drawerStyle = {
  background: "linear-gradient(45deg, rgb(0 65 126) 0%, rgb(8 84 168) 100%)",
  color: "#fff",
  overflow: "hidden",
};
const Poll = () => {
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 2500);
  }, []);
  return (
    <div>
      <Drawer
        height={125}
        closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
        headerStyle={drawerStyle}
        bodyStyle={drawerStyle}
        className={`${classes.bg_drawer}`}
        placement={"bottom"}
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <div className={`${classes.icons}`} align="center">
          <p>
            Do you feel that your manager gives you continuous feedback
            concerning this opportunity ?
          </p>
          <span className="option">
            <BsEmojiFrownFill className="icon icon-danger" />
            <span className="text">Unsatisfied</span>
          </span>
          <span className="option">
            <BsEmojiExpressionlessFill className="icon icon-warning" />
            <span className="text">Neutral</span>
          </span>
          <span className="option">
            <BsEmojiSmileFill className="icon icon-lemon" />
            <span className="text">Satisfied</span>
          </span>
          <span className="option">
            <BsEmojiLaughingFill className="icon icon-success" />
            <span className="text">Extremely Satisfied</span>
          </span>
        </div>
      </Drawer>
    </div>
  );
};

export default Poll;
