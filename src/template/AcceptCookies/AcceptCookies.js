import { Button, Col, Drawer, Row, Typography } from "antd";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import * as classes from "./AcceptCookies.module.css";
import { CloseOutlined } from "@ant-design/icons";

const AcceptCookies = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (Cookies?.get("VO_USER_COOKIES") === undefined) {
        setIsOpen(true);
      }
    }, 3000);
  }, []);

  const acceptCookies = (response) => {
    Cookies.set("VO_USER_COOKIES", response);
    setIsOpen(false);
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <Drawer
      enableOverlay={false}
      direction="bottom"
      open={isOpen}
      onClose={toggleDrawer}
      className={classes.drawer}
    >
      <Row
        justify={"center"}
        align="center"
        gutter={[30, 30]}
        className={classes.container}
      >
        <Col
          align="center"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 20 }}
        >
          <Typography.Title level={5}>
            We use cookies (and other similar technologies) to collect data to
            improve your experience on our site. By using our website, you՚re
            agreeing to the collection of data .
          </Typography.Title>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }}>
          <Typography.Title level={5}>
            <Button onClick={() => acceptCookies(true)} type="primary">
              Allow all
            </Button>
            <Button onClick={() => acceptCookies(false)} type="link">
              Deny all
            </Button>
          </Typography.Title>
        </Col>
        <CloseOutlined
          className={classes.closeIcon}
          onClick={() => setIsOpen(false)}
        />
      </Row>
    </Drawer>
  );
};

export default AcceptCookies;
