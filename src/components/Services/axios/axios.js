import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE_URL;
let requestNewToken = 0;

export const refreshToken = async (error) => {
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

      axios.defaults.headers.common = {
        Authorization: `bearer ${data?.accessToken}`,
      };
      return axios(error.config);
    } else {
      logout("expired session");
    }
  } catch (error) {
    logout("expired session");
  }
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403 && requestNewToken === 0) {
      requestNewToken++;
      refreshToken(error);
    }
    if (error.response.status === 403 && requestNewToken === 1) {
      logout("expired session");
    }
  }
);
