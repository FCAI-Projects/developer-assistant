import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../Button";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-cyan-800 py-2">
        <div className="container px-10 mx-auto flex justify-between items-center">
            <p className="font-bold text-lg text-white">
                Developer Assistant
            </p>

            <ul className="flex items-center space-x-5 text-white">
                <li>
                    <NavLink to="/" >Home</NavLink>
                </li>
                <li>
                    <NavLink to="/" >Features</NavLink>
                </li>
                <li>
                    <NavLink to="/" >Plans</NavLink>
                </li>
                <li>
                    <NavLink to="/" >Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/" >
                        <Button lightBlue={true} >Login</Button>
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>
  );
};
