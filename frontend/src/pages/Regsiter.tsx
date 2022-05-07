import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input, Label } from "../components/Form";

export const Register: React.FC = () => {
  return (
    <div className="flex justify-center pt-52">
      <form className="flex w-96 flex-col gap-4 rounded-lg border border-slate-300 p-8 shadow-sm">
        <h3 className="text-center text-3xl font-medium">Register</h3>
        <div className="w-full">
          <Label htmlFor="fname">First Name</Label>
          <Input type="text" id="fname" name="fname" placeholder="John" />
        </div>
        <div className="w-full">
          <Label htmlFor="lname">Last Name</Label>
          <Input type="text" id="lname" name="lname" placeholder="Doe" />
        </div>
        <div className="w-full">
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" name="email" placeholder="example@gmail.com" />
        </div>
        <div className="w-full">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" placeholder="***********" />
        </div>
        <p>
          have an account?{" "}
          <Link className="text-blue-600 underline" to="/login">
            Login
          </Link>
        </p>
        <Button>Submit</Button>
      </form>
    </div>
  );
};
