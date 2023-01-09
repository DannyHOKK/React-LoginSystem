import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../Service/AuthService";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("OKOK");
    AuthService.login(username, password).then((response) => {
      navigation("/homepage");
      window.location.reload();

      console.log(response.data.token);
    });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container pt-5">
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <form className="w-50" onSubmit={(e) => handleLogin(e)}>
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      LoginPage
                    </p>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form1Example1">
                        Username
                      </label>
                      <input
                        type="user"
                        id="form1Example1"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={"Username"}
                      />
                    </div>
                    {/* Password input */}
                    <label className="form-label" htmlFor="form1Example2">
                      Password
                    </label>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form1Example2"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={"Password"}
                      />
                    </div>
                    {/* 2 column grid layout for inline styling */}
                    <div className="row mb-4">
                      <div className="col d-flex justify-content-center">
                        {/* Checkbox */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="form1Example3"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form1Example3"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        {/* Simple link */}
                        <a href="/register">register?</a>
                      </div>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
