import React from "react";
import { Button } from "../Button";
import { Input, Label, Textarea } from "../Form";

export const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-10" id="contact">
      <p className="mt-6 mb-8 flex justify-center text-2xl font-semibold">Contact Us</p>

      <div className="mb-[80px]">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" />
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input type="text" id="subject" name="subject" />
            </div>
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea className="h-[210px] resize-none" id="message" name="message"></Textarea>
          </div>
        </div>

        <div className="mt-4 flex justify-center md:justify-end">
          <Button className="mt-4 w-full md:w-[200px]">Send</Button>
        </div>
      </div>
    </div>
  );
};
