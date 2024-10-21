import React, { useState } from "react";
import Button from "./Button";
import { FaCheck, FaTimes } from "react-icons/fa";
import ResultsBar from "../components/ResultBar"; // Import the updated ResultsBar component
import { SlArrowRight } from "react-icons/sl";

const Summary = () => {
  const [questions] = useState([
    {
      question: "A 54-year-old man has this and that...",
      details: "Cras sit amet nibh libero, in gravida nulla...",
    },
    {
      question: "A 25-year-old female presents with...",
      details: "Nulla facilisi. Curabitur dapibus enim sit amet...",
    },
    {
      question: "A child with fever and rash...",
      details: "Etiam porta sem malesuada magna mollis euismod...",
    },
  ]);

  const categories = [
    { name: "All", progress: "132 of 265", progressPercentage: 50 },
    { name: "Cat 1", progress: "23 of 23", progressPercentage: 35 },
    { name: "Cat 2", progress: "23 of 23", progressPercentage: 65 },
    { name: "Cat 3", progress: "23 of 23", progressPercentage: 65 },
  ];

  // Array representing the user's scores (correct = true, incorrect = false)
  const scores = [
    { correct: true },
    { correct: false },
    { correct: true },
    { correct: false },
    { correct: true },
    { correct: true },
    { correct: false },
    { correct: true },
    { correct: false },
    { correct: true },
  ];

  return (
    <div className="bg-[#ECEFF7] h-lvh">
      <div className="container max-w-screen-xl mx-auto px-4 py-8 pb-40">
        <div className="flex flex-wrap mt-14 lg:flex-nowrap justify-between">
          {/* Main Content */}
          <div className="lg:w-[70%] w-full">
            <div className="text-[#3A57E8] text-title-md font-bold">
              Test Name
            </div>
            {/* ResultsBar Component */}
            <ResultsBar score={61.5} percentile={85} />{" "}
            {/* Pass score and percentile dynamically */}
            <div className="lg:col-span-2 mt-auto bg-white rounded-lg border border-[#E6E9EC] p-9">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-title-sm text-primary font-semibold">
                  Categories
                </h2>
                <h2 className="text-[13px] text-primary font-bold">
                  Question Attempted
                </h2>
              </div>
              <div className="bg-white ">
                <div className="grid ">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-[#DEE2E6]"
                    >
                      {/* Parent div with background color based on progress */}
                      <div
                        className="flex items-center justify-between w-full"
                        style={{
                          background: `linear-gradient(to right, #E1FFBA ${category.progressPercentage}%, #FFE8E8 ${category.progressPercentage}%)`,
                        }}
                      >
                        {/* Left div: Checkbox and Category Name (50% width) */}
                        <div className="flex items-center py-3 px-4 w-1/2">
                          <input
                            type="checkbox"
                            className="mr-3 cursor-pointer"
                          />
                          <span className="text-[14px] text-primary">
                            {category.name}
                          </span>
                        </div>

                        {/* Right div: Progress display (50% width) */}
                        <div className="py-3 px-4 w-1/2 flex justify-end">
                          <span className="text-white text-[10px] font-semibold bg-[#9C9C9C] px-2 py-1 rounded-md">
                            {category.progress}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-7">
              <Button
                text="Continue"
                type="submit"
                rightIcon={SlArrowRight}
                rightIconStyle="text-white "
                className="bg-[#3A57E8] text-title-p rounded-[4px] border text-white font-normal py-2 px-6 focus:outline-none"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[12%] w-fit bg-white border border-[#7749F8] rounded-xl lg:mr-4 mb-4 lg:mb-0 self-start">
            <div className="text-[#575757] bg-[#F8F9FA] border-b border-[#DEE2E6] rounded-xl text-center py-4 text-title-p px-4 font-semibold">
              Score: 50%
            </div>
            <div className="mt-4 px-6 text-center mx-auto pb-7">
              <div className="overflow-y-auto max-h-32">
                {/* Set a max height */}
                <ul className="space-y-2 mx-auto">
                  {scores.map((score, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-4 space-x-2 justify-center"
                    >
                      <span>{index + 1}</span>
                      <span>
                        {score.correct ? (
                          <FaCheck className="text-[#95cb7c]" />
                        ) : (
                          <FaTimes className="text-[#FF5C5C]" />
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
