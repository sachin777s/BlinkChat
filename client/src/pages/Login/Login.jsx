import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import API from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { loginFail, loginStart, loginSuccess } from '../../redux/slices/userSlice'
import Loader from "../../img/loader.png"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mob, setMob] = useState();
  const [password, setPassword] = useState();

  const { isLoading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart())
      const res = await API.post("/auth/login", { mob, password });
      if (res.status = '201') {
        dispatch(loginSuccess(res.data.user));
        navigate("/chat");
        return;
      }
    } catch (err) {
      dispatch(loginFail())
    }
  }

  return (
    <div className='login'>
      <h2>Login</h2>
      {isLoading && <img style={{ height: '48px', width: '48px' }} src={Loader} alt="" />}
      <form onSubmit={handleSubmit} className='l-form'>
        <input
          value={mob}
          onChange={(e) => setMob(e.target.value)}
          type="tel"
          name='mob'
          placeholder='Mobile Number'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name='password'
          placeholder='Enter Password'
        />
        <button type='submit'>Login</button>
      </form>
      <span>Create an Account. <Link to="/register">Register</Link></span>
    </div>
  )
}

export default Login