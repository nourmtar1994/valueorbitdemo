import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "./Auth";

export const AccessToken = () => {
  if (JSON.parse(Cookies.get("VO_USER_AUTH"))?.token) {
    axios.defaults.headers.common = {
      Authorization: `bearer ${JSON.parse(Cookies.get("VO_USER_AUTH")).token}`,
    };

    // refreshToken();
    setInterval(() => {
      refreshToken();
    }, 300000);
  }
};

export const refreshToken = async () => {
  if (!JSON?.parse(Cookies.get("VO_USER_AUTH"))) {
    logout("expired session");
    return;
  }

  try {
    const { data } = await axios.post("/token", {
      token: JSON.parse(Cookies.get("VO_USER_AUTH")).refreshToken,
    });
    if (data?.accessToken) {
      Cookies.set(
        "VO_USER_AUTH",
        JSON.stringify({
          ...JSON.parse(Cookies.get("VO_USER_AUTH")),
          token: data?.accessToken,
        })
      );
    } else {
      logout("expired session");
    }

    axios.defaults.headers.common = {
      Authorization: `bearer ${data?.accessToken}`,
    };
  } catch (error) {
    logout("expired session");
  }
};
