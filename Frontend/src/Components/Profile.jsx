import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../store/userSlice";

const submit = () => {};
function Profile() {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    } catch (error) {}
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form action="" className="flex flex-col gap-4">
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
          <span className="text-red-500 cursor-pointer">Delete Account</span>
          <span className="text-red-500 cursor-pointer">SignOut</span>
        </div>
      </form>
    </div>
  );
}

export default Profile;
