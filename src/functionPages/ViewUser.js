import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../Service/UserService";

export default function ViewUser() {
  const [user, setUsers] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;

  const { id } = useParams();

  useEffect(() => {
    loadUser(id);
    console.log(user.name);
  }, []);

  const loadUser = (id) => {
    UserService.GetUser(id).then((response) => {
      setUsers(response.data);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>UserName: </b>
                  {user.username}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {user.email}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/homepage"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
