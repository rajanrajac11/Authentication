import React from "react";
import { Outlet } from "react-router-dom";

function App({ children }) {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
