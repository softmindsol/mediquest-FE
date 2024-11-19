import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  endQuiz,
  getQuizQuesitons,
  submitQuiz,
} from "../store/features/quiz/quiz.service";
import Suggestions from "./Suggestions";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Timer from "./Timer";
import Loader from "./Loader";

const QuestionTemplate = () => {
  const state = useSelector((state) => state?.quiz?.quiz || []);

  const { scoreboard = [], isLoading = false } = useSelector(
    (state) => state?.quiz || {}
  );

  const quizQuestions = state[0];
  const quizDetail = state[1];
  const [isSubmitLoading, setSubmitLoading] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const [isNextClicked, setNextClicked] = useState(true);
  const [isPrevClicked, setPrevClicked] = useState(true);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const pageNo = parseInt(params.get("pageNo")) || 1;
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]); // Array to hold selected options

  const calculateScore = (
    (quizDetail?.score / quizDetail?.totalQuestions) * 100 || 0
  ).toFixed(1);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await dispatch(
        getQuizQuesitons({ pageNo, id, isNextClicked, isPrevClicked })
      );
      if (res?.payload?.questions?.length > 0) {
        setImage(res.payload.questions[0].image_url);
        setNextClicked(false);
        setPrevClicked(false);
      }
    };
    fetchQuestions();
  }, [pageNo, dispatch]);

  const handleNext = () => {
    setNextClicked(true);
    if (pageNo < quizDetail?.totalQuestions) {
      setParams({ pageNo: pageNo + 1 });
      setSelectedOptions([]);
      setError("");
    }
  };

  const handlePrev = () => {
    setPrevClicked(true);
    if (pageNo > 1) {
      setParams({ pageNo: pageNo - 1 });
      setSelectedOptions([]); // Clear selected options for previous question
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOptions.length === 0) {
      setError("Please select at least one option.");
    } else if (selectedOptions.length > 2) {
      setError("You can select a maximum of two options.");
    } else {
      const values = {
        selectedOptions,
        quizId: id,
        questionIndex: pageNo,
      };

      setSubmitLoading(true);
      const res = await dispatch(submitQuiz(values));
      setSubmitLoading(false);
      if (res.type === "submitQuiz/fulfilled") {
        if (pageNo === quizDetail?.totalQuestions) {
          setNextClicked(true);
          dispatch(
            getQuizQuesitons({ pageNo, id, isNextClicked: true, isPrevClicked })
          );
        } else {
          handleNext();
        }
      }
    }
  };

  const handleEndQuiz = async () => {
    if (quizDetail?.mode === "Timed") {
      const res = await dispatch(endQuiz({ id }));
      if (res.type === "endQuiz/fulfilled") {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const handleOptionChange = (index) => {
    const optionValue = String.fromCharCode(65 + index); // 'A', 'B', 'C', etc.
    if (selectedOptions.includes(optionValue)) {
      // If option is already selected, remove it
      setSelectedOptions(
        selectedOptions.filter((option) => option !== optionValue)
      );
    } else if (selectedOptions.length < 2) {
      // If less than 2 options are selected, add the new option
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };

  return (
    <div className="bg-[#ECEFF7] min-h-screen">
      <div className="flex items-center justify-between py-4 m-auto text-center bg-white shadow px-7">
        <p className="text-title-sm font-semibold text-[#3A57E8]">MEDQUEST</p>
        <p
          onClick={handleEndQuiz}
          className="text-title-p cursor-pointer font-semibold text-[#FF3B30]"
        >
          End Quiz
        </p>
      </div>
      <div className="container max-w-screen-xl px-4 py-8 pb-40 mx-auto">
        <div className="flex flex-wrap justify-between lg:flex-nowrap">
          <div className="lg:w-[12%] w-fit bg-white border border-[#7749F8] rounded-xl lg:mr-4 mb-4 lg:mb-0 self-start">
            <div className="text-[#575757] bg-[#F8F9FA] border-b border-[#DEE2E6] rounded-xl text-center py-4 text-title-p px-4 font-semibold">
              Score: {calculateScore}%
            </div>
            <div className="overflow-y-auto max-h-[70vh]">
              <ul className="px-6 mx-auto mt-4 space-y-2 text-center pb-7">
                {scoreboard && scoreboard.length > 0 ? (
                  scoreboard.map((score) => (
                    <li
                      key={score.questionIndex}
                      className="flex items-center justify-center gap-4 space-x-2 "
                    >
                      <span>{score.questionIndex}</span>
                      <span>
                        {score.isCorrect !== undefined ? (
                          score.isCorrect ? (
                            <span>{"✔️"}</span>
                          ) : (
                            <span>{"❌"}</span>
                          )
                        ) : (
                          <span className="px-2">{"-"}</span>
                        )}
                      </span>
                    </li>
                  ))
                ) : (
                  <span className="py-4">Start the quiz</span>
                )}
              </ul>
            </div>
          </div>
          {quizDetail?.mode === "Timed" && (
            <div className="lg:w-[12%] lg:hidden block w-fit bg-white border border-[#7749F8] rounded-xl lg:mr-4 mb-4 lg:mb-0 self-start">
              <Timer startTime={quizDetail && quizDetail?.startTime} id={id} />
            </div>
          )}

          <div className="lg:w-[70%] w-full bg-white shadow-md p-8 rounded-md">
            <div className="flex justify-between mb-10">
              {/* Previous Button */}
              <Button
                text="Prev"
                type="button"
                leftIcon={MdOutlineKeyboardArrowLeft}
                leftIconStyle="text-[#ADB5BD] text-[25px]"
                onClick={handlePrev}
                disabled={pageNo === 1 || isLoading}
                className="bg-white border border-[#E9ECEF] text-secondary rounded-[4px] flex items-center py-2 px-4 hover:bg-gray-100 focus:outline-none hover:shadow-md"
              />

              {/* Page Indicator */}
              <span className="bg-[#3A57E8] text-title-p rounded-[4px] text-white font-normal py-2 px-6">
                {pageNo} of {quizDetail?.totalQuestions}
              </span>

              {/* Next Button */}
              <Button
                text="Next"
                type="button"
                rightIcon={MdOutlineKeyboardArrowRight}
                rightIconStyle="text-[#ADB5BD] text-[25px]"
                onClick={handleNext}
                disabled={pageNo >= quizDetail?.totalQuestions || isLoading}
                className="bg-white border border-[#E9ECEF] text-secondary rounded-[4px] flex items-center py-2 px-4 hover:bg-gray-100 focus:outline-none hover:shadow-md"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="my-6 mt-6">
                <h2
                  className="font-semibold text-title-p"
                  dangerouslySetInnerHTML={{ __html: quizQuestions?.question }}
                />
              </div>

              {image && (
                <div className="flex my-8 ">
                  <img
                    src={image}
                    className="w-64 h-32"
                    alt="Question visual"
                  />
                </div>
              )}
              <div className="mt-auto space-y-6 lg:col-span-2">
                <h3 className="mb-2 font-semibold text-md">
                  Select up to two options:
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
                              className="mr-3 w-[16px] h-[16px] text-[#838f9b] cursor-pointer"
                              checked={selectedOptions.includes(
                                String.fromCharCode(65 + index)
                              )}
                              onChange={() => handleOptionChange(index)}
                              disabled={
                                !quizQuestions?.hasAnswered
                                  ? !quizQuestions?.hasAnswered
                                  : false
                              }
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
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-end mt-4">
                  {quizDetail?.isSubmit ? (
                    <Link replace={true} to={`/summary/${id}`}>
                      <Button
                        text="Submit quiz"
                        type="submit"
                        rightIcon={SlArrowRight}
                        className="bg-[#3A57E8] text-title-p rounded-[4px] text-white font-normal py-3 px-4"
                      />
                    </Link>
                  ) : (
                    <Button
                      disabled={
                        !quizQuestions?.hasAnswered
                          ? !quizQuestions?.hasAnswered
                          : false || isLoading
                      }
                      // text="Submit answer"
                      type="submit"
                      rightIcon={SlArrowRight}
                      className="bg-[#3A57E8] flex justify-center items-center text-title-p rounded-[4px] text-white font-normal py-2 px-6"
                    >
                      {isSubmitLoading ? (
                        <>
                          <span className="">Loading...</span>
                          <Loader className="w-4 h-4 border-white border-solid rounded-full animate-spin-1.5 border-t-transparent border-2" />
                        </>
                      ) : (
                        "Submit answer"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
            <Suggestions pageNo={pageNo} id={id} />
          </div>

          <div className="lg:w-[12%] w-fit bg-white rounded-xl lg:mr-4 mb-4 lg:mb-0 self-start"></div>
          {quizDetail?.mode === "Timed" && (
            <div className="lg:w-[12%] hidden lg:block w-fit bg-white border border-[#7749F8] rounded-xl lg:mr-4 mb-4 lg:mb-0 self-start">
              <Timer startTime={quizDetail && quizDetail?.startTime} id={id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionTemplate;
