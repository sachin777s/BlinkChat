import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import API from '../../api';
import { addContact, contactFetchingStart } from '../../redux/slices/contactSlice';
import { loginSuccess } from '../../redux/slices/userSlice';
import "./AddFriend.css";
import toast from 'react-hot-toast';

const AddFriend = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.user);
    const [mob, setMob] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(contactFetchingStart());
            const res = await API.put(`/user/contact/${user._id}`, { mob });
            if (res.status === 200) {
                toast.success(`${res.data.contactExist.mob} Added Successfully`)
                dispatch(loginSuccess(res.data.updatedUser));
                dispatch(addContact(res.data.contactExist));
                setIsOpen(false);
                setMobError(false);
            }
        } catch (err) {
            console.log("This is custom error in Add friends request");
            if (err.response.status === 408) {
                toast.error(err.response.data)
            }
            if (err.response.status === 405) {
                toast.error(err.response.data)
            }
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