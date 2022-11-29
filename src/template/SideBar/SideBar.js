import React, { useEffect, useState } from "react";
import { Layout, Affix, Menu, Typography, Image, Tooltip } from "antd";

import * as classes from "./SideBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import logo from "../../assets/images/appLogo.png";
import { links } from "./Links";
import Cookies from "js-cookie";

// import Status from "../../components/Status/Status";

// import Cookies from "js-cookie";

const { Sider } = Layout;
const SideBar = ({ setTitle }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  const location = useLocation();

  const [collapsed, setcollapsed] = useState(false);
  const [visibleSideBar, setvisibleSideBar] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    setvisibleSideBar(matches);
  }, [matches]);

  // const handleStatusShow = () => {
  //   setIsStatusShow(!isStatusShow);
  // };

  return (
    <>
      {/* <Status setShow={handleStatusShow} /> */}

      <Affix offsetTop={0}>
        <Sider
          width={250}
          collapsed={collapsed}
          className={`${classes.sideBar}  `}
        >
          <div className={classes.appLogo_Container}>
            <a href="/">
              <Image preview={false} src={logo} width={32} height={32} />
              &nbsp; &nbsp;
              <Typography.Title
                level={4}
                className="text-primary"
                style={{ margin: 0 }}
              >
                {!collapsed && "ValueOrbit"}
              </Typography.Title>
            </a>
          </div>

          <div className={classes.menuContainer}>
            <div
              className={classes.collapsedBtn}
              onClick={() => setcollapsed(!collapsed)}
            >
              <Tooltip
                placement="right"
                title={!collapsed ? "minimize" : "extend"}
              >
                {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
              </Tooltip>
            </div>

            <Menu
              defaultSelectedKeys={[location.pathname]}
              mode="inline"
              // items={links}
            >
              {links?.[user?.role === "admin" ? "admin" : "user"]?.map(
                (item, index) => (
                  <Menu.Item
                    className={classes.siderMenuItem}
                    key={item?.to}
                    title={item?.title}
                    icon={item?.icon}
                  >
                    <NavLink
                      onClick={() => setTitle(item?.title)}
                      to={item?.to}
                      exact
                    >
                      {item?.title}
                    </NavLink>
                  </Menu.Item>
                )
              )}
            </Menu>
          </div>
        </Sider>
      </Affix>
    </>
  );
};
export default SideBar;
