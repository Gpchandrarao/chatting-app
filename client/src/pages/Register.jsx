import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../pagesStyles/Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "drak",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValue] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const heandelChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  // if (password !== confirmPassword) {
  //   toast.error("password and confirmpassword should be same.", toastOptions);
  //   return false;
  // confirmPassword,
  // } else

  const hendelValidation = () => {
    const { password, username } = values;
    if (username.length < 3) {
      toast.error("Username Should be greater then 3 charactes ", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "password Should be equal or greater then 8 charactes ",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const heandelSubmit = async (event) => {
    event.preventDefault();

    if (hendelValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(registerRoute, { username, password });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <div className="register-container">
      <form
        onSubmit={(event) => heandelSubmit(event)}
        action=""
        className="register-form-container"
      >
        <div className="brand">
          <img src={logo} alt="logo" className="register-logo" />
          <h1 className="register-heading">snappy</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => heandelChange(e)}
          className="register-inputs"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => heandelChange(e)}
          className="register-inputs"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => heandelChange(e)}
          className="register-inputs"
          name="confirmpassword"
        />
        <button type="submit" className="register-user-but">
          Create User
        </button>
        <span className="register-sapn">
          already have an account ? <Link to="/login">Login.</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
