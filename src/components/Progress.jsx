import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import GaugeChart from "../components/charts/GaugeChart"; // Make sure the path is correct
import {
  userPerformance,
  userSuccess,
} from "../store/features/quiz/quiz.service";
import BellCurveGraph from "./charts/BellCurveGraph";

const Progress = () => {
  const dispatch = useDispatch();
 

  const { user = {} } = useSelector((state) => state?.user?.selectedUser || {});

  const [successData, setSuccessData] = useState("");
  const [selectedOption, setSelectedOption] = useState("thisWeek");
  const options = ["thisWeek", "lastWeek", "thisMonth", "lastMonth"];

  useEffect(() => {
    const getUserSuccessRate = async () => {
      const response = await dispatch(userSuccess());
      if (response.type === "userSuccess/fulfilled") {
        setSuccessData(response.payload.data);
      }
    };

    getUserSuccessRate();
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getPerformance = async () => {
      if (user?.year) {
        const response = await dispatch(
          userPerformance({
            year: user?.year || "",
            timePeriod: selectedOption,
          })
        );
      }
    };

    getPerformance();
  }, [user?.year, selectedOption]);

  // Handle dropdown option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selecting an option
  };

  return (
    <>
      <h2 className="mt-10 mb-6 text-2xl font-semibold text-primary">
        Progress
      </h2>

      <div className="p-5 bg-white rounded-xl mb-30">
        {/* Time Filter Dropdown */}
        <div className="relative flex justify-end pr-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white border flex border-[#007AFF] text-[#007AFF] font-semibold text-[12px] px-4 items-center gap-2 py-2 rounded-md"
          >
            {selectedOption}
            <GoChevronDown size={20} className="text-[#007AFF]" />
          </button>

          {isOpen && (
            <div className="absolute mt-11 right-1 bg-white border border-[#E4E6EF] rounded-md shadow-lg w-[10%] z-40">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="px-4 py-2 text-[#007AFF] hover:bg-[#F3F6F9] cursor-pointer text-[12px] font-medium"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Container */}
        <div className="grid justify-center grid-cols-1 gap-6 mt-10 lg:grid-cols-2">
          {/* Left side: Two circular charts */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            <div className="text-center">
              <GaugeChart series={[successData]} />
              <p className="text-[#8D8D8D] font-semibold text-sm mt-4 ">
                Performance NOT adjusted to question difficulty
              </p>
            </div>
          </div>

          {/* Right side: SplineChart comparison */}
          <div className="lg:w-full">
            <h3 className="text-[#343A40] text-title-sm font-semibold">
              Performance compared to Year 1 students
            </h3>

            <BellCurveGraph />
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
