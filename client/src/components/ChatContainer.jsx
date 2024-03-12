import React, { useEffect, useState, useRef } from "react";
import "../pagesStyles/ChatContainer.css";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const data = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        const response = await axios.post(recieveMessageRoute, {
          from: data._id,
          to: currentChat._id,
        });

        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat]);

  useEffect(() => {
    const getCurretChat = async () => {
      try {
        if (currentChat) {
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )._id;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurretChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    try {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: data._id,
        msg,
      });

      await axios.post(sendMessageRoute, {
        from: data._id,
        to: currentChat._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      console.log("Error form handeleSendMsg: ", error);
    }
  };

  useEffect(() => {
    const socketMess = () => {
      try {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, messages: msg });
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    socketMess();
  }, []);

  useEffect(() => {
    try {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    } catch (error) {
      console.log(error);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    try {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  }, [messages]);

  return (
    <div className="chat-main-container">
      <div className="chat-main-header">
        <div className="user-defails">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            className="chat-avatar"
            alt=""
          />
          <h3 className="chat-username">{currentChat.username}</h3>
        </div>
        <Logout />
      </div>
      <div className="chat-main-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`messages ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content-main">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
};
