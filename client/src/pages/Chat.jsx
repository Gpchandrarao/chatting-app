import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUserRoute, host } from "../utils/APIRoutes";
import "../pagesStyles/Chat.css";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import { ChatContainer } from "../components/ChatContainer";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    const fetchingSetCurrentUser = async () => {
      try {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          setCurrentChat(
            await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchingSetCurrentUser();
  }, []);

  useEffect(() => {
    const sockeUser = async () => {
      try {
        if (currentUser) {
          socket.current = io(host);
          socket.current.emit("add-user", currentUser._id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    sockeUser();
  }, [currentUser]);

  useEffect(() => {
    const setAvatarNa = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
            setContacts(data.data);
            console.log(data);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    setAvatarNa();
  }, [currentUser, navigate]);

  const headleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat--main-conatiner-">
      <div className="chat--main-conatiner-contacts">
        <Contact
          contacts={contacts}
          currentUser={currentUser}
          changeChat={headleChatChange}
        />

        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
};

export default Chat;
