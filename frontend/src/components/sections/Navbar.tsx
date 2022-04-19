import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../Button";
import { FaBars, FaTimes } from 'react-icons/fa';


export const Navbar: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleMenuBtn = () => {
    setShow(!show);
  };

  return (
    <nav className="bg-cyan-800 py-2">
        <div className="container mx-auto flex justify-between px-10">
            <p className="font-bold text-lg text-white z-20 mt-1 md:z-0">
                Developer Assistant
            </p>

            <div className="flex items-center">
                <div className="flex justify-between md:mt-1 md:order-2">
                    <button data-collapse-toggle="mobile-menu" onClick={handleMenuBtn} type="button" className=" text-white inline-flex items-center  md:hidden hover:text-gray-300 focus:outline-none" aria-controls="mobile-menu" aria-expanded="false">
                        { show ? <FaTimes className="w-8 h-8 z-20" /> : <FaBars className="w-8 h-8" /> }
                    </button>
                </div>

                <div className="hidden absolute top-0 right-0 w-full md:flex md:justify-end md:right-20" id="mobile-menu">
                    <ul className="flex flex-col items-center justify-center bg-cyan-800 text-white pt-16 md:pt-0 md:flex-row md:space-x-6 md:text-sm md:font-medium">
                        <li>
                            <NavLink 
                                className="block text-white hover:bg-cyan-700 md:hover:bg-transparent md:border-0 py-1 my-1" 
                                to="/" 
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className="block text-white hover:bg-cyan-700 md:hover:bg-transparent md:border-0 py-1 my-1" 
                                to="/" 
                            >
                                Features
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className="block text-white hover:bg-cyan-700 md:hover:bg-transparent md:border-0 py-1 my-1"
                                to="/" 
                            >
                                Plans
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className="block text-white hover:bg-cyan-700 md:hover:bg-transparent md:border-0 py-1 my-1"
                                to="contact" 
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className="block text-white hover:bg-cyan-700 md:hover:bg-transparent md:border-0 py-1 my-1 pb-14 ml-1 md:pb-0"
                                to="login" 
                            >
                                <Button lightBlue={true} >Login</Button>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
  );
};
