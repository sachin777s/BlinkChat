import React from 'react'
import "./NotFound.css"
import { useNavigate } from "react-router-dom"

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="notFound">
        <h1>Opps! Page not found</h1>
        <img src="https://st3.depositphotos.com/1006899/14552/i/600/depositphotos_145526397-stock-photo-robot-next-to-the-numbers.jpg" alt="" />
        <button onClick={()=>navigate("/")}>Back to Main Page</button>
    </div>
  )
}

export default NotFound