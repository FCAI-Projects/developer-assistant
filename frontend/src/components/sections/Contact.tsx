import React from "react";
import { Button } from "../Button";
import { Input, Label, Textarea } from "../Form";

export const Contact: React.FC = () => {
  return (
    <div className="container px-10 mx-auto">
        <p className="font-semibold text-2xl flex justify-center mt-4 mb-8">Contact Us</p>

        <div className="mb-[80px]">
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                    <div>
                        <Label children="Name" className="ml-1" />
                        <Input className="mt-1 mb-3" />
                    </div>

                    <div>
                        <Label children="Email" className="ml-1" />
                        <Input className="mt-1 mb-3" />
                    </div>

                    <div>
                        <Label children="Subject" className="ml-1" />
                        <Input className="mt-1 mb-3" />
                    </div>
                </div>

                <div>
                    <Label children="Message" className="ml-1" />
                    <Textarea className="h-[200px]" />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Button blue={true} className="w-[200px] mr-0" >
                    Send
                </Button>
            </div>
        </div>
    </div>
  );
};
