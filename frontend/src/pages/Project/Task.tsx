import React, { useMemo } from "react";
import { FaGreaterThanEqual, FaPause, FaPlay, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import { Button } from "../../components/Button";
import { Textarea } from "../../components/forms";
import { AssignMember } from "../../components/TaskPage/AssignMember";
import { Attachments } from "../../components/TaskPage/Attachments";
import { Comments } from "../../components/TaskPage/Comments";
import { Deadline } from "../../components/TaskPage/Deadline";
import { Docs } from "../../components/TaskPage/Docs";
import { PrivateNote } from "../../components/TaskPage/PrivateNote";
import { TimeTracking } from "../../components/TaskPage/TimeTracking";

export const Task: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between gap-5">
        <div className="flex basis-4/6 flex-col gap-5">
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
          <Docs />
          <Comments />
        </div>
        <div className="flex basis-2/6 flex-col gap-5">
          <TimeTracking />
          <Deadline />
          <AssignMember />
          <PrivateNote />
          <Attachments />
        </div>
      </div>
    </div>
  );
};
