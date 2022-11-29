import React, { useEffect, useState } from "react";

import { Col, Input, Row } from "antd";
import Cookies from "js-cookie";
import { FaCalendarCheck, FaSearch } from "react-icons/fa";

import AppMenu from "../AppMenu/AppMenu";
import Badge from "../Badge/Badge";
import * as classes from "./Settings.module.css";
import {
  ApartmentOutlined,
  BuildOutlined,
  DollarOutlined,
  ScheduleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
const settingsItem = [
  {
    title: "Sales & Manager",
    link: "/settings/users",
    icon: <UsergroupAddOutlined />,
    role: ["admin"],
  },
  {
    title: "Playbook Builder",
    link: "/settings/processflows",
    icon: <ApartmentOutlined />,
    role: ["admin"],
  },
  {
    title: "Deal Band",
    link: "/settings/dealband",
    icon: <DollarOutlined />,
    role: ["admin"],
  },
  {
    title: "Manager Judgement",
    link: "/settings/managerjudgement",
    icon: <ScheduleOutlined />,
    role: ["manager"],
  },
  {
    title: "GTM Builder ",
    link: "/settings/Builder",
    icon: <BuildOutlined />,
    role: ["admin", "manager", "sales"],
  },
  {
    title: "Fiscal Year Settings",
    link: "fiscalyear",
    icon: <FaCalendarCheck />,
    role: ["admin"],
  },
];
const Settings = () => {
  const [search, setSearch] = useState("");
  const [filteredSettingItem, setFilteredSettingItem] = useState([]);
  useEffect(() => {
    setFilteredSettingItem(settingsItem);
  }, []);
  useEffect(() => {
    if (search !== "" && search !== " " && search) {
      setFilteredSettingItem(
        settingsItem?.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredSettingItem(settingsItem);
    }
  }, [search]);

  return (
    <Badge title={"Settings"} loading={false}>
      <Row gutter={[10, 10]}>
        <Col xs={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
          <Input
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            prefix={<FaSearch className="textDescriptionX2" />}
            className="custom-input"
            placeholder="Search"
          />
        </Col>
        <Col span={24}>
          {filteredSettingItem?.map(
            (item, index) =>
              item.role?.find(
                (item) => JSON.parse(Cookies.get("VO_USER_AUTH")).role === item
              ) !== undefined && (
                <AppMenu
                  key={index}
                  title={item?.title}
                  link={item?.link}
                  icon={item?.icon}
                />
              )
          )}
        </Col>
      </Row>
    </Badge>
  );
};
export default Settings;
