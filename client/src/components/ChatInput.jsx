import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import "../pagesStyles/ChatInput.css";
import Picker from "emoji-picker-react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    } else {
      toast.error("Please enter a message", {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        them: "dark",
      });
    }
  };

  return (
    <div className="chat-message-container">
      <div className="chat-message-button-container">
        <div className="emojis">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form
        className="chat-message-input-container"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="Type your messsage here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="chat-message-input"
        />
        <button type="submit" className="chat-message-send-button">
          <IoMdSend />
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChatInput;
