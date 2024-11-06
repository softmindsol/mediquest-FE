import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecentQuiz } from "../store/features/quiz/quiz.service";
import DotsLoader from "./Loader/dots-loader";

const RecentTests = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const fetchRecentQuizes = async () => {
      setLoading(true);
      const res = await dispatch(getRecentQuiz());
      setLoading(false);

      setQuiz(res?.payload?.data);
    };

    fetchRecentQuizes();
  }, [dispatch]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-primary">Recent Tests</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <DotsLoader />
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#CED4DA]">
          {quiz && quiz.length > 0 ? (
            quiz.map((test, index) => (
              <div key={index} className="border-b border-[#CED4DA]">
                {/* Accordion Header (Test Name and Score) */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-[14px] text-primary font-semibold">
                    {test?.quizId?.name}
                  </span>
                  <div className="flex items-center gap-7">
                    <span className="bg-[#007AFF] text-white text-[12px] py-[6px] px-2 rounded-md font-semibold">
                      {`${test?.currentQuestionIndex}/${test?.quizId?.questionsCount}`}
                    </span>
                    <span
                      className={`transform transition-transform ${
                        openIndex === index ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <FaChevronUp size={16} className="text-black" />
                    </span>
                  </div>
                </div>

                {/* Accordion Content (Description, Date, Button) */}
                {openIndex === index && (
                  <div className="mt- p-5 border-t border-[#CED4DA]">
                    {test?.quizId?.topics && (
                      <div className="flex justify-between">
                        <div className="flex flex-col justify-center gap-x-5">
                          {test?.quiz?.topics?.map((item) => (
                            <div className="text-[13px] text-secondary">
                              {item}
                            </div>
                          ))}
                          <div className="text-[12px] font-bold text-secondary">
                            Created:{" "}
                            {test?.quizId?.createdAt?.slice(0, 10) || ""}
                          </div>
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={handleButtonClick}
                            className="bg-white text-[#007AFF] px-4 py-2 border border-[#007AFF] rounded-md flex items-center justify-center gap-3"
                          >
                            {/* Conditionally render the button label based on quiz status */}
                            {test.currentQuestionIndex !== 0
                              ? "Continue Quiz"
                              : "Start Quiz"}
                            <SlArrowRight className="text-[#007AFF]" />
                          </button>
                        </div>
                        {/* Modal */}
                        {isModalOpen && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E6E6E6CC] px-4 ">
                            <div className="max-w-lg p-5 bg-white rounded-lg shadow-md">
                              <h2 className="text-[14px] text-[#111827] font-semibold">
                                Are you absolutely sure?
                              </h2>
                              <p className="mt-2 text-[14px] text-[#6B7280]">
                                This action cannot be undone. This will send you
                                directly into your quiz.
                              </p>
                              <div className="flex justify-end mt-4">
                                <button
                                  onClick={handleCloseModal}
                                  className="mr-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded  text-[#374151] text-[14px] font-medium "
                                >
                                  Cancel
                                </button>
                                <Link
                                  to={`/question/${test?.quizId?._id}?pageNo=${
                                    test?.currentQuestionIndex === 0
                                      ? 1
                                      : test?.currentQuestionIndex
                                  }`}
                                  className="px-4 py-2 bg-[#007AFF] text-[14px] font-medium text-white rounded"
                                >
                                  {test?.currentQuestionIndex === 0
                                    ? "Start my quiz"
                                    : "Continue my quiz"}
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-3 py-2">Your quiz count is 0</div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentTests;
