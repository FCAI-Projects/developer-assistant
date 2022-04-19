import React from "react";
import { Input , Label } from "../components/Form";
import { Button } from "../components/Button";
export const Login: React.FC = () => {
  return <div className="flex justify-center pt-52">
   <form className=" box-border h-auto w-96 p-8 rounded-lg border-solid border-2 border-sky-500 margin" >
     <div className="relative z-0 mb-6 w-full group">
      <Label >E-mail</Label>
       <Input itemType="email" placeholder="example@gmail.com"></Input>
     </div>
     <div className="relative z-0 mb-6 w-full group">
      <Label>Password</Label>
       <Input itemType="password" placeholder="***********"></Input>
     </div>
   
  <div className="flex items-start mb-6">
    <div className="flex items-center h-5">
      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 " required></input>
    </div>
    <div className="ml-3 text-sm">
      <Label>Remmber me</Label>
    </div>
  </div>
 <Button>Submit</Button>
</form>


  </div>;
};
