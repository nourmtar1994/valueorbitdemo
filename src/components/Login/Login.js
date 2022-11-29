import React, { useEffect, useState } from "react";
//cookies
import Cookies from "js-cookie";
//ant design components
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
//style
import * as classes from "./Login.module.css";
//icons
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import axios from "axios";
import logo from "../../assets/images/appLogoWhite.png";
import { FaHubspot, FaSalesforce } from "react-icons/fa";

import appLogo from "../../assets/images/appLogo.png";

const Login = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Cookies.get("VO_USER_AUTH")) window.location = "/";
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    let role = null;
    let manager = null;
    let sales = null;
    let adminuser = null;
    try {
      const { data } = await axios.post("/login2", {
        username: values.username,
        password: values.password,
      });

      console.log(data);

      if (data?.success) {
        let user = {
          id: data?.data?._id,
          username: data?.data?.name,
          firstname: data?.data?.firstname,
          lastname: data?.data?.lastname,
          originId: data?.data?.idorigin,
          role: data?.data?.role,
        };
        Cookies.set(
          "VO_USER_AUTH",
          JSON.stringify({
            firstname: user?.firstname,
            lastname: user?.lastname,
            role: user?.role,
            username: user?.username,
            id: user?.id,
            originId: user?.originId,
            token: data?.accessToken,
            refreshToken: data?.refreshToken,
          })
        );

        window.location = "/";
      } else {
        setMessage("Invalid identifiers");
        setLoading(false);
        return;
      }
    } catch (error) {
      setMessage("Invalid identifiers");
      setLoading(false);
      return;
    }
  };

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
              Welcome to ValueOrbit !
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
                  alt="valueorbit"
                  align="center"
                  src={appLogo}
                  height={80}
                  width={80}
                />
                <br />
                <br />
              </div>

              <a
                className={classes.salesforcebtn}
                href="https://ec2-3-140-248-0.us-east-2.compute.amazonaws.com:4000/v1/auth/salesforce/login"
                target={"_parent"}
              >
                Continue with&nbsp;&nbsp; <FaSalesforce size={45} />
              </a>
              <a
                className={classes.hubspotbtn}
                href="https://ec2-3-140-248-0.us-east-2.compute.amazonaws.com:4000/v1/auth/hubspot/login"
                target={"_parent"}
              >
                Continue with&nbsp;&nbsp; <FaHubspot size={40} />
              </a>
              <Divider plain orientation="center">
                or use your <b>email</b> to sign in
              </Divider>
              <Typography.Text type="danger">{message}</Typography.Text>
              <Form
                layout="vertical"
                name="username"
                className="login-form"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                wrapperCol={{ span: 24 }}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your Login!" },
                  ]}
                >
                  <Input
                    size="large"
                    onFocus={() => setMessage("")}
                    className={"radiusInput"}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Login"
                    disabled={loading}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input
                    size="large"
                    onFocus={() => setMessage("")}
                    className={"radiusInput"}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    className={"radiusInput"}
                    block
                  >
                    Log in
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox disabled={loading}>Remember me</Checkbox>
                  </Form.Item>

                  <Typography.Link>Forgot password</Typography.Link>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Login;
