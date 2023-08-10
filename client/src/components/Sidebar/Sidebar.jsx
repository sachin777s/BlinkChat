import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import Logo from "../../img/logo.png"
import Profile from '../Profile/Profile';
import API from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import {
    contactFetched,
    contactFetchingFail,
    contactFetchingStart,
    selectToChat
} from '../../redux/slices/contactSlice';
import ProfilePic from '../../img/profile.png';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    let { contacts } = useSelector((state) => state.contact);
    const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;
    const [isExpend, setIsExpend] = useState(false);
    const [isOpen, setIsOpen] = useState(false);  //For Profile Page Toggle

    const handleSearch = (e) => {
        
    }

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                dispatch(contactFetchingStart())
                const res = await API.get(`user/contact/${user._id}`);
                if (res.status = '200') {
                    dispatch(contactFetched(res.data));
                }
            } catch (err) {
                dispatch(contactFetchingFail())
            }
        }
        fetchContacts();
    }, [])

    return (
        <>
            <span className='sideToggleIcon' onClick={() => setIsExpend(!isExpend)}>
                {isExpend ? "X" : "="}
            </span>
            <div className={`sidebar ${isExpend ? "sidebar-expend" : "sidebar-not-expend"}`}>
                <div className="s-navbar">
                    <img src={Logo} alt="Logo" />
                    <h2>BlinkChat</h2>
                    <img
                        src={user.profileImg ? serverPublic + user.profileImg : ProfilePic}
                        onClick={() => setIsOpen(true)}
                    />
                </div>
                <div className="search">
                    <input type="text" placeholder='Search your friends...' onChange={handleSearch} />
                </div>
                <div className="friends">
                    {contacts.length === 0 ? <span style={{ paddingLeft: '12px' }}>No Contact Available...</span> :
                        contacts.map((contact) => {
                            return (
                                <div className='friend' key={contact._id} onClick={() => { dispatch(selectToChat(contact._id)); setIsExpend(false) }}>
                                    <img
                                        src={contact.profileImg ? serverPublic + contact.profileImg : ProfilePic} alt="" />
                                    <span>{contact.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                isOpen && <Profile isOpen={isOpen} setIsOpen={setIsOpen} />
            }
        </>
    )
}

export default Sidebar;