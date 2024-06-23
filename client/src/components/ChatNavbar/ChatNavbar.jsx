import React, { useState } from 'react'
import "./ChatNavbar.css"
import AddUser from "../../img/add-user.png"
import ThreeDot from "../../img/three-dot.png"
import AddFriend from '../AddFriend/AddFriend'
import FriendProfile from '../FriendProfile/FriendProfile'
import { useDispatch, useSelector } from 'react-redux'
import API from '../../api'
import { removeContact } from '../../redux/slices/contactSlice'
import Profile from "../../img/profile.png"
import toast from 'react-hot-toast'

const ChatNavbar = ({ setMessages }) => {
    const dispatch = useDispatch();
    const { contacts } = useSelector((state) => state.contact);
    const { user } = useSelector((state) => state.user);
    const chatContact = contacts[0];
    const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

    const [isDropExpend, setIsDropExpend] = useState(false); //For Drop Down Menu Toggle
    const [isOpenAddFr, setIsOpenAddFr] = useState(false); //Add User Window Toggle
    const [isOpenFrPro, setIsOpenFrPro] = useState(false); //Friend Profile View Window Toggle

    const handleRemoveContact = async () => {
        const res = await API.delete(`/user/contact/${user._id}?contactId=${chatContact._id}`);
        if (res.status = '200') {
            toast.success(`${chatContact.mob} is removed successfully`)
            dispatch(removeContact())
        }
        setIsDropExpend(false);
    }

    const handleDeleteChats = async () => {
        const res = await API.delete(`/message/${user._id}?contactId=${chatContact._id}`);
        if (res.status = '200') {
            setMessages([]);
            toast.success("Chats cleared successfully");
        }
        setIsDropExpend(false);
    }

    return (
        <div className="c-navbar">
            <div className="left">
                <img
                    src={chatContact?.profileImg ? serverPublic + chatContact.profileImg : Profile}
                    alt=""
                    className='friendImg'
                    onClick={() => { chatContact ? setIsOpenFrPro(true) : "" }}
                />
                <span>{chatContact?.name}</span>
            </div>
            <div className="right">
                <img src={AddUser} alt="" onClick={() => setIsOpenAddFr(true)} />
                <div className={`dropDownMenu ${isDropExpend ? "drop-expend" : "drop-not-expend"}`}>
                    <ul>
                        <li onClick={handleDeleteChats}>Delete Chat</li>
                        <li onClick={handleRemoveContact}>Delete User</li>
                    </ul>
                </div>
                <img src={ThreeDot} alt="" className='toogleDropDown' onClick={() => { chatContact ? setIsDropExpend(!isDropExpend) : "" }} />
            </div>
            {
                isOpenAddFr && <AddFriend setIsOpen={setIsOpenAddFr} />
            }
            {
                isOpenFrPro && <FriendProfile setIsOpen={setIsOpenFrPro} />
            }
        </div>
    )
}

export default ChatNavbar