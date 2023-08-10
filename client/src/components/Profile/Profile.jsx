import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./Profile.css"
import { useNavigate } from "react-router-dom"
import API from '../../api';
import { loginFail, loginStart, loginSuccess, logout } from '../../redux/slices/userSlice';
import ProfilePic from "../../img/profile.png"

const Profile = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)
  const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    profileImg: user.profileImg
  })

  const [profileImgView, setProfileImgView] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const fileChange = async(e) => {
    console.log(e.target.files[0])
    setProfileImgView(URL.createObjectURL(e.target.files[0]));
    const filename = `${e.target.files[0].name}_${Date.now()}`;
    const res = await API.put(`/user/${user._id}`, {profileImg: filename});
    if (res.status = '200') {
      dispatch(loginSuccess(res.data));
    }
    const formData = new FormData();
    formData.append("filename",filename);
    formData.append("profileImg",e.target.files[0]);
    await API.post("/uploadPic",formData);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      loginStart();
      const res = await API.put(`/user/${user._id}`, data);
      console.log(res)
      if (res.status = '200') {
        dispatch(loginSuccess(res.data))
        setIsOpen(false);
      }
    } catch (err) {
      loginFail();
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }

  const handleDeleteAccount = async () => {
    const res = await API.delete(`/user/${user._id}`);
    if (res.status = '200') {
      window.alert("Account Deleted Successfully!");
      navigate("/login");
    }
  }

  return (
    <div className="profile">
      <span className="p-close" onClick={() => setIsOpen(false)}>X</span>
      <div className="p-container">
        <form action="" className='p-form'>
          <label htmlFor="profile-input" className='profilePictureLabel'>
            <img src={profileImgView?profileImgView:user.profileImg?serverPublic+user.profileImg:ProfilePic} alt="" className="profile-picture" />
          </label>
          <input onChange={fileChange} type="file" id="profile-input" name='profileImg' />
          <input onChange={handleChange} value={data.name} type="text" name='name' />
          <input onChange={handleChange} value={data.email} type="text" name='email' />
          <input onChange={handleChange} value={data.bio} type="text" name='bio' placeholder='Enter Your Bio' />
          <button type='submit' onClick={handleUpdate}>Update</button>
        </form>
        <hr />
        <div className='p-dangerZone'>
          <h2>Danger zone:</h2>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default Profile