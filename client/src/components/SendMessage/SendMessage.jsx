import React, { useState } from "react";
import "./SendMessage.css";
import Send from "../../img/send-button.png";
import { useSelector } from "react-redux";
import API from "../../api";
import Picker from "emoji-picker-react";

const SendMessage = ({ socket, setMessages, messages }) => {
  const { user } = useSelector((state) => state.user);
  const { contacts } = useSelector((state) => state.contact);
  const contact = contacts[0];
  const [message, setMesssage] = useState("");
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const handleEmojiClick = (e) => {
    setIsEmojiPicker(false);
    console.log(e)
    setMesssage((prevMessage)=>prevMessage+e.emoji)
  }

  const handleSendMessage = async () => {
    socket.emit("send-msg", {
      sender: user._id,
      reciever: contact._id,
      message,
    });
    setMessages([
      ...messages,
      {
        sender: user._id,
        reciever: contact._id,
        message,
      },
    ]);
    await API.post(
      "/message/",
      {
        message: message,
        sender: user._id,
        reciever: contact._id,
      },
      { withCredentials: true }
    );
    setMesssage("");
  };

  return (
    <div className="sendMessage">
      <span onClick={() => setIsEmojiPicker(!isEmojiPicker)} style={{ cursor: "pointer", fontSize:"1.5rem" }}>😃️</span>
      {
        isEmojiPicker &&
        <div style={{position:"absolute",bottom:"100%",left:"0",zIndex:"7"}}>
          <Picker
            emojiStyle="google"
            onEmojiClick={handleEmojiClick}

          />
        </div>
      }
      <input
        value={message}
        onChange={(e) => setMesssage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage}
        type="text"
        placeholder="Type you message..."
      />
      <div className="sendBtn" onClick={handleSendMessage}>
        <img src={Send} alt="" />
      </div>
    </div>
  );
};

export default SendMessage;
