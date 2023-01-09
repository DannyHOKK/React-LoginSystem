import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../Service/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigation = useNavigate();

  const [disable, setDisable] = useState(true);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      AuthService.register(user, email, pwd);
      setSuccess(true);

      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }

      errRef.current.focus();
    }
  };

  useEffect(() => {
    setDisable(!validName || !validPwd || !validMatch ? true : false);
  }, [validName, validPwd, validMatch]);

  return (
    <>
      {success ? (
        navigation("/login")
      ) : (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>
                        <p
                          ref={errRef}
                          className={errMsg ? "errmsg" : "offscreen"}
                          aria-live="assertive"
                        >
                          {errMsg}
                        </p>
                        <form
                          className="mx-1 mx-md-4"
                          onSubmit={(e) => handleSubmit(e)}
                        >
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                ref={userRef}
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example1c"
                              >
                                Username
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example3c"
                              >
                                Your Email
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4c"
                                className="form-control"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example4c"
                              >
                                Password
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4cd"
                                className="form-control"
                                value={matchPwd}
                                onChange={(e) => setMatchPwd(e.target.value)}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example4cd"
                              >
                                Repeat your password
                              </label>
                            </div>
                          </div>

                          <button
                            className="btn btn-primary btn-lg"
                            disabled={disable}
                          >
                            Register
                          </button>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
