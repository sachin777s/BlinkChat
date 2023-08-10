import React, { useEffect, useRef, useState } from 'react'
import "./ChatSide.css"
import ChatNavbar from '../ChatNavbar/ChatNavbar'
import SendMessage from '../SendMessage/SendMessage'
import Message from '../Message/Message'
import { useSelector } from 'react-redux'
import API from "../../api"
import io from "socket.io-client"

let socket;
const ChatSide = () => {

  const { user } = useSelector((state) => state.user);
  const { contacts } = useSelector((state) => state.contact);
  const contact = contacts[0];
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    socket = io("http://localhost:8000")
    socket.emit("add-user", user._id);
  }, [user]);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get(`/message/${user._id}?contactId=${contact._id}`);
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages();
  }, [contact])

  useEffect(() => {
    const messageListener = (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    };

    socket.on("msg-recieve", messageListener);

    return () => {
      socket.off("msg-recieve", messageListener);
    };
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatSide">
      <ChatNavbar setMessages={setMessages} />
      <div className="c-chatContainer">
        {
          messages.length > 0 ?
            messages.map((message, i) => {
              console.log(i)
              return (
                <Message
                  scrollRef={scrollRef}
                  message={message.message}
                  time="11:35"
                  type={message.sender === user._id ? "out" : "in"}
                  key={i}
                />
              )
            }) :
            <span
              style={{ 
                fontSize: "1.2rem",
                fontWeight:"bold",
                marginLeft:"1rem"
             }}
            >
              No Message Here...
            </span>
        }
      </div>
      <SendMessage socket={socket} setMessages={setMessages} messages={messages} />
    </div>
  )
}

export default ChatSide