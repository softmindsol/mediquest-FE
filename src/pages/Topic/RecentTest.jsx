import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useDispatch } from "react-redux";
import {
  getRecentQuiz,
  resumeQuiz,
} from "../../store/features/quiz/quiz.service";
import { Link, useNavigate } from "react-router-dom";

const RecentTest = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const dispatch = useDispatch();

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  useEffect(() => {
    const fetchRecentQuizes = async () => {
      const res = await dispatch(getRecentQuiz());

      console.log(res.payload);

      setQuiz(res?.payload?.data);
    };

    fetchRecentQuizes();
  }, [dispatch]);

  const handleResumeQuiz = async (id, mode, currentIndex) => {
    if (mode === "Timed") {
      const res = await dispatch(resumeQuiz({ id }));
      if (res.type === "resumeQuiz/fulfilled") {
        navigate(`/question/${id}?pageNo=${res.payload.currentIndex}`);
      }
    } else {
      navigate(
        `/question/${id}?pageNo=${currentIndex === 0 ? 1 : currentIndex}`
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
                      test?.currentQuestionIndex || 0
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
