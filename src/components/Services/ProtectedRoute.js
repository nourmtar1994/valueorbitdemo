import React, { Suspense, useEffect, useState } from "react";
//router
import { Route } from "react-router-dom";
//cookies
import Cookies from "js-cookie";
//Loader
import Loader from "../../template/Loader/Loader";
import { logout } from "./Auth";

const ProtectedRoute = ({
  component: Component,
  title,
  role = null,
  setTitle,
  ...rest
}) => {
  const [authorized, setAuthorized] = useState(true);
  useEffect(() => {
    // console.log(JSON.parse(Cookies.get("VO_USER_AUTH")).role);
    if (role) {
      if (
        role?.find(
          (item) => JSON.parse(Cookies.get("VO_USER_AUTH")).role === item
        ) === undefined
      ) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    }
  }, [role]);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  return Cookies.get("VO_USER_AUTH") && authorized ? (
    <>
      <Route
        {...rest}
        render={(props) => {
          return (
            <div
              style={{
                minHeight: "500px",
                height: "100vh",
                padding: "5px",
              }}
            >
              <Suspense fallback={<Loader />}>
                {/* <AppBreadcrumb title={title} /> */}
                <Component {...props} />
              </Suspense>
            </div>
          );
        }}
      />
    </>
  ) : (
    authorized && logout()
  );
};

export default ProtectedRoute;
