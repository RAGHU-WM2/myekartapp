import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { USER_UPI } from "../API Services/userapi";
import { LoginApi } from "../services/Api";
import { storeUserData } from "../services/Storage";
import { isAuthenticated } from "../services/Auth";
import { Link, Navigate } from "react-router-dom";

import Image from "../Assests/Right Side.svg";
import "../Stylesheets/Login.css";
import googlepng from "../Assests/google.png";
// import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log(inputs);
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;

    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      //sending login api request
      LoginApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if ((err.code = "ERR_BAD_REQUEST")) {
            setErrors({ ...errors, custom_error: "Invalid Credentials." });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  if (isAuthenticated()) {
    //redirect user to dashboard
    return <Navigate to="/adminpanel" />;
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      {" "}
      <div className="loginpage">
        <div className="logleft">
          <h1>WELCOME BACK</h1>
          <p>Welcome back! Please enter your details.</p>

          <div className="loginputs">
            <label htmlFor="">Email</label> <div></div>
            <input
              type="email"
              onChange={handleInput}
              // value={username}
              name="email"
              id="loginptfield"
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              // value={password}
              onChange={handleInput}
              name="password"
              id="loginptfield"
            />
            <div className="logcoloumn">
              <div className="logremember">
                <input type="checkbox" /> &nbsp;
                <label htmlFor="">Remember me</label>{" "}
              </div>

              <p className="passwordlog">Forgot password</p>
            </div>
            <input type="submit" id="signfield" value="login" />
            {/* Sign in */}
            <button id="loginptfield">
              {" "}
              <img src={googlepng} width={25} alt="" /> Sign in with Google
            </button>
            <p style={{ fontSize: "12px", textAlign: "center" }}>
              Don’t have an account?{" "}
              <Link to="/register" id="loglink">
                Sign up fo free{" "}
              </Link>
              !
            </p>
          </div>
        </div>
        <div className="logright">
          <img src={Image} alt="" sizes="" />
        </div>
      </div>
    </form>
  );
};

export default Login;
