import {
  BuildOutlined,
  DollarOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import {
  FaBookOpen,
  FaChartLine,
  FaCog,
  FaRegCalendarCheck,
  FaRegHandPointer,
  FaRegLightbulb,
  FaRoute,
  FaSitemap,
  FaUserCog,
  FaUsers,
  FaWifi,
} from "react-icons/fa";
import * as classes from "./SideBar.module.css";
export const links = {
  admin: [
    {
      title: "Sales & Manager",
      to: "/settings/users",
      icon: <FaUsers className={classes.siderMenuItemIcon} />,
    },
    {
      title: "User Configuration",
      to: "/settings/users/configuration",
      icon: <FaUserCog className={classes.siderMenuItemIcon} />,
    },
    {
      title: "Playbook Builder",
      to: "/settings/processflows",
      icon: <FaBookOpen className={classes.siderMenuItemIcon} />,
    },
    {
      title: "Deal Band",
      to: "/settings/dealband",
      icon: <DollarOutlined className={classes.siderMenuItemIcon} />,
    },
    {
      title: "Manager Judgement",
      to: "/settings/managerjudgement",
      icon: <ScheduleOutlined className={classes.siderMenuItemIcon} />,
    },
    {
      title: "GTM Builder ",
      to: "/settings/Builder",
      icon: <BuildOutlined className={classes.siderMenuItemIcon} />,
    },
    {
      title: "Fiscal Year",
      to: "/settings/fiscalyear",
      icon: <FaRegCalendarCheck />,
      role: ["admin"],
    },
  ].filter((item) => !item?.disabled),

  user: [
    {
      title: "Forecast Intelligence",
      to: "/",
      icon: <FaChartLine className={classes.siderMenuItemIcon} />,
    },
    {
      title: "Account Intelligence",
      to: "/accountintelligence",
      icon: <FaUsers className={classes.siderMenuItemIcon} />,
    },
    {
      title: "Pipeline Intelligence",
      to: "/pipelineintelligence",
      icon: <FaRoute className={classes.siderMenuItemIcon} />,
    },
    {
      title: "Signals",
      to: "/signals",
      icon: <FaWifi className={classes.siderMenuItemIcon} />,
    },
    {
      title: "Actions",
      to: "/actions",
      icon: <FaRegHandPointer className={classes.siderMenuItemIcon} />,
    },
    {
      title: "Process Mining",
      to: "/processmining",
      icon: <FaSitemap className={classes.siderMenuItemIcon} />,
      disabled: true,
    },
    {
      title: "Insights",
      to: "/insights",
      icon: <FaRegLightbulb className={classes.siderMenuItemIcon} />,
      disabled: false,
    },
    {
      title: "Settings",
      to: "/settings",
      icon: <FaCog className={classes.siderMenuItemIcon} />,
    },
  ].filter((item) => !item?.disabled),
};
