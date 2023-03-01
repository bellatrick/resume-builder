import React, { useState } from "react";
import { toast } from "react-toastify";
import { getData } from "../api";

const CoverLetterForm = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const prompt = `I am applying for a job and these are the job requirements and responsibilities for the role; ${input}.
     Write a professional cover letter to apply for the job role in the first person pronoun`;
    try {
      const result = await getData(prompt);
      setCoverLetter(result);
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    toast.info("Cover letter has been copied");
    console.log(coverLetter)
  };
  return (
    <div className="flex flex-wrap font-body my-10 max-w-[90%] md:w-[80%] mx-auto mt-40 justify-between items-center">
      <div className="bg-gray-600 md:basis-[45%] max-w-[90%] mx-auto w-full  rounded-md  p-2">
        <form onSubmit={handleSubmit} className="">
          <label className="text-white py-2" htmlFor="">
            Enter job description and role type
          </label>
          <textarea
            className=" w-full p-2 mx-auto appearance-none focus:outline-none rounded-sm focus:ring-primary1 focus:border-2 focus:border-primary1"
            value={input}
            rows="10"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="We are looking for a qualified Front-end developer to join our IT team. You will be responsible for"
          />
          <div>
            {" "}
            <button className="bg-cyan-600 text-white px-4 py-2 rounded-md transition hover:translate-x-1">
              {loading ? (
                <p className="animate-pulse font-bold">...</p>
              ) : (
                <p>Submit</p>
              )}
            </button>
          </div>
        </form>
      </div>
      {coverLetter.length > 0 && (
        <div className="md:basis-[45%] mx-auto max-w-[90%]">
          <div
            onClick={handleCopy}
            className="flex cursor-pointer items-end justify-end text-sm text-primary1 p-2 hover:underline "
          >
            Copy
          </div>
          <div className="p-4 text-medium  text-white border-2 border-cyan-600 rounded-md">
            {coverLetter}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterForm;
