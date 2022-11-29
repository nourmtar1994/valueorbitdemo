// import axios from "axios";
// import Cookies from "js-cookie";
import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import Login from "../Login/Login";
// import { logout } from "./Auth";

const AuthProvider = ({ children }) => {
  //   const [isAuth, setIsAuth] = useState(false);
  //   const [token, setToken] = useState(null);
  //   const [refreshToken, setRefreshToken] = useState(null);

  //   if (Cookies.get("VO_USER_AUTH")) {
  //     axios.defaults.headers.common = {
  //       Authorization: `bearer ${JSON.parse(Cookies.get("VO_USER_AUTH")).token}`,
  //     };
  //     setToken(true)
  //   }

  //   useEffect(() => {

  //       setToken(JSON?.parse(Cookies.get("VO_USER_AUTH") || {})?.token);
  //           setToken(true)
  //   }, [Cookies.get("VO_USER_AUTH")]);

  //   useEffect(() => {
  //     console.log("set config axios");
  //     if (token) {
  //       axios.defaults.headers.common = {
  //         Authorization: `bearer ${token}`,
  //       };
  //     }
  //   }, [token]);

  //   useEffect(() => {
  //     if (Cookies.get("VO_USER_AUTH")) {
  //     }

  //     setInterval(() => {
  //       getRefreshToken();
  //     }, 300000);
  //   }, []);

  //   const getRefreshToken = async () => {
  //     if (token) {
  //       logout("expired session");
  //       return;
  //     }
  //     try {
  //       const { data } = await axios.post("/token", {
  //         token: JSON.parse(Cookies.get("VO_USER_AUTH")).refreshToken,
  //       });
  //       if (data?.accessToken) {
  //         Cookies.set(
  //           "VO_USER_AUTH",
  //           JSON.stringify({
  //             ...JSON.parse(Cookies.get("VO_USER_AUTH")),
  //             token: data?.accessToken,
  //           })
  //         );
  //       } else {
  //         logout("expired session");
  //       }
  //     } catch (error) {
  //       logout("expired session");
  //     }
  //   };

  return <>{children}</>;
};

export default AuthProvider;
