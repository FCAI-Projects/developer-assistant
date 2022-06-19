import React from "react";
import { Navbar } from "../components/sections/Navbar";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";
import { Slogen } from "../components/sections/Slogen";
import { Features } from "../components/sections/Features";

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Slogen />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};
