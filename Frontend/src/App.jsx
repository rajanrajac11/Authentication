import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

function App({ children }) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
