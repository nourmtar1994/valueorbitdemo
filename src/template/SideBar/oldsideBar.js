<Affix offsetTop={0} style={{ height: "100vh" }}>
  <div>
    <div
      hidden={matches}
      className={classes.collapseBtnContainer}
      onClick={() => setvisibleSideBar(!visibleSideBar)}
    >
      {visibleSideBar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>

    <Sider
      width={150}
      // style={{
      //   display: visibleSideBar ? "block" : "none",
      // }}
      className={`${classes.sideBar}  app-sider `}
      trigger={null}
      collapsible
      collapsed={true}
    >
      <div className={classes.siderMenu}>
        <NavLink
          onClick={() => setTitle("Revenue Path")}
          to={"/revenuepath"}
          exact
          activeClassName="activeLink"
          key={0}
          className={classes.siderMenuItem}
        >
          <RiseOutlined className={classes.siderMenuItemIcon} />
          <span className={classes.siderMenuItemLabel}>Revenue Path</span>
        </NavLink>

        <NavLink
          onClick={() => setTitle("Forecast Intelligence")}
          to={"/"}
          exact
          activeClassName="activeLink"
          key={1}
          className={classes.siderMenuItem}
        >
          <FundViewOutlined className={classes.siderMenuItemIcon} />
          <span className={classes.siderMenuItemLabel}>
            Forecast Intelligence
          </span>
        </NavLink>

        <NavLink
          onClick={() => setTitle("Account Intelligence")}
          to={"/accountIntelligence"}
          exact
          activeClassName="activeLink"
          key={1.1}
          className={classes.siderMenuItem}
        >
          <FundViewOutlined className={classes.siderMenuItemIcon} />
          <span className={classes.siderMenuItemLabel}>
            Account Intelligence
          </span>
        </NavLink>
        <NavLink
          onClick={() => setTitle("Deal Intelligence")}
          to="/deal_intelligence/"
          activeClassName="activeLink"
          key={2}
          className={classes.siderMenuItem}
        >
          <StarOutlined className={classes.siderMenuItemIcon} />
          <span className={classes.siderMenuItemLabel}>Deal Intelligence</span>
        </NavLink>

        <NavLink
          onClick={() => setTitle("Signals")}
          to={"/signals"}
          exact
          key={3}
          className={classes.siderMenuItem}
          activeClassName="activeLink"
        >
          {/* <Badge dot size="small" count={15} color="#fff"> */}
          <Popover color={"#cdcdcd"} content={"New Signals"} placement="left">
            <WifiOutlined className={classes.siderMenuItemIcon} />
          </Popover>
          {/* </Badge> */}
          <span className={classes.siderMenuItemLabel}>Signals</span>
        </NavLink>

        <NavLink
          onClick={() => setTitle("Actions")}
          to={"/actions"}
          exact
          activeClassName="activeLink"
          key={4}
          className={classes.siderMenuItem}
        >
          <InteractionOutlined className={classes.siderMenuItemIcon} />
          <span className={classes.siderMenuItemLabel}>Actions</span>
        </NavLink>

        <NavLink
          onClick={() => setTitle("Process Mining")}
          to={"/processmining"}
          exact
          activeClassName="activeLink"
          key={4.1}
          className={classes.siderMenuItem}
        >
          <InteractionOutlined className={classes.siderMenuItemIcon} />
          <span className={classes.siderMenuItemLabel}>Process Mining</span>
        </NavLink>

        <NavLink
          onClick={() => setTitle("Insights")}
          to={"/Insights"}
          exact
          activeClassName="activeLink"
          key={5}
          className={classes.siderMenuItem}
        >
          <BulbOutlined className={classes.siderMenuItemIcon} />
          <span className={classes.siderMenuItemLabel}>Insights</span>
        </NavLink>

        <NavLink
          onClick={() => setTitle("Settings ")}
          to={"/settings"}
          exact
          key={6}
          className={classes.siderMenuItem}
          activeClassName="activeLink"
        >
          <SettingOutlined className={classes.siderMenuItemIcon} />
          <span className={classes.siderMenuItemLabel}>Settings</span>
        </NavLink>
      </div>
      {/* {matches && (
    <div
      className={classes.collapseBtnContainer}
      onClick={() => setCollapsed(!collapsed)}
    >
      <span>
        <LeftOutlined
          className={classes.icon_SB_collapse}
          rotate={collapsed && 180}
        />
      </span>
    </div>
  )} */}
    </Sider>
  </div>
</Affix>;
