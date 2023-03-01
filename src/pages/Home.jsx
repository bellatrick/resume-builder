import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ResumeForm from "../components/ResumeForm";

const Home = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);

  return (
    <div className="bg-gray-800 max-w-[1800px] mx-auto font-body justify-around px-[15px] lg:px-[100px] flex-wrap flex items-center h-screen text-white">
      {!start && (
        <div className="animate-topslide lg:py-16 ">
          <p className="text-[30px] text-bold mb-4">Resume Builder</p>
          <h1 className="text-bold  text-gray-400 text-[18px]">
            Create an AI generated resume using Chat GPT
          </h1>
          <div className="flex gap-4  w-full flex-wrap">
            <button
              onClick={() => setStart(true)}
              class="relative  inline-flex items-center justify-center p-4 px-8 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span class="absolute top-0 left-0 w-20 h-40 -mt-10 -ml-3 transition-all duration-700 bg-teal-600 rounded-full blur-md ease"></span>
              <span class="absolute inset-0 w-full bg-teal-500 h-full transition duration-700  ease">
                <span class="absolute transition-all duration-700  ease group-hover:left-[8rem] bottom-0 left-0 w-[12rem] h-24 -ml-10 bg-[#5227C7] rounded-full blur-md"></span>
                <span class="absolute transition-all duration-700  ease group-hover:left-0 bottom-0 right-0 w-[10rem] h-24 -mr-10 bg-teal-400 rounded-full blur-md"></span>
              </span>
              <span class="relative text-white">Create resume</span>
            </button>
            <button
              onClick={() => navigate("/cover-letter")}
              className="  border-2 after:w-full  hover:border-indigo-700  transition-all border-teal-600 px-6 py-3 rounded-md"
            >
              Create cover letter
            </button>
          </div>
        </div>
      )}
      {start ? (
        <ResumeForm />
      ) : (
        <div>
          <img
            alt="gif"
            className="animate-topslide -mt-24 md:mt-12 max-h-[450px]"
            src="./gif3.gif"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
