import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import UserService from "../Service/UserService";
import AuthService from "../Service/AuthService";

export default function HomePage() {
  const [user, setUsers] = useState([]);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const { id } = useParams();

  useEffect(() => {
    loadUser();
    const authuser = AuthService.getCurrentAuth();

    if (authuser) {
      setCurrentUser(authuser);
      setShowModeratorBoard(authuser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(authuser.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const loadUser = () => {
    UserService.ShowTable().then((response) => {
      setUsers(response.data);
    });
  };

  const onDelete = (id) => {
    UserService.DeleteUser(id);
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
              <th scope="col">Name</th>
              <th scope="col">UserName</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-1"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>

                  {showAdminBoard | showModeratorBoard && (
                    <Link
                      className="btn btn-outline-primary mx-1"
                      to={`/edituser/${user.id}`}
                    >
                      Edit
                    </Link>
                  )}

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
