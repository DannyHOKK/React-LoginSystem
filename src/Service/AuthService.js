import axios from "axios";
import React from "react";

const API_URL =
  "http://ec2-13-231-208-146.ap-northeast-1.compute.amazonaws.com:8080/api/auth";

const register = (username, email, password) => {
  return axios.post(API_URL + "/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentAuth = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentAuth,
};

export default AuthService;
