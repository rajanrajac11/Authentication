import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  signout,
} from "../store/userSlice";
const token = localStorage.getItem("authToken");

function Profile() {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignout = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure());
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="Profile Picture "
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
        />
        <input
          type="text"
          className="bg-slate-100 p-3"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          className="bg-slate-100 p-3"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          id="password"
          className="bg-slate-100 p-3"
          placeholder="Password"
          onChange={handleChange}
          defaultValue={currentUser.password}
        />
        <button className="bg-green-600 p-3 rounded-lg hover:opacity-95 uppercase disabled:opacity-80">
          Update
        </button>
        <div className="flex justify-between mt-5">
          <button className="text-red-500 cursor-pointer">
            Delete Account
          </button>
        </div>
      </form>
      <button
        className="text-white cursor-pointer p-1 bg-red-500  rounded-xl m-2"
        onClick={handleSignout}
      >
        SignOut
      </button>
    </div>
  );
}

export default Profile;
