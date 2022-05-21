import React from "react";
import { Navbar } from "../components/sections/Navbar";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";
import { Slogen } from "../components/sections/Slogen";

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Slogen />
      <Contact />
      <Footer />
    </div>
  );
};
