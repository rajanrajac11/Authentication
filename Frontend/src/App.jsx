import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Register</h1>
      <form action="">
        <input type="text" placeholder="Enter name" />
        <br />
        <input type="email" placeholder="Enter email" />
        <br />
        <input type="password" placeholder="Enter password" />
        <br />
        <input type="submit" name="" id="" />
      </form>
    </div>
  );
}

export default App;
