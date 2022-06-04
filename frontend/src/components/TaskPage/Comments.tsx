import React from "react";
import { FaGreaterThanEqual } from "react-icons/fa";
import { Button } from "../Button";
import { Textarea } from "../forms";

interface CommentsProps {}

export const Comments: React.FC<CommentsProps> = () => {
  return (
    <div>
      <h6 className="mb-1 flex items-center gap-2">
        <FaGreaterThanEqual className="text-sm" />
        Comments
      </h6>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 rounded-3xl rounded-br-none bg-slate-200 px-3 py-4">
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
              alt=""
              className="h-12 w-12 rounded-full"
            />
          </div>

          <div className=" px-2">
            <header className="flex items-center justify-between">
              <h6 className="font-medium">John Doe</h6>
              <span>15:00</span>
            </header>
            <p className="text-slate-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde omnis,
              veniam inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae earum beatae.
              Delectus.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 rounded-3xl rounded-br-none bg-slate-200 px-3 py-4">
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              alt=""
              className="h-12 w-12 rounded-full"
            />
          </div>

          <div className="px-2">
            <header className="flex items-center justify-between">
              <h6 className="font-medium">John Doe</h6>
              <span>15:00</span>
            </header>
            <p className="text-slate-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde omnis,
              veniam inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae earum beatae.
              Delectus.
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2 rounded-3xl rounded-br-none bg-slate-100 px-3 py-4">
          <Textarea className="w-full resize-none" placeholder="Write your comment" />
          <Button lightGreen>Send</Button>
        </div>
      </div>
    </div>
  );
};
