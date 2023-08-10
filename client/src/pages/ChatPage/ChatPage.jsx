import React from 'react'
import ChatSide from '../../components/ChatSide/ChatSide'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./ChatPage.css"

const ChatPage = () => {
  return (
    <div className='chatPage'>
       <Sidebar/>
       <ChatSide/>
    </div>
  )
}

export default ChatPage