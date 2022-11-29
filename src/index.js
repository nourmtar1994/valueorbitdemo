import reportWebVitals from "./reportWebVitals";
import React from "react";
//router
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
//redux (store)
import { store } from "./redux/Store";
import { Provider } from "react-redux";
//cookie
import Cookies from "js-cookie";
//axios
import axios from "axios";
//app components

import App from "./App";
// ant design (theme provider)
import { ConfigProvider } from "antd";
//style
import "./index.css";
import "react-edit-text/dist/index.css";
import moment from "moment-timezone";
import { logout } from "./components/Services/Auth";
import { refreshToken } from "./components/Services/AccessToken";
import AuthProvider from "./components/Services/AuthProvider";
let requestNewToken = 0;

//axios configuration
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403 && requestNewToken === 0) {
      requestNewToken++;
      refreshToken();
    } else if (requestNewToken === 1 && error.response.status === 403) {
      logout("expired session");
    }
  }
);

moment.tz.setDefault("Europe/Jersey");
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const user = JSON.parse(urlParams.get("user"));

// console.log(userid);

axios.defaults.headers.post["Content-Type"] = "application/json";

// const onFinish = async (values) => {
//   let role = null;
//   let manager = null;
//   let sales = null;
//   let adminuser = null;
//   try {
//     const { data } = await axios.post("/login2", {
//       username: values.username,
//       password: values.password,
//     });
//     console.log(data);
//     console.log(values);

//     if (data?.success) {
//       if (data?.data === "admin") {
//         role = "admin";
//         adminuser = {
//           username: "administrator",
//           firstname: "admin",
//           lastname: "admin",
//         };
//       } else if (data?.data?.salesusers) {
//         role = "manager";
//         manager = {
//           id: data?.data?._id,
//           username: data?.data?.name,
//           firstname: data?.data?.firstname,
//           lastname: data?.data?.lastname,
//           originId: data?.data?.idorigin,
//         };
//       } else {
//         role = "sales";
//         sales = {
//           id: data?.data?._id,
//           username: data?.data?.name,
//           firstname: data?.data?.firstname,
//           lastname: data?.data?.lastname,
//           originId: data?.data?.idorigin,
//         };
//       }
//       Cookies.set(
//         "VO_USER_AUTH",
//         JSON.stringify({
//           firstname:
//             manager?.firstname || sales?.firstname || adminuser?.firstname,
//           lastname: manager?.lastname || sales?.lastname || adminuser?.lastname,
//           role,
//           username: manager?.username || sales?.username || adminuser?.username,
//           id: manager?.id || sales?.id,

//           originId: manager?.originId || sales?.originId,
//           token: data?.accessToken,
//           refreshToken: data?.refreshToken,
//         })
//       );

//       window.location = "/";
//     }
//     return;
//   } catch (error) {
//     return;
//   }
// };
// user &&
//   onFinish({
//     username: user?.email,
//     password: "valueorbitdemo",
//   });

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <Provider store={store}>
      <ConfigProvider direction="ltr">
        <Router>
          <App />
        </Router>
      </ConfigProvider>
    </Provider>
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
