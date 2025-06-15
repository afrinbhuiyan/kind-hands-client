import React from "react";
import { CircleLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <CircleLoader color={"#024870"} />
    </div>
  );
};

export default Spinner;
