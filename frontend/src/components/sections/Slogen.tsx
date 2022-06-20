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
              <p className="">Organize your projects</p>
              <NavLink to="register">
                <Button className="mt-8 flex w-44 items-center justify-center text-lg font-medium" lightBlue>
                  Get Started
                  <FaArrowRight className="ml-2 font-extrabold" />
                </Button>
              </NavLink>
            </div>
            <img className="mr-6 w-96 pb-6" src={SolgenImg} alt="Team collaboration" />
          </div>
        </div>
      </div>
      <div className="h-0 w-0 border-l-[96vw] border-b-[80px] border-l-cyan-800 border-b-white bg-cyan-800"></div>
    </section>
  );
};
