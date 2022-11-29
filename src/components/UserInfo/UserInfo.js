import React, { useEffect, useState } from "react";
//Cookies
import Cookies from "js-cookie";
//ANT DESIGN COMPONENTS
import {
  Space,
  Button,
  Tag,
  Typography,
  Popover,
  Avatar,
  Row,
  Col,
  Tooltip,
} from "antd";

//style
import * as classes from "./UserInfo.module.css";
import { logout } from "../Services/Auth";
import { FaRegClipboard } from "react-icons/fa";
import TextBook from "../TextBook/TextBook";

const UserInfo = () => {
  const [userInf, setUserInf] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
  useEffect(() => {
    setUserInf(JSON.parse(Cookies.get("VO_USER_AUTH")));
  }, []);

  return (
    <Space className={classes.notificationSpace}>
      <TextBook position={"rightBottom"} />
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Popover
        overlayInnerStyle={{ width: "280px", borderRadius: "5px" }}
        placement="bottomLeft"
        content={
          <>
            <Row>
              <Col span={10}>
                <Avatar
                  size={64}
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {userInf &&
                    (userInf.lastname[0] + userInf.firstname[0])?.toUpperCase()}
                </Avatar>
              </Col>
              <Col span={14}>
                <Typography.Text strong style={{ fontSize: "1.2em" }}>
                  {/* <UserOutlined /> */}
                  {/* &nbsp; */}{" "}
                  {userInf && userInf.lastname + " " + userInf.firstname}&nbsp;
                </Typography.Text>

                <br />
                <Typography.Text type="secondary">
                  {userInf?.username}&nbsp;
                  <Tag color="geekblue">{userInf && userInf.role} </Tag>
                </Typography.Text>
                <br />
                <br />

                <Button
                  type="primary"
                  danger
                  size="small"
                  block
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </>
        }
        trigger="click"
        open={visible}
        onOpenChange={handleVisibleChange}
      >
        <Avatar
          size={"large"}
          style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
          {userInf &&
            (userInf.lastname[0] + userInf.firstname[0])?.toUpperCase()}
        </Avatar>
      </Popover>
      {/* <UserOutlined className={classes.notificationIcon} />
      <Typography.Text style={{ color: "#fff" }} strong className={classes.UserInfo} >
        {JSON.parse(Cookies.get("VO_USER_AUTH"))?.lastname +
          " " +
          JSON.parse(Cookies.get("VO_USER_AUTH"))?.firstname}
      </Typography.Text>
      <Button onClick={() => handleLogout()} type="danger">
        Logout
      </Button> */}
      {/* <div className={classes.dropdown} placement="bottomRight">
        <AppstoreFilled className={classes.notificationIcon} />
      </div>
      <div className={classes.dropdown} placement="bottomRight">
        <Badge count={5}>
          <BellFilled className={classes.notificationIcon} />
        </Badge>
      </div>
      &nbsp; &nbsp;
      <Dropdown
        className={classes.dropdown}
        overlay={
          <Menu style={{ minWidth: "150px" }} key={10}>
            <Menu.Item icon={<IdcardOutlined />} key={"menu1"}>
              <a target="_blank" rel="noopener noreferrer" href="">
                {userInf && userInf.username}
                &nbsp;&nbsp;&nbsp;
                <Tag color="geekblue">{userInf && userInf.role} </Tag>
              </a>
            </Menu.Item> */}
      {/* <Menu.Item icon={<GlobalOutlined />} key={"menu3"}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
              >
                <div>
                  {userInf && userInf.login}
                </div>



              </a>
            </Menu.Item> */}
      {/* 
            <Menu.Item key={"menu5"} danger>
              Logout
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
        placement="bottomRight"
        arrow
      >
        <div className={classes.user_space}>
          <Button
            type="link"
            shape="circle"
            onClick={(e) => e.preventDefault()}
          >
            <UserOutlined className={classes.notificationIcon} />
          </Button>
          <DownOutlined />
        </div>
      </Dropdown> */}
    </Space>
  );
};
export default UserInfo;
