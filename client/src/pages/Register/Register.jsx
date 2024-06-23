import React, { useState } from 'react'
import "./Register.css"
import { Link } from "react-router-dom"
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFail } from "../../redux/slices/userSlice"
import Loader from "../../img/loader.png"
import toast from 'react-hot-toast';

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
    if (!user.name) return toast.error("Name is required");
    if (!user.email) return toast.error("Email is required");
    if (!user.password) return toast.error("Password is required");
    if (user.mob.length < 10) return toast.error("Invalid Mobile Number")
    if (user.password !== user.cpassword) return toast.error("Password doesn't matched");

    try {
      dispatch(loginStart());
      const res = await API.post("/auth/register", user, { withCredentials: true });
      if (res.status = '201') {
        dispatch(loginSuccess(res.data.user));
        navigate("/chat");
        toast.success("Registered Successfully")
      }
    } catch (error) {
      dispatch(loginFail())
      toast.error("Registration Failed")
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
