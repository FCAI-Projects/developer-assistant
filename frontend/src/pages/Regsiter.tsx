import React from "react";
import { Input , Label } from "../components/Form";
import { Button } from "../components/Button";
export const Register: React.FC = () => {
  return <div className="flex justify-center pt-44 ">
  <form className="  box-border h-auto w-1/3
   p-8 rounded-lg border-solid border-2 border-sky-500 margin">
  <div className="relative z-0 mb-6 w-full group">
<Label>First Name</Label>
<Input itemType="text" className=""/>
  </div>
  <div className="relative z-0 mb-6 w-full group">
<Label>Last Name</Label>
<Input itemType="text"/>
  </div>
  <div className="relative z-0 mb-6 w-full group">
<Label>Password</Label>
<Input itemType="password"/>
  </div>
  <div className="relative z-0 mb-6 w-full group">
<Label>Email</Label>
<Input itemType="email"/>
  </div>
  <div className="relative z-0 mb-6 w-full group">
<Label>Phone</Label>
<Input itemType="phone"/>
  </div>
  <div className="relative z-0 mb-6 w-full group">
<Label>Company Name</Label>
<Input itemType="text"/>
  </div>
  <Button>Submit</Button>
</form>  
  
  </div>;
};
