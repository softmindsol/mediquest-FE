import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ResultsBar from "../components/ResultBar";
import { getSummary } from "../store/features/quiz/quiz.service";
import Button from "./Button";
import Loader from "./Loader";

const Summary = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("popstate", () => {
      navigate("/", { replace: true });
    });

    return () => {
      window.removeEventListener("popstate", () => {
        navigate("/", { replace: true });
      });
    };
  }, [navigate]);

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const {
    questionSummary,
    totalQuestions,
    totalScore,
    score,
    scoreboard,
    averageScore,
    name,
  } = data;

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchSummary = async () => {
      const res = await dispatch(getSummary({ id }));
      setLoading(false);
      if (res.type === "getSummary/fulfilled") {
        setData(res.payload);
      }
    };
    fetchSummary();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#ECEFF7]">
      <div className="container max-w-screen-xl px-4 py-8 pb-40 mx-auto">
        <div className="flex flex-wrap justify-between mt-14 lg:flex-nowrap">
          <div className="lg:w-[70%] w-full">
            <div className="text-[#3A57E8] text-title-md font-bold">
              {name || ""}
            </div>
            <div className="flex justify-end">
              <div className=" lg:hidden lg:w-[12%] w-fit bg-white border border-[#7749F8] rounded-xl lg:mr-4 mb-4 lg:mb-0 self-start">
                <div className="text-[#575757] bg-[#F8F9FA] border-b border-[#DEE2E6] rounded-xl text-center py-4 text-title-p px-4 font-semibold">
                  Score: {score}%
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
            </div>
            <ResultsBar score={averageScore} />

            <div className="lg:col-span-2 mt-auto bg-white rounded-lg border border-[#E6E9EC] p-9">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-title-sm text-primary">
                  Categories
                </h2>
                <h2 className="text-[13px] text-primary font-bold">
                  Question Attempted
                </h2>
              </div>
              <div className="bg-white">
                <div className="grid">
                  <div className="flex justify-between items-center border-b border-[#DEE2E6]">
                    <div
                      className="flex items-center justify-between w-full"
                      style={{
                        background: `linear-gradient(to right, #E1FFBA ${
                          (totalScore / totalQuestions) * 100
                        }%, #FFE8E8 ${(totalScore / totalQuestions) * 100}%)`,
                      }}
                    >
                      <div className="flex items-center w-1/2 px-4 py-3">
                        <span className="text-[14px] text-primary">All</span>
                      </div>

                      <div className="flex justify-end w-1/2 px-4 py-3">
                        <span className="text-white text-[10px] font-semibold bg-[#9C9C9C] px-2 py-1 rounded-md">
                          {`${totalScore || 0} / ${totalQuestions || 0}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {questionSummary &&
                    Object.entries(questionSummary).map(
                      ([subject, { total, correct }], index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border-b border-[#DEE2E6]"
                        >
                          <div
                            className="flex items-center justify-between w-full"
                            style={{
                              background: `linear-gradient(to right, #E1FFBA ${
                                (correct / total) * 100
                              }%, #FFE8E8 ${(correct / total) * 100}%)`,
                            }}
                          >
                            <div className="flex items-center w-1/2 px-4 py-3">
                              <span className="text-[14px] text-primary">
                                {subject}
                              </span>
                            </div>

                            <div className="flex justify-end w-1/2 px-4 py-3">
                              <span className="text-white text-[10px] font-semibold bg-[#9C9C9C] px-2 py-1 rounded-md">
                                {`${correct} / ${total || ""}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-7">
              <Link to="/">
                <Button
                  text="Continue"
                  type="submit"
                  rightIcon={SlArrowRight}
                  rightIconStyle="text-white "
                  className="bg-[#3A57E8] text-title-p rounded-[4px] border text-white font-normal py-2 px-6 focus:outline-none"
                />
              </Link>
            </div>
          </div>

          <div className=" hidden lg:block lg:w-[12%] w-fit bg-white border border-[#7749F8] rounded-xl lg:mr-4 mb-4 lg:mb-0 self-start">
            <div className="text-[#575757] bg-[#F8F9FA] border-b border-[#DEE2E6] rounded-xl text-center py-4 text-title-p px-4 font-semibold">
              Score: {score}%
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
        </div>
      </div>
    </div>
  );
};

export default Summary;
