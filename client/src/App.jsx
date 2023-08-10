import './App.css'
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login/Login'
import Register from "./pages/Register/Register"
import ChatPage from "./pages/ChatPage/ChatPage"
import NotFound from './pages/NotFound/NotFound'
import { useSelector } from 'react-redux';

function App() {

  const { user } = useSelector((state) => state.user);
  return (
    <div className='App'>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={user ? <Navigate to="/chat" /> : <Navigate to="/login" />} />
        <Route path='/login' element={user ? <Navigate to="/chat" /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to="/chat" /> : < Register />} />
        <Route path='/chat' element={user ? < ChatPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
