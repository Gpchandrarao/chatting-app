import React, { useEffect, useState } from "react";
import "../pagesStyles/Welcome.css";
import Robot from "../assets/robot.gif";

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getSetUserName = async () => {
      try {
        setUserName(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          ).username
        );
      } catch (error) {
        console.log(error);
      }
    };
    getSetUserName();
  }, []);

  return (
    <div className="welocm-main-coantainer">
      <img src={Robot} alt="" className="welocm-main-img" />
      <h1 className="welocm-main-heading">
        Welcome, <span>{userName}</span>
      </h1>
      <p>Please select a chat to start messaging. </p>
    </div>
  );
};

export default Welcome;
