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
  const { performance = [] } = useSelector((state) => state?.quiz || {});
  const { user = {} } = useSelector((state) => state?.user?.selectedUser || {});

  console.log(performance);

  console.log(user);

  const [successData, setSuccessData] = useState("");
  const [selectedOption, setSelectedOption] = useState("This week");

  const options = [
    "This week",
    "Last week",
    "This month",
    "Last month",
    "This Semester",
  ];

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
          userPerformance({ year: user?.year || "" })
        );

        console.log(response);
      }
    };

    getPerformance();
  }, [user?.year]);

  // Handle dropdown option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selecting an option
  };

  // Dummy data for different time periods (You can replace this with actual API data)
  const dataForTimePeriods = {
    "This week": {
      seriesData: [
        { name: "Your Performance", data: [45, 60, 50, 70, 80, 60, 75] },
        { name: "Year 1 Students", data: [50, 65, 55, 75, 85, 65, 78] },
      ],
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    "Last week": {
      seriesData: [
        { name: "Your Performance", data: [50, 65, 55, 72, 82, 68, 80] },
        { name: "Year 1 Students", data: [55, 70, 60, 78, 88, 72, 80] },
      ],
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    "This month": {
      seriesData: [
        { name: "Your Performance", data: [60, 70, 65, 80, 90, 85, 95] },
        { name: "Year 1 Students", data: [60, 72, 68, 85, 92, 88, 90] },
      ],
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    "Last month": {
      seriesData: [
        { name: "Your Performance", data: [55, 65, 70, 75] },
        { name: "Year 1 Students", data: [60, 72, 75, 78] },
      ],
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    "This Semester": {
      seriesData: [
        { name: "Your Performance", data: [60, 70, 80, 85, 90] },
        { name: "Year 1 Students", data: [65, 75, 80, 88, 92] },
      ],
      categories: ["Sept", "Oct", "Nov", "Dec", "Jan"],
    },
  };

  // Get the data based on selected option
  const { seriesData, categories } = dataForTimePeriods[selectedOption];

  const colors = ["#FF5733", "#3498DB"]; // Example colors for the chart

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

            <BellCurveGraph
              userScore={performance.userScore}
              meanScore={performance.meanScore}
              standardDeviation={performance.standardDeviation}
              zScore={performance.zScore}
              percentile={performance.percentile}
              performanceBands={performance.performanceBands}
              totalUsers={Number(performance.totalUsers)}
              allUser={Number(performance.betterThanUsers)}
              gaussianCurve={performance.gaussianCurve}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
