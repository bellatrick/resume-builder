import React, { useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import ResumeHead from "../components/ResumeHead";
import ReactToPrint from "react-to-print";
const Resume = () => {
  const componentRef = useRef();
  const navigate = useNavigate();
  const dataStorage = localStorage.getItem("job_info")
    ? JSON.parse(localStorage.getItem("job_info"))
    : {};
  console.log(dataStorage.jobResponsibilities);
  useEffect(() => {
    if (Object.keys(dataStorage).length < 1) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  const replaceWithBr = (string) => {
    return string?.replace(/\n/g, "<br />");
  };
  return (
    <div ref={componentRef} className='my-8'>
      <p
        className="ml-5 mt-4 cursor-pointer font-body text-white hover:underline"
        onClick={() => navigate("/")}
      >
        Back
      </p>
      <div className="sm:w-[90%]  font-medium text-[14px] md:w-[70%] text-gray-900 font-body mx-auto  bg-white my-4 p-4">
        <div className=" ml-auto flex flex-col items-end justify-end">
          <p className="text-[22px] capitalize font-semibold text-gray-700">
            {dataStorage.name}
          </p>
          <p className="text-[14px] uppercase">{dataStorage.position}</p>
          <a
            href={dataStorage.linkedin}
            target="_blank"
            rel="noreferrer "
            className="text-cyan-500 underline"
          >
            Linkedin
          </a>
        </div>
        <ResumeHead text={"Bio"} />
        <p className="">{dataStorage.objective}</p>
        <ResumeHead text={"technical skills"} />
        <p
          dangerouslySetInnerHTML={{
            __html: replaceWithBr(dataStorage.hardSkills),
          }}
          className="-mt-8 font-normal"
        />
        <ResumeHead text={"soft skills"} />
        <p
          dangerouslySetInnerHTML={{
            __html: replaceWithBr(dataStorage.skills),
          }}
          className="-mt-8 font-normal"
        />
        <ResumeHead text={"professional experience"} />
        <div className="border  border-gray-400">
          {dataStorage.positions.map((item, i) => (
            <div className="">
              <div className="flex bg-gray-200 border-b mb-2 px-3 py-1 border-gray-500  justify-between ">
                <div className=" border-right ">
                  <p className="text-gray-900 capitalize text-[16px] font-semibold">
                    {item.position}
                  </p>
                  <p className="capitalize">{item.company}</p>
                </div>

                <p>{item.duration}</p>
              </div>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: replaceWithBr(
                      dataStorage.jobResponsibilities
                        ?.split("The end")
                        ?.slice(0, dataStorage.positions.length)[i]
                    ),
                  }}
                  className="-mt-8 font-normal px-2 py-2"
                />
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
      <ReactToPrint
        trigger={() => {
          return (
            <button className="bg-cyan-700 transition-all hover:translate-x-1 mb-7 cursor-pointer text-white px-6 py-2 rounded-2xl flex justify-self-center ml-2 sm:ml-14 mt-10">
              Print
            </button>
          );
        }}
        content={() => componentRef.current}
      />
    </div>
  );
};

export default Resume;
