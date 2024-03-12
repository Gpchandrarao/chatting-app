import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pagesStyles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValue] = useState({
    username: "",
    password: "",
  });

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
  }, []);

  const hendelValidation = () => {
    const { password, username } = values;
    if (username === "") {
      toast.error("Username and Password is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is Required.", toastOptions);
      return false;
    }
    return true;
  };

  const heandelChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const heandelSubmit = async (event) => {
    event.preventDefault();

    if (hendelValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, { username, password });
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
      <form onSubmit={(event) => heandelSubmit(event)} action="">
        <div className="brand">
          <img src={logo} alt="logo" />
          <h1>snappy</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => heandelChange(e)}
          min="3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => heandelChange(e)}
        />

        <button type="submit">Log In</button>
        <span>
          Don't have an account ? <Link to="/register">Create One.</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
