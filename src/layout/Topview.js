import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../Service/AuthService";
import HKUST_ICON from "/Users/puichiho/Desktop/FrontEnd/DataCenter/fullstack-frontend/src/img/HKUST.png";

export default function Topview() {
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

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className=" container-fluid">
          {currentUser ? (
            <Link className="navbar-brand" to="/showtable">
              <img
                src={HKUST_ICON}
                alt="Logo"
                width="30"
                height="24"
                className="d-inline-block align-text-top shadow"
              />
              HKUST
            </Link>
          ) : (
            <Link className="navbar-brand" to="/">
              <img
                src={HKUST_ICON}
                alt="Logo"
                width="30"
                height="24"
                className="d-inline-block align-text-top shadow"
              />
              HKUST
            </Link>
          )}
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className="nav-item">
                <Link to={"/showtable"} className="nav-link">
                  Table
                </Link>
              </li>
            )}

            {showAdminBoard | showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/editauthuser"} className="nav-link">
                  ManageUser
                </Link>
              </li>
            )}
            {showAdminBoard | showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/adduser"} className="nav-link">
                  AddTable
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
