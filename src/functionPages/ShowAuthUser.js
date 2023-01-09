import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import UserService from "../Service/UserService";
import AdminSerivce from "../Service/AdminService";
import AuthService from "../Service/AuthService";

export default function ShowAuthUser() {
  const [user, setUsers] = useState([]);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentAuth();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    AdminSerivce.ShowUserTable().then(
      (response) => {
        setUsers(response.data);

        // console.log(response.data);
      },
      (error) => {
        console.log("Error: ");
        console.log(error);
      }
    );
  };

  const onDelete = (id) => {
    AdminSerivce.DeleteAuthUser(id);
    loadUser();
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                {/* {setRole(user.roles)} */}
                {/* {console.log(user.roles)} */}
                <td>{user.roles[0].name}</td>

                <td>
                  {/* <Link
                    className="btn btn-primary mx-1"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link> */}
                  {/* <Link
                    className="btn btn-outline-primary mx-1"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link> */}
                  {showAdminBoard && (
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
