import React, { useState } from 'react'
import "./Register.css"
import { Link } from "react-router-dom"
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFail } from "../../redux/slices/userSlice"
import Loader from "../../img/loader.png"

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state => state.user));

  const [user, setUser] = useState({
    name: null,
    mob: null,
    email: null,
    password: null,
    cpassword: null
  });

  /* Handle Change in Input */
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  /* Handle Submit Event */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await API.post("/auth/register", user, { withCredentials: true });
      if (res.status = '201') {
        dispatch(loginSuccess(res.data.user));
        navigate("/chat");
      }
    } catch (error) {
      dispatch(loginFail())
    }
  }

  return (
    <div className='register'>
      <h2>Create an Account</h2>
      {isLoading && <img style={{ height: '48px', width: '48px' }} src={Loader} alt="" />}
      <form onSubmit={handleSubmit} className='r-form'>
        <input
          onChange={handleChange}
          value={user.name}
          type="text"
          name='name'
          placeholder='Your Name'
        />
        <input
          onChange={handleChange}
          value={user.mob}
          type="tel"
          name='mob'
          placeholder='Mobile Number' />
        <input
          onChange={handleChange}
          value={user.email}
          type="email"
          name='email'
          placeholder='Email Adderess'
        />
        <input
          onChange={handleChange}
          value={user.password}
          type="password" name='password'
          placeholder='Enter Password'
        />
        <input
          onChange={handleChange}
          value={user.cpassword}
          type="password" name='cpassword'
          placeholder='Confirm Password'
        />
        <input
          onChange={handleChange}
          type="file"
          placeholder='Profile Picture'
        />
        <button type='submit'>Register</button>
      </form>
      <span>Already have an account? <Link to="/login">Login</Link></span>
    </div>
  )
}

export default Register
