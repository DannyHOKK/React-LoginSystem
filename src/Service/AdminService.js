import axios from "axios";
import React from "react";
import Authheader from "./Authheader";

const API_URL =
  "http://ec2-13-231-208-146.ap-northeast-1.compute.amazonaws.com:8080/api/admin";

const ShowUserTable = () => {
  return axios.get(API_URL + "/find/user", { headers: Authheader() });
};

// const AddUser = (name, username, email) => {
//   return axios.post(
//     API_URL + "/user/post",
//     { name, username, email },
//     { headers: Authheader() }
//   );
// };

// const PutUser = (id, name, username, email) => {
//   return axios.put(
//     API_URL + `/user/${id}`,
//     { name, username, email },
//     {
//       headers: Authheader(),
//     }
//   );
// };

const DeleteAuthUser = (id) => {
  return axios.delete(API_URL + `/delete/${id}`, { headers: Authheader() });
};

const AdminSerivce = {
  ShowUserTable,
  DeleteAuthUser,
};

export default AdminSerivce;
