import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";

function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(loginSuccess(data));
    } catch (error) {
      console.log("Couldn't login with google.");
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="w-full rounded-xl text-white bg-blue-500 p-2 hover:opacity-95 "
    >
      Continue With Google
    </button>
  );
}

export default OAuth;
