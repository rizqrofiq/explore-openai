import React from "react";
import { Navlink } from "../../components/Navlink";

const Navbar = () => {
  return (
    <nav className="w-full fixed px-24 py-5 text-white flex items-center justify-between  font-main">
      <h1 className="text-2xl">RIZQ.AI</h1>
      <ul className="flex space-x-6">
        <li>
          <Navlink title="Home" path="/" />
        </li>
        <li>
          <Navlink title="Try it" path="/playground" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
