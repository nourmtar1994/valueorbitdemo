import React, { useEffect } from "react";

//ant design components
import { Button, Col, Result, Row, Typography } from "antd";
//style
import * as classes from "../Style.module.css";
//icons
import { LoadingOutlined } from "@ant-design/icons";
//images
import logo from "../../../../assets/images/appLogoWhite.png";
import salesforce from "../../../../assets/images/salesforce.png";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegSadCry } from "react-icons/fa";
import { useState } from "react";
const Salesforce = () => {
  const [success, setSuccess] = useState(null);

  const onFinish = async (values) => {
    let role = null;
    let manager = null;
    let sales = null;
    let adminuser = null;
    try {
      const { data } = await axios.post("/login2", {
        username: values.username,
        password: values.password,
      });

      if (data?.success) {
        setSuccess(true);

        if (data?.data === "admin") {
          role = "admin";
          adminuser = {
            username: "administrator",
            firstname: "admin",
            lastname: "admin",
          };
        } else if (data?.data?.salesusers) {
          role = "manager";
          manager = {
            id: data?.data?._id,
            username: data?.data?.name,
            firstname: data?.data?.firstname,
            lastname: data?.data?.lastname,
            originId: data?.data?.idorigin,
          };
        } else {
          role = "sales";
          sales = {
            id: data?.data?._id,
            username: data?.data?.name,
            firstname: data?.data?.firstname,
            lastname: data?.data?.lastname,
            originId: data?.data?.idorigin,
          };
        }
        Cookies.set(
          "VO_USER_AUTH",
          JSON.stringify({
            firstname:
              manager?.firstname || sales?.firstname || adminuser?.firstname,
            lastname:
              manager?.lastname || sales?.lastname || adminuser?.lastname,
            role,
            username:
              manager?.username || sales?.username || adminuser?.username,
            id: manager?.id || sales?.id,

            originId: manager?.originId || sales?.originId,
            token: data?.accessToken,
            refreshToken: data?.refreshToken,
          })
        );

        window.location = "/";
      } else {
        setSuccess(data);
      }
      return;
    } catch (error) {
      setSuccess(false);

      return;
    }
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const user = JSON.parse(urlParams.get("user"));
    console.log(user);
    user &&
      onFinish({
        username: user?.email,
        password: "valueorbitdemo",
      });
  }, []);

  return (
    <div style={{ background: "#fff", height: "fit-content" }}>
      <div className={classes.container}>
        <Row className={classes.box}>
          <Col
            xs={{ span: 0 }}
            sm={{ span: 0 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            className={`${classes.banner}  ${classes.row} `}
          >
            <Typography.Title
              type="secondary"
              level={3}
              style={{ color: "#fff", margin: 0 }}
            >
              <hr></hr>
              Welcome to ValueOrbit!
            </Typography.Title>
            <Typography.Title
              style={{ color: "silver", margin: "5px 15px" }}
              level={4}
            >
              AI Revenue Execution & Forecasting Platform
            </Typography.Title>
            <div className={classes.logo}>
              <img src={logo} width={35} height={35} alt="valueorbit"></img>
              <label>ValueOrbit</label>
            </div>
            <div className={classes.bannerImage}></div>
          </Col>
          <Col
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            className={`${classes.loginBox}  ${classes.row} `}
            align="center"
          >
            <div className={classes.formContainer}>
              <div className={classes.logoContainer} align="center">
                <img
                  align="center"
                  src={salesforce}
                  height={80}
                  width={80}
                  preview={false}
                />
              </div>

              <Typography.Title type="secondary" align="center" level={5}>
                Connect with Salesforce ...
              </Typography.Title>
              {success === null && (
                <div className={classes.loader} align="center">
                  <LoadingOutlined style={{ color: "#308fdf", fontSize: 50 }} />
                </div>
              )}
              {success?.success === false && (
                <>
                  <Result
                    // style={{ padding: 0 }}
                    icon={<FaRegSadCry className={"icon_silver"} size={64} />}
                    status="error"
                    subTitle={
                      <Typography.Text type="danger">
                        {success?.information}
                      </Typography.Text>
                    }
                    // subTitle={""}
                    extra={
                      <Button
                        onClick={() => (window.location.href = "/")}
                        shape="round"
                        type="primary"
                        ghost
                      >
                        Back Home
                      </Button>
                    }
                  />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Salesforce;
