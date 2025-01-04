import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const submit = () => {};
function Profile() {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const navigate = useNavigate();

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
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          className="bg-slate-100 p-3"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          className="bg-slate-100 p-3"
          placeholder="Password"
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
