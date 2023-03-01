import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getData } from "../api";
import CustomInput from "./CustomInput";

const ResumeForm = () => {
  const dataStorage = localStorage.getItem("job_info")
    ? JSON.parse(localStorage.getItem("job_info"))
    : {};

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: dataStorage.name || "",
    position: dataStorage.position || "",
    linkedin: dataStorage.linkedin || "",
    positions: dataStorage.positions || [
      { position: "", duration: "", company: "" },
    ],
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleAddPosition = () => {
    setData({
      ...data,
      positions: [
        ...data.positions,
        { position: "", duration: "", company: "" },
      ],
    });
  };
  const handleDeletePosition = (i) => {
    const newPositions = data.positions.filter((item, index) => 1 !== index);
    setData({ ...data, positions: newPositions });
  };
  const handleUpdatePosition = (e, index) => {
    const { name, value } = e.target;
    const list = [...data.positions];
    list[index][name] = value;
    setData({ ...data, positions: list });
  };
 

  const remainderText = () => {
    let stringText = "";
    for (let i = 0; i < data.positions.length; i++) {
      stringText += `Can create a list of at least 3 responsibilities a ${
        data.positions[i].position
      } working at ${
        data.positions[i].company
      } would be in charge of doing, the list should be seperated by a numbers. Then write "The end" in a new line seperated from the list. Then proceed to create another numbered list for  ${
        i !== data.positions.length - 1 && data.positions[i + 1].company
      } `;
    }
    return stringText;
  };
  const JobText = () => {
    let stringText = "";
    for (let i = 0; i < data.positions.length; i++) {
      stringText += ``;
    }
    return stringText;
  };
  const saveToStorage = ({
    objective,
    jobResponsibilities,
    skills,
    hardSkills,
  }) => {
    const newData = {
      name: data.name,
      position: data.position,
      linkedin: data.linkedin,
      positions: data.positions,
      objective,
      jobResponsibilities,
      skills,
      hardSkills,
    };
    localStorage.setItem("job_info", JSON.stringify(newData));
  };
  const handleBuildData = async (e) => {
    e.preventDefault();
    //👇🏻 The job description prompt
    //prompt1
    const prompt1 = `I am writing a resume, my details are \n name: ${
      data.name
    } \n role: ${data.position} I have worked ${remainderText()}.
         \n. Can you write a 50 words description for the top of the resume (first person writing)?`;
    //prompt 2
    const prompt2 = `I am writing a resume, my details are \n name: ${
      data.name
    } \n role: ${data.position}. \n During my years I worked at ${
      data.positions.length
    } companies. ${remainderText()} \n Can you write me a list of soft skills seperated by numbers
         a person in this role will possess?.
         The list should be suitable for a resume (in first person)? Do not write 
         "The end" at the end of the list!!!`;
    //prompt3
    const prompt3 = `I am writing a resume, my details are \n name: ${
      data.name
    } \n role: ${data.position}. \n During my years I worked at ${
      data.positions.length
    } companies. ${remainderText()} \n ${JobText()}`;
    //prompt4
    const prompt4 = `I am writing a resume, my details are \n name: ${
      data.name
    } \n role: ${data.position}. \n During my years I worked at ${
      data.positions.length
    } companies. ${remainderText()} \n Can you write me a list seperated in numbers of 5 hard skills a person in this position should possess. The list should be suitable for a resume(in first person)? Do not write "the end" at the end of the list`;

    setLoading(true);
    try {
      const [hardSkills, skills, objective, jobResponsibilities] =
        await Promise.all([
          getData(prompt4),
          getData(prompt2),
          getData(prompt1),
          getData(prompt3),
        ]);
      //👇🏻 put them into an object
      const chatgptData = {
        objective,
        jobResponsibilities,
        skills,
        hardSkills,
      };
      console.log(chatgptData);
      saveToStorage(chatgptData);

      setLoading(false);
      navigate("/resume");
    } catch (Err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="animate-slide bg-gray-700 rounded-md w-3/2 p-4">
        <form action="" onSubmit={handleBuildData}>
          <CustomInput
            label={"Full Name"}
            name="name"
            value={data.name}
            className="block relative font-body mt-2 mb-[5px] text-[14px]"
            onChange={handleChange}
            placeholder={"First Name Last Name"}
            optional={false}
            type="text"
          />
          <CustomInput
            label={"Current position"}
            name="position"
            value={data.position}
            className="block relative font-body mt-2 mb-[5px] text-[14px]"
            onChange={handleChange}
            placeholder={"Full stack developer"}
            optional={false}
            type="text"
          />
          <CustomInput
            label={"LinkedIn URL"}
            name="linkedin"
            value={data.linkedin}
            className="block relative font-body mt-2 mb-[5px] text-[14px]"
            onChange={handleChange}
            placeholder={"https://linkedin.com/username"}
            optional={true}
            type="url"
          />
          <p className="text-[14px] border-t uppercase font-semibold border-gray-400 pt-2 text-gray-200 mt-4">
            Companies you have worked at
          </p>
          {data.positions.map((position, i) => (
            <div
              key={i}
              className="my-4 pt-2 border-t border-gray-400 flex flex-wrap items-end  gap-2"
            >
              <CustomInput
                label={"Company"}
                name="company"
                value={position.company}
                className="block relative font-body mb-[5px] text-[14px]"
                onChange={(e) => handleUpdatePosition(e, i)}
                placeholder={"Facebook"}
                optional={false}
                type="text"
              />
              <CustomInput
                label={"Position"}
                name="position"
                value={position.position}
                className="block relative font-body mb-[5px] text-[14px]"
                onChange={(e) => handleUpdatePosition(e, i)}
                placeholder={"Software developer"}
                optional={false}
                type="text"
              />
              <CustomInput
                label={"Duration"}
                name="duration"
                value={position.duration}
                className="block relative font-body mb-[5px] text-[14px]"
                onChange={(e) => handleUpdatePosition(e, i)}
                placeholder={"1 year and 6 months"}
                optional={false}
                type="text"
              />{" "}
              {i === data.positions.length - 1 && (
                <button
                  onClick={handleAddPosition}
                  class="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-cyan-600 rounded hover:bg-cyan-800 group"
                >
                  <span class="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span class="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                    Add
                  </span>
                </button>
              )}
              <button
                onClick={() => handleDeletePosition(i)}
                class="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
              >
                <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Delete
                </span>
              </button>
            </div>
          ))}
          <div className="w-full  flex justify-end">
            {" "}
            <button
              type="submit"
              class="relative mt-6 hover:translate-y-[2px] transition-all inline-flex items-center  justify-center p-4 px-8 w-3/2 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-teal-600 rounded-full blur-md ease"></span>
              <span class="absolute inset-0 w-full bg-teal-500 h-full transition duration-700  ease">
                <span class="absolute transition-all duration-700  ease group-hover:left-[13rem] bottom-0 left-0 w-[12rem] h-24 -ml-10 bg-[#5227C7] rounded-full blur-md"></span>
                <span class="absolute transition-all duration-700  ease group-hover:left-0 bottom-0 right-0 w-[12rem] h-24 -mr-10 bg-teal-400 rounded-full blur-md"></span>
              </span>
              <span class="relative text-white">
                {loading ? (
                  <p className="animate-pulse font-bold tracking-widest">
                    ...
                  </p>
                ) : (
                  "Submit"
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
