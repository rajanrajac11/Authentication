import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const navigate = useNavigate();

  return <li>Profile</li>;
}

export default Profile;
