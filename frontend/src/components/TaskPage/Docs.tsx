import React from "react";
import { FaGreaterThanEqual } from "react-icons/fa";

interface DocsProps {}

export const Docs: React.FC<DocsProps> = () => {
  return (
    <div>
      <h6 className="mb-1 flex items-center gap-2">
        <FaGreaterThanEqual className="text-sm" />
        Docs
      </h6>
      <div>
        <h5 className="font-medium">Introduction</h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde omnis, veniam
          inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae earum beatae. Delectus.
        </p>
      </div>
      <div>
        <h5 className="font-medium">Part 2</h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde omnis, veniam
          inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae earum beatae. Delectus.
        </p>
      </div>
      <div>
        <h5 className="font-medium">Part 3</h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque architecto nam et nesciunt unde omnis, veniam
          inventore optio quam minima reiciendis? Possimus, similique iure aut ratione quae earum beatae. Delectus.
        </p>
      </div>
    </div>
  );
};
