import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";

const Notifications = () => {
  return (
    <Menu mode="horizontal">
      <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />}>
        <Menu.Item key="two" icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <Menu.Item key="three" icon={<AppstoreOutlined />}>
          Navigation Three
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Notifications;
