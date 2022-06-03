import React, { useMemo } from "react";
import { FaGreaterThanEqual, FaPause, FaPlay, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import { Button } from "../../components/Button";
import { Textarea } from "../../components/forms";

export const Task: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between gap-5">
        <div className="flex basis-4/6 flex-col gap-3">
          <header>
            <h2 className="text-3xl font-bold">Task</h2>
          </header>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde omnis,
              veniam inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae earum beatae.
              Delectus.
            </p>
          </div>
          <div>
            <h6 className="mb-1 flex items-center gap-2">
              <FaGreaterThanEqual className="text-sm" />
              Docs
            </h6>
            <div>
              <h5 className="font-medium">Introduction</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde omnis,
                veniam inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae earum beatae.
                Delectus.
              </p>
            </div>
            <div>
              <h5 className="font-medium">Part 2</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde omnis,
                veniam inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae earum beatae.
                Delectus.
              </p>
            </div>
            <div>
              <h5 className="font-medium">Part 3</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde omnis,
                veniam inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae earum beatae.
                Delectus.
              </p>
            </div>
          </div>
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde
                    omnis, veniam inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae
                    earum beatae. Delectus.
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde
                    omnis, veniam inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae
                    earum beatae. Delectus.
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-2 rounded-3xl rounded-br-none bg-slate-100 px-3 py-4">
                <Textarea className="w-full resize-none" placeholder="Write your comment" />
                <Button lightGreen>Send</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex basis-2/6 flex-col gap-4">
          <div className="flex items-center gap-5">
            <Button lightBlue className="flex items-center gap-2">
              <FaPlay />
              Start Tracking
            </Button>
            <span>You spend 3 Hour and 40 Minutes Until Now</span>
          </div>
          <div className="flex items-center gap-5">
            <Button lightYellow className="flex items-center gap-2">
              <FaPause />
              Stop Tracking
            </Button>
            <span className="text-xl font-medium">03:33:39</span>
          </div>
          <div className="flex flex-col gap-5 rounded-lg bg-slate-900 p-3 text-white">
            <p>
              Deadline is <span className="font-medium">3/7/2022</span>{" "}
              <span className="text-green-600">[left 3 Days, 17 Hour, and 7 Minutes]</span>
            </p>
          </div>
          <div className="flex flex-col gap-5 rounded-lg bg-slate-900 p-3 text-white">
            <p>
              Deadline is <span className="font-medium">3/7/2022</span>{" "}
              <span className="text-yellow-600">[left 3 Days, 17 Hour, and 7 Minutes]</span>
            </p>
          </div>
          <div className="flex flex-col gap-5 rounded-lg bg-slate-900 p-3 text-white">
            <p>
              Deadline is <span className="font-medium">3/7/2022</span>{" "}
              <span className="text-red-600">[Times out 17 Hour, and 7 Minutes ago]</span>
            </p>
          </div>
          <Button light>Set/Update Deadline</Button>
          <div className="flex flex-col gap-5">
            <header className="flex items-center justify-between">
              <h6 className="mb-1 flex items-center gap-2">
                <FaGreaterThanEqual className="text-sm" />
                Assign
              </h6>
              <Button lightBlue className="px-2 py-2 text-xs text-blue-500">
                <FaPlus />
              </Button>
            </header>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <h6 className="text-lg">John Doe</h6>
                <Button lightRed className="ml-auto px-2 py-2 text-xs">
                  <FaTrash />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <h6 className="text-lg">John Doe</h6>
                <Button lightRed className="ml-auto px-2 py-2 text-xs">
                  <FaTrash />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <h6 className="mb-1 flex items-center gap-2">
              <FaGreaterThanEqual className="text-sm" />
              Private Notes
            </h6>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis harum iste tempora nulla illo dolorem ut
              reiciendis doloremque asperiores maiores?
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex items-center justify-between rounded-lg bg-slate-700 px-2 py-4 text-white">
              Text File
              <span className="text-sm">14 MB</span>
            </button>
            <button className="flex items-center justify-between rounded-lg bg-slate-700 px-2 py-4 text-white">
              Text File
              <span className="text-sm">14 MB</span>
            </button>
            <button className="flex items-center justify-between rounded-lg bg-slate-700 px-2 py-4 text-white">
              Text File
              <span className="text-sm">14 MB</span>
            </button>
            <button className="flex items-center justify-between rounded-lg bg-slate-700 px-2 py-4 text-white">
              Text File
              <span className="text-sm">14 MB</span>
            </button>
            <div className="flex justify-end">
              <button className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-slate-300">
                <FaUpload />
                Upload File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
