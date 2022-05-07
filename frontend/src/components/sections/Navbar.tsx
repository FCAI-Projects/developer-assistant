import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../Button";
import { FaBars, FaTimes } from "react-icons/fa";

export const Navbar: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleMenuBtn = () => {
    setShow(!show);
  };

  return (
    <nav className="bg-cyan-800 py-2">
      <div className="container mx-auto flex items-center justify-between px-10">
        <h1 className="z-20 text-2xl font-bold text-white md:z-0">Developer Assistant</h1>

        <div className="flex items-center">
          <div className="flex items-center justify-between md:order-2 md:mt-1">
            <button
              data-collapse-toggle="mobile-menu"
              onClick={handleMenuBtn}
              type="button"
              className=" inline-flex items-center text-white  hover:text-gray-300 focus:outline-none md:hidden"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {show ? <FaTimes className="z-20 h-8 w-8" /> : <FaBars className="h-8 w-8" />}
            </button>
          </div>

          <div
            className="absolute top-0 right-0 hidden w-full md:static md:right-20 md:flex md:items-center  md:justify-end "
            id="mobile-menu"
          >
            <ul className="flex flex-col items-center justify-center gap-6 bg-cyan-800 text-white md:flex-row md:items-center md:pt-0 md:text-sm md:font-medium">
              <li>
                <NavLink className="block text-white hover:bg-cyan-700 md:border-0 md:hover:bg-transparent" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="block text-white hover:bg-cyan-700 md:border-0 md:hover:bg-transparent" to="/">
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink className="block text-white hover:bg-cyan-700 md:border-0 md:hover:bg-transparent" to="/">
                  Plans
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block text-white hover:bg-cyan-700 md:border-0 md:hover:bg-transparent"
                  to="contact"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="ml-1 block py-1 pb-14 text-white hover:bg-cyan-700 md:border-0 md:pb-0 md:hover:bg-transparent"
                  to="login"
                >
                  <Button lightBlue={true}>Login</Button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
