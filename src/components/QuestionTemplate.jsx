import React, { useState } from "react";
import Button from "./Button";

const QuestionTemplate = () => {
  // State to manage multiple questions
  const [questions] = useState([
    {
      question:
        "A 54-year-old man has this and that and 49 mg of that, rushing to the ER because of something. Lay yre7mo.",
      details:
        "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condiment≈faucibus.",
      correctAnswer: 0,
    },
    {
      question: "A 25-year-old female presents with...",
      details:
        "Nulla facilisi. Curabitur dapibus enim sit amet erat fringilla, in ullamcorper quam vestibulum.",
      correctAnswer: 2,
    },
    {
      question: "A child with fever and rash...",
      details:
        "Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis.",
      correctAnswer: 1,
    },
  ]);

  const categories = [
    { name: "An item" },
    { name: "An item" },
    { name: "An item" },
    { name: "An item" },
    { name: "An item" },
  ];

  // State to track current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // State to track selected answers and score
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [scores, setScores] = useState(Array(questions.length).fill(null));

  // Handle answer selection
  const handleOptionChange = (index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(updatedAnswers);

    // Update the score for the current question
    const updatedScores = [...scores];
    if (index === questions[currentQuestionIndex].correctAnswer) {
      updatedScores[currentQuestionIndex] = "✔";
    } else {
      updatedScores[currentQuestionIndex] = "✘";
    }
    setScores(updatedScores);
  };

  // Handle navigation between questions
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl grid grid-cols-12 gap-6 p-8">
      {/* Left Sidebar: Score Box */}
      <div className=" md:col-span-2 bg-white border border-[#7749F8] p-4 rounded-md">
        <div className="text-gray-500 text-lg">Score</div>
        <div className="mt-4">
          <ul className="space-y-2">
            {scores.map((score, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span>{index + 1}</span>
                <span>{score || "-"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content: Question & Details */}
      <div className="col-span-12 md:col-span-7 bg-white shadow-md p-8 rounded-md">
        {/* Navigation Buttons */}
        <div className="flex justify-between mb-10">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="bg-white border border-[#E9ECEF] text-secondary rounded-[4px] py-2 px-8 hover:bg-gray-100 focus:outline-none"
          >
            Prev
          </button>
          <span className="bg-[#3A57E8] text-title-p rounded-[4px] border text-white font-normal py-2 px-6 focus:outline-none ">
            {currentQuestionIndex + 1} of {questions.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className="bg-white border border-[#E9ECEF] text-secondary rounded-[4px] py-2 px-8 hover:bg-gray-100 focus:outline-none"
          >
            Next
          </button>
        </div>

        {/* Question */}
        <div className="my-6 mt-6">
          <h2 className="text-lg font-bold">
            {questions[currentQuestionIndex].question}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {questions[currentQuestionIndex].details}
          </p>
        </div>

        {/* Left Column - Categories */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-md font-semibold mb-2">
            Select one of the following options:
          </h3>
          {/* Categories Section */}
          <div className=" bg-white rounded-lg border border-[#E6E9EC] ">
            <div className="grid gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-[#DEE2E6] py-2 px-4"
                >
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-[14px] text-primary">
                      {category.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-15">
            <Button
              text="Submit answer"
              type="submit" // Ensure the button type is submit
              className="bg-[#3A57E8] text-title-p rounded-[4px] border text-white font-normal py-2 px-6 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar: Reference Ranges */}
      <div className="col-span-12 md:col-span-3 bg-white shadow-md p-4 rounded-md">
        <div className="text-lg font-semibold mb-4">Reference Ranges</div>

        {/* Reference ranges */}
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-700">Full blood count</h4>
            <ul className="text-sm text-gray-500">
              <li>Haemoglobin: Men: 135-180 g/L, Women: 115-160 g/L</li>
              <li>Mean cell volume: 82-100 fL</li>
              <li>Platelets: 150-400 * 10^9/L</li>
              <li>White blood cells: 4.0-11.0 * 10^9/L</li>
              <li>Neutrophils: 2.0-7.0 * 10^9/L</li>
              <li>Lymphocytes: 1.0-3.5 * 10^9/L</li>
              <li>Eosinophils: 0.1-0.4 * 10^9/L</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTemplate;
