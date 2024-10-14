import React from "react";

const ResultsBar = ({ score, percentile }) => {
  const greenWidth = score; // score should be a percentage
  const redWidth = 100 - score; // remaining percentage for the red part of the bar

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8 mb-4  mx-auto">
      {/* Results Text */}
      <div className="text-[15px] font-medium mb-4">Results</div>
      <p className="text-center mx-auto text-[14px] mb-6 lg:max-w-lg">
        Your average score of<span className="font-bold"> {score}%</span> puts
        you on the {percentile}th percentile of users who are taking the exam.
      </p>

      {/* Dynamic Progress Bar */}
      <div className="w-full flex  bg-gray-300 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-l-full"
          style={{ width: `${greenWidth}%` }}
        ></div>
        <div
          className="bg-red-500 h-4 rounded-r-full"
          style={{ width: `${redWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ResultsBar;
