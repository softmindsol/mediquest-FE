import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuizQuesitons,
  submitQuiz,
} from "../store/features/quiz/quiz.service";
import Suggestions from "./Suggestions";
const QuestionTemplate = () => {
  const state = useSelector((state) => state?.quiz?.quiz);

  const { scoreboard = [] } = useSelector((state) => state?.quiz);
  console.log("🚀 ~ QuestionTemplate ~ scoreboard:", scoreboard);

  const quizQuestions = state[0];
  const quizDetail = state[1];
  const dispatch = useDispatch();
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const pageNo = parseInt(params.get("pageNo")) || 1;
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [selectedOption, setSelectOption] = useState(null);

  const calculateScore =
    (quizDetail?.score / quizDetail?.totalQuestions) * 100 || 0;

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
      setSelectOption(null);
      setError("");
    }
  };

  const handlePrev = () => {
    if (pageNo > 1) {
      setParams({ pageNo: pageNo - 1 });
      setSelectOption(null);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      setError("Please select at least one option.");
    } else {
      console.log("Form submitted with option:", selectedOption);

      const values = {
        selectedOption,
        quizId: id,
        questionIndex: pageNo,
      };
      console.log("🚀 ~ handleSubmit ~ values:", values);

      const res = await dispatch(submitQuiz(values));

      if (res.type === "submitQuiz/fulfilled") {
        handleNext();
      }

      if (pageNo === quizDetail?.totalQuestions) {
        dispatch(getQuizQuesitons({ pageNo, id }));
      }
      console.log("🚀 ~ handleSubmit ~ res:", res);
    }
  };

  const handleOptionChange = (index) => {
    const selectedValue = String.fromCharCode(65 + index);
    setSelectOption(selectedValue);
    console.log("Selected option:", selectedValue);
  };

  return (
    <div className="bg-[#ECEFF7] h-fill">
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
                  <span className="py-4"> Start the quiz</span>
                )}
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

            <form onSubmit={handleSubmit}>
              <div className="my-6 mt-6">
                <h2
                  className="text-lg font-bold"
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
                              disabled={
                                !quizQuestions?.isAnswered
                                  ? !quizQuestions?.isAnswered
                                  : false
                              }
                              className="mr-3 cursor-pointer"
                              checked={
                                selectedOption ===
                                String.fromCharCode(65 + index)
                              }
                              onChange={() => handleOptionChange(index)}
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
                    <Link to={`/summary/${id}`}>
                      <Button
                        text="Submit quiz"
                        type="submit"
                        rightIcon={SlArrowRight}
                        className="bg-[#3A57E8] text-title-p rounded-[4px] text-white font-normal py-2 px-6"
                      />
                    </Link>
                  ) : (
                    <Button
                      disabled={
                        !quizQuestions?.isAnswered
                          ? !quizQuestions?.isAnswered
                          : false
                      }
                      text="Submit answer"
                      type="submit"
                      rightIcon={SlArrowRight}
                      className="bg-[#3A57E8] text-title-p rounded-[4px] text-white font-normal py-2 px-6"
                    />
                  )}
                </div>
              </div>
            </form>
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTemplate;
