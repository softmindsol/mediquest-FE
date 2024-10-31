import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { getRecentQuiz } from "../../store/features/quiz/quiz.service";
import { Link } from "react-router-dom";

const RecentTest = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [quiz, setQuiz] = useState([]);
  console.log("🚀 ~ RecentTest ~ quiz:", quiz);
  const dispatch = useDispatch();

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  useEffect(() => {
    const fetchRecentQuizes = async () => {
      const res = await dispatch(getRecentQuiz());
      setQuiz(res?.payload?.data);
    };

    fetchRecentQuizes();
  }, [dispatch]);

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
                <div className="flex items-end">
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
