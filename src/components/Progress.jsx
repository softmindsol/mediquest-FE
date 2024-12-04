import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import GaugeChart from "../components/charts/GaugeChart";
import {
  userPerformance,
  userSuccess,
} from "../store/features/quiz/quiz.service";
import BellCurveGraph from "./charts/BellCurveGraph";

const Progress = () => {
  const dispatch = useDispatch();

  const { user = {} } = useSelector((state) => state?.user?.selectedUser || {});
  const userType = user?.userType?.plan === "FREE";

  const { successData = "", performance = {} } = useSelector(
    (state) => state?.quiz || {}
  );
  const data = performance || {};
  const options = [
    { value: "thisWeek", label: "This Week" },
    { value: "lastWeek", label: "Last Week" },
    { value: "thisMonth", label: "This Month" },
    { value: "lastMonth", label: "Last Month" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOptionChanged, setIsOptionChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getUserSuccessRate = async () => {
      await dispatch(userSuccess());
    };
    if (!successData) {
      getUserSuccessRate();
    }
  }, [dispatch, successData]);

  useEffect(() => {
    const getPerformance = async () => {
      if (user?.year && Object.keys(performance).length === 0) {
        await dispatch(
          userPerformance({
            year: user?.year || "",
          })
        );
        setIsOptionChanged(false);
      }
    };

    if (!userType) {
      getPerformance();
    }
  }, [user?.year]);

  const allGrades = data[selectedOption?.value]?.grades || [];
  const userGrade = data[selectedOption?.value]?.userGrade || "0";

  const handleOptionClick = (option) => {
    if (option.value !== selectedOption.value) {
      setSelectedOption(option);
      setIsOptionChanged(true);
    }
    setIsOpen(false);
  };

  return (
    <>
      <h2 className="mt-10 mb-6 text-2xl font-semibold text-primary">
        Progress
      </h2>

      <div className="p-5 bg-white rounded-xl mb-30">
        {!userType && (
          <div className="relative flex justify-end pr-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white border flex border-[#007AFF] text-[#007AFF] font-semibold text-[12px] px-4 items-center gap-2 py-2 rounded-md"
            >
              {selectedOption.label}
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
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="grid justify-center grid-cols-1 gap-6 mt-10 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            <div className="text-center">
              <h1 className="text-[#343A40] text-base leading-[24.2px] font-semibold">
                Performance
              </h1>
              {successData && <GaugeChart series={[successData]} />}
            </div>
          </div>

          <div className="lg:w-full">
            <h3 className="text-[#343A40] text-title-sm font-semibold">
              Performance compared to Year 1 students
            </h3>
            {!userType ? (
              <>
                <BellCurveGraph allGrades={allGrades} userGrade={userGrade} />
              </>
            ) : (
              <p className="font-semibold mt-4 text-[#343A40]">
                Not available for your plan
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
