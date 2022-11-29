import React, { useState } from "react";
//Cookies
//Ant Deisgn components
import { Col, Row, Typography, Image } from "antd";
//app components
import UserInfo from "../../components/UserInfo/UserInfo";
//style
import * as classes from "./AppHeader.module.css";

// import Notifications from "../../components/Notifictions/Notifications";

const { Title } = Typography;
const AppHeader = ({ title }) => {
  // let history = useHistory();
  const [loading, setLoading] = useState(false);

  const GoToSynchronize = async () => {
    setLoading(true);
    window.location.href = "/synchronize";
  };

  return (
    <Row className={classes.AppHeader} style={{ padding: 0 }}>
      <Col span={12}>
        <Typography.Text strong type="secondary" level={5}>
          {title}
        </Typography.Text>
      </Col>

      {/* <Col>
        <Notifications />
      </Col> */}

      <Col align="right" span={12} style={{ paddingRight: "20px" }}>
        <UserInfo />
      </Col>
    </Row>
  );
};
export default AppHeader;
