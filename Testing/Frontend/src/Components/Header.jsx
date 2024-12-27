import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "LogIn",
    path: "/login",
  },
];

function Header() {
  return (
    <>
      <div className="p-1 bg-slate-500">
        <nav className="flex  justify-around items-center">
          <div>
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <div>
            <ul className="flex  justify-between items-center gap-4 p-2 font-bold">
              {navItems.map((item, index) => (
                <li key={index} className="bg-green-200 p-2 rounded-md ">
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
