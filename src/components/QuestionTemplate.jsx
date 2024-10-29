import React, { useEffect, useState } from "react";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { FaCheck, FaPlus, FaRegCommentDots } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { getQuizQuesitons } from "../store/features/quiz/quiz.service";

const QuestionTemplate = () => {
  const state = useSelector((state) => state?.quiz?.quiz);
  const quizQuestions = state[0];
  const quizDetail = state[1];
  const dispatch = useDispatch();
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const pageNo = parseInt(params.get("pageNo")) || 1;
  const [image, setImage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected option

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await dispatch(getQuizQuesitons({ pageNo, id }));
      if (res.payload.questions.length > 0) {
        setImage(res.payload.questions[0].image_url);
      }
    };
    fetchQuestions();
  }, [pageNo, dispatch]);

  const handleNext = () => {
    if (pageNo < quizDetail?.totalQuestions) {
      setParams({ pageNo: pageNo + 1 });
    }
  };

  const handlePrev = () => {
    if (pageNo > 1) {
      setParams({ pageNo: pageNo - 1 });
    }
  };

  const [showImproveSection, setShowImproveSection] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");

  const handleToggle = () => {
    setShowImproveSection(!showImproveSection);
  };

  const addSuggestion = (text) => {
    setSuggestionText((prevText) => (prevText ? `${prevText}, ${text}` : text));
  };

  const handleOptionChange = (index) => {
    setSelectedOption(index); // Update selected option
  };

  return (
    <div className="bg-[#ECEFF7] h-fill">
      <div className="container max-w-screen-xl px-4 py-8 pb-40 mx-auto">
        <div className="flex flex-wrap justify-between lg:flex-nowrap">
          <div className="lg:w-[12%] w-fit bg-white border border-[#7749F8] rounded-xl lg:mr-4 mb-4 lg:mb-0 self-start">
            <div className="text-[#575757] bg-[#F8F9FA] border-b border-[#DEE2E6] rounded-xl text-center py-4 text-title-p px-4 font-semibold">
              Score: 50%
            </div>
            <div className="overflow-y-auto max-h-32">
              <ul className="px-6 mx-auto mt-4 space-y-2 text-center pb-7">
                {/* Score rendering here */}
              </ul>
            </div>
          </div>

          <div className="lg:w-[70%] w-full bg-white shadow-md p-8 rounded-md">
            <div className="flex justify-between mb-10">
              <button
                onClick={handlePrev}
                disabled={pageNo === 1}
                className="bg-white border border-[#E9ECEF] text-secondary rounded-[4px] py-2 px-8 hover:bg-gray-100"
              >
                Prev
              </button>
              <span className="bg-[#3A57E8] text-title-p rounded-[4px] border text-white font-normal py-2 px-6">
                {pageNo} of {quizDetail?.totalQuestions}
              </span>
              <button
                onClick={handleNext}
                disabled={pageNo >= quizDetail?.totalQuestions}
                className="bg-white border border-[#E9ECEF] text-secondary rounded-[4px] py-2 px-8 hover:bg-gray-100"
              >
                Next
              </button>
            </div>

            <div className="my-6 mt-6">
              <h2
                className="text-lg font-bold"
                dangerouslySetInnerHTML={{ __html: quizQuestions?.question }}
              />
            </div>

            {image && (
              <div className="flex my-8 ">
                <img src={image} className="w-64 h-32" alt="Question visual" />
              </div>
            )}
            <div className="mt-auto space-y-6 lg:col-span-2">
              <h3 className="mb-2 font-semibold text-md">
                Select one of the following options:
              </h3>
              <div className="bg-white mx-6 rounded-lg border border-[#E6E9EC]">
                {quizQuestions?.options?.map(
                  (category, index) =>
                    category && (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b border-[#DEE2E6] py-2 px-4"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3"
                            checked={selectedOption === index}
                            onChange={() => handleOptionChange(index)} // Update selected option on change
                          />
                          <span
                            className="text-[14px] text-primary"
                            dangerouslySetInnerHTML={{
                              __html: category,
                            }}
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
              <div className="flex justify-end mt-4">
                <Link to="/summary">
                  <Button
                    text="Submit answer"
                    type="submit"
                    rightIcon={SlArrowRight}
                    className="bg-[#3A57E8] text-title-p rounded-[4px] text-white font-normal py-2 px-6"
                  />
                </Link>
              </div>
            </div>

            <div className="max-w-4xl p-6">
              <div className="flex gap-4 items-center border border-[#6c757d] rounded-xl px-2">
                <div className="border-r p-2 border-[#6c757d]">
                  <BsHandThumbsUp size={20} className="text-green-600" />
                </div>
                <div className="border-r p-2 border-[#6c757d]">
                  <BsHandThumbsDown size={20} className="text-red-500" />
                </div>
                <div className="text-[#6c757d] flex items-center gap-2 p-2 border-r border-[#6c757d]">
                  <FaRegCommentDots size={20} /> Discuss (2)
                </div>
                <button
                  onClick={handleToggle}
                  className="bg-gray-200 text-[#6c757d] p-2 rounded-lg hover:bg-gray-300"
                >
                  Improve
                </button>
              </div>

              {showImproveSection && (
                <div className="mt-4 bg-white border border-[#E6E9EC] p-4 rounded-lg">
                  <h2 className="mb-3 text-lg font-bold text-yellow-500">
                    Improve this question
                  </h2>
                  <p className="mb-3 font-medium text-title-p">
                    What is the main problem with this question?
                  </p>

                  <div className="flex flex-wrap gap-3 mb-3">
                    {[
                      "Not relevant for the exam",
                      "Explanation not adequate",
                      "Wrong category",
                      "Not in keeping with current guidelines",
                      "Spelling/grammar problems",
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => addSuggestion(suggestion)}
                        className="bg-white text-[#11caf0] px-4 py-2 border border-[#11caf0] rounded-md"
                      >
                        <FaPlus className="inline mr-2" />
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={suggestionText}
                    onChange={(e) => setSuggestionText(e.target.value)}
                    placeholder="Enter your suggestions here..."
                    className="w-full h-24 p-2 border border-[#E6E9EC] rounded-lg focus:outline-none"
                  />

                  <button className="px-4 py-2 text-black bg-yellow-500 rounded-lg hover:bg-yellow-600">
                    Submit suggestions
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default QuestionTemplate;
