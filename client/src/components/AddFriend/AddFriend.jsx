import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import API from '../../api';
import { addContact, contactFetchingStart } from '../../redux/slices/contactSlice';
import { loginSuccess } from '../../redux/slices/userSlice';
import "./AddFriend.css";

const AddFriend = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.user);
    const [mob, setMob] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(contactFetchingStart());
        const res = await API.put(`/user/contact/${user._id}`, { mob });
        if (res.status === '200') {
            dispatch(loginSuccess(res.data.updatedUser));
            dispatch(addContact(res.data.contactExist));
            setIsOpen(false);
            setMobError(false);
        }
    }

    return (
        <div className="addFriend">
            <span className='close' onClick={() => setIsOpen(false)}>X</span>
            <div className="a-container">
                <h1>Adding New Contact:</h1>
                <form onSubmit={handleSubmit} className='a-form'>
                    <input value={mob} onChange={(e) => setMob(e.target.value)} type="tel" placeholder="Enter Your Friend Mob..." />
                    <button type='submit'>{isLoading ? "Loading..." : "Add"}</button>
                </form>
            </div>
        </div>
    )
}

export default AddFriend