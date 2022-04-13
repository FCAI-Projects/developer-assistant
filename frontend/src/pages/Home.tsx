import React from "react";
import { Navbar } from "../components/sections/Navbar";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";

export const Home: React.FC = () => {
  return (
    <>
      <Navbar/>

      <div>
        <div className="bg-cyan-800">
          <p className="text-white text-3xl font-bold container mx-auto px-10 pt-16 pb-8 leading-snug">
            Your best Assistant to 
            <br/>
            Organize your projects
          </p>
        </div>
        <div className="bg-cyan-800 border-l-cyan-800 border-l-[100vw] border-b-white border-b-[80px]"></div>
      </div>

      <Contact />
      <Footer />
    </>
  );
};
