import React from "react";
import { GoogleAuthProvider } from "firebase/auth";

function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
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
