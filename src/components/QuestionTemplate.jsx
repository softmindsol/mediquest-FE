import React, { useEffect, useState } from "react";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { FaCheck, FaPlus, FaRegCommentDots } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { getQuizQuesitons } from "../store/features/quiz/quiz.service";

const QuestionTemplate = () => {
  // State to manage multiple questions
  const [questions] = useState([
    {
      question:
        "A 54-year-old man has this and that and 49 mg of that, rushing to the ER because of something. Lay yre7mo.",
      details:
        "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condiment≈faucibus.",
    },
    {
      question: "A 25-year-old female presents with...",
      details:
        "Nulla facilisi. Curabitur dapibus enim sit amet erat fringilla, in ullamcorper quam vestibulum.",
    },
    {
      question: "A child with fever and rash...",
      details:
        "Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis.",
    },
  ]);

  const categories = [
    { name: "An item" },
    { name: "An item" },
    { name: "An item" },
    { name: "An item" },
    { name: "An item" },
  ];
  const suggestions = [
    "Not relevant for the exam",
    "Explanation not adequate",
    "Wrong category",
    "Not in keeping with current guidelines",
    "Spelling/grammar problems",
  ];

  // State to track current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const pageNo = parseInt(params.get("pageNo")) || 1;
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setParams({ pageNo: pageNo + 1 }); // Update URL with next page number
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setParams({ pageNo: pageNo - 1 }); // Update URL with previous page number
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await dispatch(getQuizQuesitons({ pageNo, id }));
      console.log("🚀 ~ fetchQuestions ~ res:", res);
    };

    fetchQuestions();
  }, [pageNo, dispatch]);

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

  // State to handle the visibility of the "Improve this question" section
  const [showImproveSection, setShowImproveSection] = useState(false);

  // State to store the value of the textarea
  const [suggestionText, setSuggestionText] = useState("");

  // Toggle the Improve Section
  const handleToggle = () => {
    setShowImproveSection(!showImproveSection);
  };

  // Function to append the button text to the textarea
  const addSuggestion = (text) => {
    setSuggestionText((prevText) => (prevText ? `${prevText}, ${text}` : text));
  };
  return (
    <>
      <div className="bg-[#ECEFF7] h-fill">
        <div className="container max-w-screen-xl px-4 py-8 pb-40 mx-auto ">
          {/* Main Flex Container */}
          <div className="flex flex-wrap justify-between lg:flex-nowrap">
            <div className="lg:w-[70%] w-full bg-white shadow-md p-8 rounded-md">
              {/* Navigation Buttons */}
              <div className="flex justify-between mb-10">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="bg-white border border-[#E9ECEF] text-secondary rounded-[4px] py-2 px-8 hover:bg-gray-100 focus:outline-none"
                >
                  Prev
                </button>
                <span className="bg-[#3A57E8] text-title-p rounded-[4px] border text-white font-normal py-2 px-6 focus:outline-none">
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
                <p className="mt-2 text-sm text-gray-500">
                  {questions[currentQuestionIndex].details}
                </p>
              </div>
              <div className="flex my-8 ">
                <p className="bg-[#E9ECEF] text-title-p text-[#68717A] py-9 px-24  ">
                  Table
                </p>
              </div>
              {/* Categories */}
              <div className="mt-auto space-y-6 lg:col-span-2">
                <h3 className="mb-2 font-semibold text-md">
                  Select one of the following options:
                </h3>
                <div className="bg-white mx-6  rounded-lg border border-[#E6E9EC]">
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
                <div className="flex justify-end mt-4">
                  <Link to="/summary">
                    <Button
                      text="Submit answer"
                      type="submit"
                      rightIcon={SlArrowRight}
                      rightIconStyle="text-white "
                      className="bg-[#3A57E8] text-title-p rounded-[4px] border text-white font-normal py-2 px-6 focus:outline-none"
                    />
                  </Link>
                </div>
              </div>
              <div className="max-w-4xl p-6">
                <div className="flex gap-4 w-fit items-center border border-[#6c757d] rounded-xl px-2">
                  <div className="border-r p-2 border-[#6c757d]">
                    <BsHandThumbsUp size={20} className="text-green-600 " />
                  </div>
                  <div className="border-r p-2 border-[#6c757d]">
                    <BsHandThumbsDown size={20} className="text-red-500 " />
                  </div>

                  <div className=" text-[#6c757d] flex  items-center gap-2 p-2 border-r border-[#6c757d] ">
                    <FaRegCommentDots size={20} />
                    Discuss (2)
                  </div>
                  <button
                    onClick={handleToggle}
                    className="bg-gray-200 text-[#6c757d] p-2 rounded-lg hover:bg-gray-300"
                  >
                    Improve
                  </button>
                </div>

                {showImproveSection && (
                  <div className="mt-4 bg-white border border-[#E6E9EC] p-4 rounded-lg ">
                    <h2 className="mb-3 text-lg font-bold text-yellow-500">
                      Improve this question
                    </h2>
                    <p className="mb-3 font-medium text-title-p">
                      What is the main problem with this question?
                    </p>

                    {/* Problem Options (Tag Buttons) */}
                    <div className="flex flex-wrap gap-3 mb-3">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => addSuggestion(suggestion)}
                          className="bg-white text-[#11caf0] px-4 py-2 border border-[#11caf0] rounded-md"
                        >
                          <FaPlus className="inline mr-2" />
                          {/* Add icon before text */}
                          {suggestion}
                        </button>
                      ))}
                    </div>

                    {/* Textarea for Suggestions */}
                    <textarea
                      value={suggestionText}
                      onChange={(e) => setSuggestionText(e.target.value)} // To allow manual input as well
                      placeholder="Enter your suggestions here..."
                      className="w-full h-24 p-2 border border-[#E6E9EC] rounded-lg focus:outline-none "
                    ></textarea>

                    {/* Submit Button */}
                    <button className="px-4 py-2 text-black bg-yellow-500 rounded-lg hover:bg-yellow-600">
                      Submit suggestions
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-[12%] w-fit bg-white border border-[#7749F8] rounded-xl lg:mr-4 mb-4 lg:mb-0 self-start">
              <div className="text-[#575757] bg-[#F8F9FA] border-b border-[#DEE2E6] rounded-xl text-center py-4 text-title-p px-4 font-semibold">
                Score: 50%
              </div>
              <div className="overflow-y-auto max-h-32">
                <div className="px-6 mx-auto mt-4 text-center pb-7">
                  <ul className="mx-auto space-y-2">
                    {scores.map((score, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center gap-4 space-x-2 "
                      >
                        <span>{index + 1}</span>
                        <span>
                          <FaCheck className="text-[#95cb7c]" />

                          {/* {score === 1 ? "✔️" : score === 2 ? "❌" : "-"} */}
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
    </>
  );
};

export default QuestionTemplate;
