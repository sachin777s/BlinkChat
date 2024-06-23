import React from 'react'
import "./FriendProfile.css"
import Delete from "../../img/delete.png"
import { useDispatch, useSelector } from 'react-redux'
import API from '../../api'
import { removeContact } from '../../redux/slices/contactSlice'
import ProfilePic from "../../img/profile.png"
import toast from "react-hot-toast";

const FriendProfile = ({ setIsOpen }) => {
    const dispatch = useDispatch();
    const { contacts } = useSelector((state) => state.contact);
    const { user } = useSelector((state) => state.user);
    const contact = contacts[0];
    const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

    const handleRemoveContact = async () => {
        const res = await API.delete(`/user/contact/${user._id}?contactId=${contact._id}`);
        if (res.status = '200') {
            toast.success(`${contact.mob} is Removed Succeefully`)
            dispatch(removeContact())
        }
        setIsOpen(false);
    }

    return (
        <div className="friendProfile">
            <span className='f-close' onClick={() => setIsOpen(false)}>X</span>
            <div className="f-container">
                <img src={contact.profileImg ? serverPublic + contact.profileImg : ProfilePic} alt="" className='f-profile-picture' />
                <span className="name">{contact.name}</span>
                <span className="bio">{contact.bio}</span>
                <span className="mob">{contact.mob}</span>
                <button onClick={handleRemoveContact}><img src={Delete} alt="" /> Remove User</button>
            </div>
        </div>
    )
}

export default FriendProfile