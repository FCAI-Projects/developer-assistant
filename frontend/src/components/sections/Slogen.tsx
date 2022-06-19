import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Button } from "../Button";
import SolgenImg from "../../images/slogen.svg";

export const Slogen: React.FC = () => {
  return (
    <section>
      <div className="bg-cyan-800">
        <div className="container mx-auto px-10 pt-16 pb-6 font-bold capitalize leading-snug text-white sm:text-lg md:text-3xl">
          <div className="flex justify-between">
            <div className="mt-8">
              <p>Your best Assistant to</p>
              <p className="ml-14">Organize your projects</p>
              <NavLink to="register" >
                <Button
                  className="flex justify-center items-center w-44 mt-8 font-bold text-lg"
                  lightBlue
                >
                  Get Started
                  <FaArrowRight className="ml-2 font-extrabold" />
                </Button>
              </NavLink>
            </div>
            <img 
              className="w-96 mr-6 pb-6"
              src={SolgenImg} 
              alt="Team collaboration"
            />
          </div>
        </div>
      </div>
      <div className="h-0 w-0 border-l-[96vw] border-b-[80px] border-l-cyan-800 border-b-white bg-cyan-800"></div>
    </section>
  );
};
