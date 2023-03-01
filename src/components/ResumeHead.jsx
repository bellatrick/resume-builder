import React from "react";

const ResumeHead = ({text}) => {
  return (
    <div className="my-4 bg-gray-700 text-[14px] uppercase py-2 rounded-sm text-white px-2 font-semibold">
      {text}
    </div>
  );
};

export default ResumeHead;
