import React from 'react'
import "./Message.css"

const Message = ({message, time, type, scrollRef}) => {
  return (
    <div ref={scrollRef} className={`message ${type === "in" ? "message-incomming" : "message-outgoing"}`}>
        <span>{message}</span>
        <span>{time}</span>
    </div>
  )
}

export default Message