// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-9ddd6.firebaseapp.com",
  projectId: "mern-auth-9ddd6",
  storageBucket: "mern-auth-9ddd6.firebasestorage.app",
  messagingSenderId: "421157884518",
  appId: "1:421157884518:web:1951ab35a2c4e021a193a7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
