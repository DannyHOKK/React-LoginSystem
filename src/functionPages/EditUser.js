import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../Service/UserService";

export default function EditUser() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();

  let navigation = useNavigate();

  useEffect(() => {
    loadUser(id);
  }, []);

  const loadUser = (id) => {
    UserService.GetUser(id).then((response) => {
      setName(response.data.name);
      setUserName(response.data.username);
      setEmail(response.data.email);
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    UserService.PutUser(id, name, username, email);
    navigation("/homepage");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h1 className="text-center m-4">Edit User</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link
                type="submit"
                className="btn btn-outline-danger mx-3"
                to={"/homepage"}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
