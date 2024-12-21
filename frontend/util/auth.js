import axios from "axios";
import Cookies from "js-cookie";

const validateToken = async () => {
  const response = await axios
    .get(process.env.NEXT_PUBLIC_API, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Token validation failed:", error);
      throw error;
    });

  return response;
};

const login = async (username, password) => {
  const res = await axios
    .post(
      process.env.NEXT_PUBLIC_API + "/auth/login",
      {
        username,
        password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  return res;
};

const logout = () => {
  Cookies.remove("authorized");
  window.location.reload();
};

const signup = async (username, password, email) => {
  const res = await axios
    .post(
      process.env.NEXT_PUBLIC_API + "/auth/signup",
      {
        username,
        password,
        email,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  return res;
};

module.exports = { validateToken, login, logout, signup };
