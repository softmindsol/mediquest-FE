import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRecentQuiz,
  resumeQuiz,
} from "../../store/features/quiz/quiz.service";

const RecentTest = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const dispatch = useDispatch();
  const { recentQuiz: quiz = [], isApiCalled = false } = useSelector(
    (state) => state.quiz || {}
  );

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  useEffect(() => {
    const fetchRecentQuizes = async () => {
      await dispatch(getRecentQuiz());
    };

    if (quiz.length === 0 && !isApiCalled) {
      fetchRecentQuizes();
    }
  }, [dispatch]);

  const handleResumeQuiz = async (id, mode, currentIndex, questionCount) => {
    if (mode === "Timed") {
      const res = await dispatch(resumeQuiz({ id }));
      if (res.type === "resumeQuiz/fulfilled") {
        navigate(
          `/question/${id}?pageNo=${
            res.payload.currentIndex < questionCount
              ? Number(res.payload.currentIndex) + 1
              : res.payload.currentIndex
          }`
        );
      }
    } else {
      navigate(
        `/question/${id}?pageNo=${
          currentIndex === 0
            ? 1
            : currentIndex < questionCount
            ? currentIndex + 1
            : currentIndex
        }`
      );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#CED4DA]">
      {quiz?.map((test, index) => (
        <div key={index} className="border-b border-[#CED4DA]">
          {/* Accordion Header (Test Name) */}
          <div
            className="text-[14px] text-primary font-semibold cursor-pointer p-4"
            onClick={() => toggleAccordion(index)}
          >
            {test.quizId?.name}
          </div>

          {openIndex === index && (
            <div className="mt-2 p-4 border-t border-[#CED4DA]">
              {test?.quizId?.topics.map((item, topicIndex) => (
                <div key={topicIndex} className="text-[13px] text-secondary">
                  {item}
                </div>
              ))}
              <div className="flex justify-between mt-2">
                <div className="text-[12px] font-bold text-secondary ">
                  Created: {test?.quizId?.createdAt?.slice(0, 10) || ""}
                </div>
                <div
                  onClick={() =>
                    handleResumeQuiz(
                      test?.quizId?._id || "",
                      test?.quizId?.mode || "",
                      test?.currentQuestionIndex || 0,
                      test?.quizId?.questionsCount
                    )
                  }
                  className="flex items-end"
                >
                  <button className="bg-white text-[#007AFF] flex gap-2 items-center px-4 py-2 border border-[#007AFF] rounded-md">
                    {test.buttonLabel}
                    <SlArrowRight className="text-[#007AFF]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentTest;
